const checkForMatch = (mentee, mentors, attr) => {
  if (Array.isArray(attr)) {
    const arr = attr.map(a => checkForMatchHelper(mentee, mentors, a));
    if (arr.every((a, _, arr) => a === arr[0] && a !== -1)) return arr[0];
    return -1;
  } else {
    return checkForMatchHelper(mentee, mentors, attr);
  }
};

const checkForMatch = (mentee, mentors, attr) => {
  let idx1;
  let idx2;
  if (Array.isArray(attr)) {
    if (attr.length === 0) {
      return true;
    } else if ((idx1 = checkForMatch(mentee, mentors, attr[0])) > -1) {
      idx2 = checkForMatch(mentee, mentors, attr.slice(1));
      if (typeof idx2 === 'boolean' && idx2) {
        return idx1;
      } else if (Number.isInteger(idx2)) if (idx2 === idx1) return idx1;
      return -1;
    } else {
      return -1;
    }
  } else {
    idx1 = mentors.findIndex(mentor => mentor[attr] === mentee[attr]);
    return idx1;
  }
};

const getAllIndices = (mentee, mentors, attr, arr) => {
  let idx;
  if (mentors.length === 0) {
    return arr;
  } else if ((idx = checkForMatch(mentee, mentors, attr)) > -1) {
    arr.push(idx);
    return getAllIndices(mentee, mentors.slice(idx), attr);
  } else return arr;
};

const checkForMatch2 = (mentee, mentors, attr) => {
  if (Array.isArray(attr)) {
    const results = [];
    for (const a of attr) {
      const arr = [];
      getAllIndices(mentee, mentors, a, arr);
      results.push(arr);
    }
    for (let i = 0; i < array.length; i++) {
      const arr = array[i];
      for (let j = 0; j < array.length; j++) {
        const elem = array[j];
        if (arr.includes(elem)) {
        }
      }
    }
  } else return checkForMatchHelper(mentee, mentors, attr);
};
