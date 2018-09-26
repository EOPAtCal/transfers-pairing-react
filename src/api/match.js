function pair(matchesRaw, matchIdx, mentee, reason) {
  matchesRaw[matchIdx].mentees.push(mentee);
  matchesRaw[matchIdx].reasons.push(reason);
}

const isMentorFullyPaired = ({ mentees, maxMenteesSize }) => {
  return maxMenteesSize === mentees.length;
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

const getMentorLimit = ({ limit }) =>
  limit && limit.charAt(0) === '2' ? 8 : 4;

const getMatchIdx = (matchesRaw, mentor) =>
  matchesRaw.findIndex(match => match.mentor.id === mentor.id);

function setup(mentors, oneForOne) {
  const matchesRaw = [];
  mentors.forEach((mentor, idx) => {
    matchesRaw[idx] = {
      mentor: mentor,
      mentees: [],
      maxMenteesSize: oneForOne ? 1 : getMentorLimit(mentor),
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
  const matchesRaw = setup(mentors, options.oneForOne);
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomMatch({ matches, unmatchedMentees }) {
  let i, j, ok;
  let mentee;
  i = 0;
  j = 0;
  const unmatchedMenteesNew = [];
  shuffleArray(matches);
  shuffleArray(unmatchedMentees);
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
    if (!ok && j === matches.length) {
      j = 0;
      console.log('here', mentee);
      continue;
    }
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
