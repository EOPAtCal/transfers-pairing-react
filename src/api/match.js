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
  let mentor;
  let mentee;
  let menteeIdx = 0;
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
      mentor = mentors[mentorIdx];
      pair(matchesRaw, idx++, mentee, reason);
      if (isMentorFullyPaired(mentor)) {
        mentors = mentors.splice(mentorIdx, 1);
      }
    }
    if (++menteeIdx > mentees.length - 1) {
      break;
    }
    ok = 1;
  }
  const { matches, unmatchedMentors } = filterUnmatched(matchesRaw);
  return {
    matches,
    unmatchedMentors,
    unmatchedMentees
  };
}

export default match;
