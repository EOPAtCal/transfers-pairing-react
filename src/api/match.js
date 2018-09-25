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

function setup(mentors) {
  const matchesRaw = [];
  mentors.forEach((mentor, idx) => {
    matchesRaw[idx] = {
      mentor: mentor,
      mentees: [],
      maxMenteesSize: getMentorLimit(mentor),
      reasons: []
    };
  });
  return matchesRaw;
}

function filterUnmatched(matchesRaw) {
  const matches = [];
  const unmatchedMentors = [];
  matchesRaw.forEach(({ mentor, mentees, reasons, maxMenteesSize }) => {
    if (mentees.length > 0 || reasons.length > 0) {
      matches.push({
        mentor,
        mentees,
        reasons,
        maxMenteesSize
      });
    } else unmatchedMentors.push(mentor);
  });
  return {
    matches,
    unmatchedMentors
  };
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
  const { matches, unmatchedMentors } = filterUnmatched(matchesRaw);
  return {
    matches,
    unmatchedMentors,
    unmatchedMentees
  };
}

function randomMatchCore({ matches, unmatchedMentors, unmatchedMentees }) {
  let i, j, k, ok;
  let mentor, mentee;
  i = 0;
  j = 0;
  const unmatchedMenteesNew = [];
  if (!matches) matches = setup(unmatchedMentors);
  while (i < unmatchedMentees.length && j < unmatchedMentors.length) {
    mentee = unmatchedMentees[i];
    ok = 0;
    while (j < unmatchedMentors.length) {
      mentor = unmatchedMentors[j];
      k = getMatchIdx(matches, mentor);
      if (!isMentorFullyPaired(matches[k])) {
        ok = 1;
        pair(matches, k, mentee, 'random');
        j++;
        break;
      }
      j++;
    }
    if (!ok) unmatchedMenteesNew.push(mentee);
    i++;
  }
  return {
    matches,
    unmatchedMentees: unmatchedMenteesNew
  };
}

function randomMatch({ matches, unmatchedMentors, unmatchedMentees }) {
  const {
    matches: newMatches,
    unmatchedMentees: unmatchedMenteesNew
  } = randomMatchCore({
    unmatchedMentors,
    unmatchedMentees
  });
  console.log(newMatches, unmatchedMenteesNew);
  const {
    matches: newNewMatches,
    unmatchedMentees: unmatchedMenteesNewNew
  } = randomMatchCore({
    matches,
    unmatchedMentees: unmatchedMenteesNew
  });
  const results = filterUnmatched(newMatches.concat(newNewMatches));
  return {
    matches: results.matches,
    unmatchedMentors: results.unmatchedMentors,
    unmatchedMentees: unmatchedMenteesNewNew
  };
}

function prettyPrint({ matches, unmatchedMentors, unmatchedMentees }) {
  if (matches) {
    console.log('matches:');
    console.log(matches);
  }
  if (unmatchedMentors) {
    console.log('unmatched mentors:');
    console.log(unmatchedMentors);
  }
  if (unmatchedMentees) {
    console.log('unmatched mentees:');
    console.log(unmatchedMentees);
  }
}

function tests({ mentors, mentees }) {
  // few mentees
  prettyPrint(
    match({
      mentors,
      mentees: mentees.slice(0, 3)
    })
  );
  // few mentors
  prettyPrint(
    match({
      mentors: mentors.slice(0, 3),
      mentees
    })
  );
  // common case
  prettyPrint(
    match({
      mentors,
      mentees
    })
  );
  // randomly match unmatched
  prettyPrint(
    randomMatch(
      match({
        mentors,
        mentees
      })
    )
  );
}

export { match, randomMatch };
