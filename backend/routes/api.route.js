const router = require('express').Router();
const { auth } = require('google-auth-library');
const { google } = require("googleapis");

const GOOGLE_CLIENT_ID = '431101491201-0hl2j7m281i9pt6dp6hk4fu9jbv9rkk3.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET_ID = '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';
const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET_ID, "http://localhost:3000");
const REFRESH_TOKEN = "1//0gRjFkkJiyEzcCgYIARAAGBASNwF-L9Irsv9LG9_pMic70lIoLB7JhhLekmQOE-CKVoEwiOA_bxqVSN29d4NgwM8DCO_N-Rp5uNQ"

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post("/create-token", async (req, res, next) => {
  try {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken(code);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
})

router.post("/create-event", async (req, res, next) => {
  try {
    const { summary, description, location, startDateTime, endDateTime } = req.body;
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const calendar = google.calendar('v3');
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: summary,
        description: description,
        location: location,
        colorId: "6",
        start: {
          dateTime: new Date(startDateTime)
        },
        end: {
          dateTime: new Date(endDateTime)
        }
      }
    })
    res.send(response);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
