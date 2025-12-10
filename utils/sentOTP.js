// const twilio = require("twilio");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// module.exports = async (phoneNumber, otp) => {
//   try {
//     const message = await client.messages.create({
//       from: process.env.TWILIO_WHATSAPP_FROM,
//       contentSid: process.env.TWILIO_CONTENT_SID,
//       contentVariables: JSON.stringify({ "1": otp }),
//       to: `whatsapp:${phoneNumber}`,
//     });

//     console.log("Sent:", message.sid);
//     return { success: true, sid: message.sid };
//   } catch (err) {
//     console.error("Twilio Error:", err.message);
//     return { success: false, error: err.message };
//   }
// };

// module.exports = async (phoneNumber, otp) => {
//   try {
//     const url = "https://api.akedly.io/api/v1/transactions";

//     const bodyData = {
//       APIKey: process.env.AKEDLY_API_KEY,
//       pipelineID: process.env.AKEDLY_PIPELINE_ID,
//       verificationAddress: {
//         phoneNumber: phoneNumber,
//       },
//       otp: otp,
//     };

//     // Step 1: Create transaction
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bodyData),
//     });

//     const data = await response.json();
//     const transactionID = data?.data?.transactionID;

//     if (!transactionID) {
//       return {
//         success: false,
//         error: data?.message || "Transaction ID not returned",
//       };
//     }

//     // Step 2: Activate
//     const activateTransaction = await fetch(
//       `${url}/activate/${transactionID}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({}),
//       }
//     );

//     const activateData = await activateTransaction.json();

//     if (activateTransaction.status !== 200) {
//       return { success: false, error: activateData?.message || "Activation failed" };
//     }

//     console.log("Sent:", transactionID);

//     return {
//       success: true,
//       id: transactionID,
//       message: "OTP sent and verified",
//     };

//   } catch (err) {
//     console.error("Akedly Error:", err.message);
//     return { success: false, error: err.message };
//   }
// };



module.exports = async (phoneNumber, otp) => {
  try {
    const url = "https://bulk.whysms.com/api/v3/sms/send";

    const payload = {
      recipient: phoneNumber,
      sender_id: process.env.WHYSMS_SENDER,
      type: "plain",
      message: `رمز التحقق الخاص بتطبيق الرجل العناب هو: ${otp} `,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHYSMS_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result?.status === "success") {
      console.log("Sent:", result?.data || "OK");
      return { success: true, id: result?.data || null };
    }

    return {
      success: false,
      error: result?.message || "Failed to send SMS",
    };
  } catch (err) {
    console.error("WhySMS Error:", err.message);
    return { success: false, error: err.message };
  }
};
