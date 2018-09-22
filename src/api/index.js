import match from './match';
// Client ID and API key from the Developer Console
var CLIENT_ID =
  '189506913922-3lr5j6kj5gr173gh59uh6sm6476mir21.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCjs7WRa3HA1YxFfKCwod-b7pl9WZvFP8o';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4'
];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
async function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    signoutButton.className = 'uk-button uk-button-secondary';
    await initMatch();
  } else {
    signoutButton.style.display = 'none';
    authorizeButton.style.display = 'block';
    authorizeButton.className = 'uk-button uk-button-secondary';
  }
}
/**
 *  Sign in the user upon button click.
 */
async function handleAuthClick(event) {
  await gapi.auth2.getAuthInstance().signIn();
  window.location.reload(true);
}
/**
 *  Sign out the user upon button click.
 */
async function handleSignoutClick(event) {
  await gapi.auth2.getAuthInstance().signOut();
  window.location.reload(true);
}

async function selectMentee(row) {
  return await {
    name: options.menteeName.reduce((res, index) => res + row[index] + ' ', ''),
    email: row[options.menteeEmail],
    college: row[options.menteeCollege],
    major: row[options.menteeMajor],
    get id() {
      return this.email;
    }
  };
}

function selectMentor(row) {
  return new Promise(resolve => {
    resolve({
      name: options.mentorName.reduce(
        (res, index) => res + row[index] + ' ',
        ''
      ),
      email: row[options.mentorEmail],
      college: row[options.mentorCollege],
      major: row[options.mentorMajor],
      limit: row[options.mentorLimit],
      get id() {
        return this.email;
      }
    });
  });
}

async function initMatch() {
  const mentors = await fetchData({
    spreadsheetId: options.mentorSpreadsheetId,
    range: options.mentorRange,
    selector: selectMentor
  });
  const mentees = await fetchData({
    spreadsheetId: options.menteeSpreadsheetId,
    range: options.menteeRange,
    selector: selectMentee
  });
  const matchResults = match({
    mentors,
    mentees
  });
  matches = matchResults.matches;
  unmatchedMentees = matchResults.unmatchedMentees;
  unmatchedMentors = matchResults.unmatchedMentors;
}

function fetchData({ spreadsheetId, range, selector }) {
  return new Promise((resolve, reject) => {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range
      })
      .then(
        function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            getRows(range.values, selector).then(rows => resolve(rows));
          } else {
            reject('No data found.');
          }
        },
        function(response) {
          reject('Error: ' + response.result.error.message);
        }
      );
  });
}

async function getRows(values, selector) {
  const result = [];
  for (let i = 0; i < values.length; i++) {
    result.push(await selector(values[i]));
  }
  return result;
}

const gapi = (window.gapi = window.gapi || {});
let options;
let matches, unmatchedMentees, unmatchedMentors;

/**
 *  On load, called to load the auth2 library and API client library.
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function handleClientLoad(o) {
  return new Promise(resolve => {
    options = o;
    if (gapi) {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          })
          .then(function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(
              gapi.auth2.getAuthInstance().isSignedIn.get()
            ).then(() => {
              authorizeButton.onclick = handleAuthClick;
              signoutButton.onclick = handleSignoutClick;
              resolve({
                matches,
                unmatchedMentees,
                unmatchedMentors
              });
            });
          });
      });
    } else {
      throw Error(`error loading google API script`);
    }
  });
}

export default handleClientLoad;
