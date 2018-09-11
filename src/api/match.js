function pair(matches, mentorId, mentee, reason) {
  matches[mentorId].mentees.push(mentee);
  matches[mentorId].reasons.push(reason);
}

function selectPairs(matches) {
  const results = [];
  for (const mentorId in matches) {
    results.push({
      mentor: mentorId,
      mentees: matches[mentorId].mentees.map(m => m.id),
      reason: matches[mentorId].reasons
    });
  }
  return results;
}

function removeUnpaired(matches, unmatchedMentors) {
  for (const mentorId in matches) {
    if (matches[mentorId].mentees.length === 0) {
      unmatchedMentors.push(mentorId);
      delete matches[mentorId];
    }
  }
}
const isMentorFullyPaired = (matches, mentorId) => {
  const mentor = matches[mentorId];
  return mentor.maxMenteesSize === mentor.mentees.length;
};
const filterIndex = (lst, index) => lst.filter((_, idx) => idx !== index);

const majorMatch = (mentee, mentors) =>
  mentors.findIndex(mentor => mentor.major === mentee.major);

const collegeMatch = (mentee, mentors) =>
  mentors.findIndex(mentor => mentor.college === mentee.college);

const majorAndCollegeMatch = (mentee, mentors) =>
  mentors.findIndex(
    mentor => mentor.college === mentee.college && mentor.major === mentee.major
  );

const getMentorLimit = ({ limit }) => (limit.charAt(0) == '2' ? 8 : 4);

function setup(matches, mentors) {
  mentors.forEach(mentor => {
    matches[mentor.id] = {
      mentees: [],
      maxMenteesSize: getMentorLimit(mentor),
      reasons: []
    };
  });
}

function execMatch({ mentors, mentees }) {
  const matches = {};
  const unmatchedMentees = [];
  let mentorIdx = 0;
  let mentor;
  let mentee;
  let menteeIdx = 0;
  let reason;
  setup(matches, mentors);
  while (mentors.length > 0) {
    mentee = mentees[menteeIdx];
    if ((mentorIdx = majorAndCollegeMatch(mentee, mentors)) > -1) {
      reason = 'college & major';
    } else if ((mentorIdx = collegeMatch(mentee, mentors)) > -1) {
      reason = 'college';
    } else if ((mentorIdx = majorMatch(mentee, mentors)) > -1) {
      reason = 'major';
    } else {
      unmatchedMentees.push(mentee.id);
      menteeIdx++;
      if (menteeIdx > mentees.length - 1) {
        break;
      }
      continue;
    }
    mentor = mentors[mentorIdx];
    pair(matches, mentor.id, mentee, reason);
    if (isMentorFullyPaired(matches, mentor.id)) {
      mentors = filterIndex(mentors, mentorIdx);
    }
    menteeIdx++;
    if (menteeIdx > mentees.length - 1) {
      break;
    }
  }
  return {
    matches,
    unmatchedMentees
  };
}

function match({ mentees, mentors }) {
  let { matches, unmatchedMentees } = execMatch({
    mentors,
    mentees
  });
  const unmatchedMentors = [];
  removeUnpaired(matches, unmatchedMentors);
  matches = selectPairs(matches);
  return {
    matches,
    unmatchedMentees,
    unmatchedMentors
  };
}

export default match;
