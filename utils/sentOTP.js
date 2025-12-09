const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      contentSid: process.env.TWILIO_CONTENT_SID,
      contentVariables: JSON.stringify({ "1": otp }),
      to: `whatsapp:${phoneNumber}`,
    });

    console.log("Sent:", message.sid);
    return { success: true, sid: message.sid };
  } catch (err) {
    console.error("Twilio Error:", err.message);
    return { success: false, error: err.message };
  }
};
