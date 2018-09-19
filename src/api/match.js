function pair(matchesRaw, idx, mentee, reason) {
  matchesRaw[idx].mentees.push(mentee);
  matchesRaw[idx].reasons.push(reason);
}

const isMentorFullyPaired = mentor => {
  return mentor.maxMenteesSize === mentor.mentees.length;
};

const majorAndCollegeMatch = (mentee, mentors) =>
  mentors.findIndex(
    mentor => mentor.college === mentee.college && mentor.major === mentee.major
  );

const majorMatch = (mentee, mentors) =>
  mentors.findIndex(mentor => mentor.major === mentee.major);

const collegeMatch = (mentee, mentors) =>
  mentors.findIndex(mentor => mentor.college === mentee.college);

const getMentorLimit = ({ limit }) => (limit.charAt(0) === '2' ? 8 : 4);

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

function match({ mentors, mentees }) {
  let mentorIdx = 0;
  let menteeIdx = 0;
  let mentee;
  let reason;
  let ok = 1;
  let idx = 0;
  // let mentors = mentors.slice(0); // copy preventing changes to original
  const unmatchedMentees = [];
  const matchesRaw = setup(mentors);
  while (mentors.length > 0) {
    mentee = mentees[menteeIdx];
    if ((mentorIdx = majorAndCollegeMatch(mentee, mentors)) > -1) {
      reason = 'college & major';
    } else if ((mentorIdx = collegeMatch(mentee, mentors)) > -1) {
      reason = 'college';
    } else if ((mentorIdx = majorMatch(mentee, mentors)) > -1) {
      reason = 'major';
    } else {
      unmatchedMentees.push(mentee);
      ok = 0;
    }
    if (ok) {
      pair(matchesRaw, idx, mentee, reason);
      if (isMentorFullyPaired(matchesRaw[idx])) {
        mentors.splice(mentorIdx, 1);
      }
    }
    if (++menteeIdx > mentees.length - 1) {
      break;
    }
    idx += 1;
    ok = 1;
  }
  const { matches, unmatchedMentors } = filterUnmatched(matchesRaw);
  return {
    matches,
    unmatchedMentors,
    unmatchedMentees
  };
}

function randomMatch({ matches, unmatchedMentors, unmatchedMentees }) {}

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

export default match;
