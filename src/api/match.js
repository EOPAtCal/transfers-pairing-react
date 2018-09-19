function pair(matches, idx, mentee, reason) {
  matches[idx].mentees.push(mentee);
  matches[idx].reasons.push(reason);
}

const isMentorFullyPaired = (matches, mentorId) => {
  const mentor = matches[mentorId];
  return mentor.maxMenteesSize === mentor.mentees.length;
};

const majorMatch = (mentee, mentors) =>
  mentors.findIndex(mentor => mentor.major === mentee.major);

const collegeMatch = (mentee, mentors) =>
  mentors.findIndex(mentor => mentor.college === mentee.college);

const majorAndCollegeMatch = (mentee, mentors) =>
  mentors.findIndex(
    mentor => mentor.college === mentee.college && mentor.major === mentee.major
  );

const getMentorLimit = ({ limit }) => (limit.charAt(0) === '2' ? 8 : 4);

function setup(matches, mentors) {
  mentors.forEach((mentor, idx) => {
    matches[idx] = {
      mentor: mentor,
      mentees: [],
      maxMenteesSize: getMentorLimit(mentor),
      reasons: []
    };
  });
}

function filterUnmatched(matchesRaw) {
  const matches = [];
  const unmatchedMentors = [];
  matchesRaw.forEach(({ mentor, mentees, reasons }) => {
    if (mentees.length > 0 || reasons.length > 0) {
      matches.push({
        mentor,
        mentees,
        reasons
      });
    } else unmatchedMentors.push(mentor);
  });
}

function execMatch({ mentors, mentees }) {
  const matchesRaw = [];
  const unmatchedMentees = [];
  let mentorIdx = 0;
  let mentor;
  let mentee;
  let menteeIdx = 0;
  let reason;
  let ok = 1;
  setup(matchesRaw, mentors);
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
      continue;
    }
    if (ok) {
      mentor = mentors[mentorIdx];
      pair(matchesRaw, mentor.id, mentee, reason);
      if (isMentorFullyPaired(matchesRaw, mentor.id)) {
        mentors = mentors.filter((_, idx) => idx !== mentorIdx);
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

function match({ mentees, mentors }) {
  let { matches, unmatchedMentees, unmatchedMentors } = execMatch({
    mentors,
    mentees
  });
  return {
    matches,
    unmatchedMentees,
    unmatchedMentors
  };
}

export default match;
