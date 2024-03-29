if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const fs = require("fs");

var recipients = [
  "lfuentesa@unicartagena.edu.co",
];
var count = 0;

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
(async () => {
  var sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  for (const [index, person] of recipients.entries()) {
    console.log("To: ", person);
    const msg = {
      to: person,
      from: "Developer <lfuentesa@unicartagena.edu.co>",
      subject: "Sending with Twilio SendGrid",
      text: " Easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even <i>Node.js</i></strong>"
    };

    await mailResponse(sgMail, msg);

    console.log("Success:", person);
  }
})();

function mailResponse(sender, message) {
  return new Promise((resolve, reject) => {
    resolve(sender.send(message));
  });
}
