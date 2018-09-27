function pair(matchesRaw, matchIdx, mentee, reason) {
  matchesRaw[matchIdx].mentees.push(mentee);
  matchesRaw[matchIdx].reasons.push(reason);
}

const isMentorFullyPaired = ({ mentor, mentees }) => {
  return mentor.limit === mentees.length;
};

const checkForMatch = (mentee, mentors, attr) => {
  if (Array.isArray(attr)) {
    return mentors.findIndex(mentor =>
      attr.every(a => mentor[a] === mentee[a])
    );
  } else {
    return mentors.findIndex(mentor => mentor[attr] === mentee[attr]);
  }
};

const getMatchIdx = (matchesRaw, mentor) =>
  matchesRaw.findIndex(match => match.mentor.id === mentor.id);

function setup(mentors) {
  const matchesRaw = [];
  mentors.forEach((mentor, idx) => {
    matchesRaw[idx] = {
      mentor: mentor,
      mentees: [],
      reasons: []
    };
  });
  return matchesRaw;
}

function getCombination(arr, n) {
  const l = arr.length;
  let i, j, k, subarr;
  i = 0;
  const results = [];
  while (i <= l - n) {
    j = i + n;
    k = 0;
    while (j <= l) {
      subarr = arr.slice(i, j);
      subarr.splice(1, k);
      results.push(subarr);
      j++;
      k++;
    }
    i++;
  }
  return results;
}

const reasonify = attr => {
  if (Array.isArray(attr)) return attr.join(' & ');
  else return attr;
};

/** First come first served matching algorithm. Best fit first. */
function match({ mentors, mentees, options }) {
  let mentorIdx;
  let menteeIdx;
  let mentee;
  let reason;
  let matchIdx;
  let combinations;
  let names;
  let all;
  const unmatchedMentees = [];
  const matchesRaw = setup(mentors);
  mentors = mentors.slice(0);
  menteeIdx = 0;
  while (mentors.length > 0 && menteeIdx < mentees.length) {
    names = options.userOptions
      .filter(({ matchBy }) => matchBy === true)
      .map(({ name }) => name);
    combinations = getCombination(names, 2);
    all = combinations.concat(names);
    reason = null;
    mentee = mentees[menteeIdx];
    for (const item of all) {
      if ((mentorIdx = checkForMatch(mentee, mentors, item)) > -1) {
        reason = reasonify(item);
        break;
      }
    }
    if (reason) {
      matchIdx = getMatchIdx(matchesRaw, mentors[mentorIdx]);
      pair(matchesRaw, matchIdx, mentee, reason);
      if (isMentorFullyPaired(matchesRaw[matchIdx])) {
        mentors.splice(mentorIdx, 1);
      }
    } else {
      unmatchedMentees.push(mentee);
    }
    menteeIdx += 1;
  }
  return {
    matches: matchesRaw,
    unmatchedMentees
  };
}

function randomMatch({ matches, unmatchedMentees }) {
  let i, j, k, ok;
  let mentee;
  i = 0;
  j = 0;
  const unmatchedMenteesNew = [];

  k = 0;
  while (i < unmatchedMentees.length) {
    mentee = unmatchedMentees[i];
    ok = 0;
    while (j < matches.length) {
      if (!isMentorFullyPaired(matches[j])) {
        pair(matches, j, mentee, 'random');
        ok = 1;
        j++;
        break;
      }
      j++;
    }
    if (!ok && j === matches.length && k === 0) {
      j = 0;
      k = 1;
      continue;
    }
    k = 0;
    if (!ok) {
      unmatchedMenteesNew.push(mentee);
    }
    if (j === matches.length) j = 0;
    i++;
  }
  return {
    matches,
    unmatchedMentees: unmatchedMentees.slice(i).concat(unmatchedMenteesNew)
  };
}

export { match, randomMatch };
