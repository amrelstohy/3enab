const { BadRequestError } = require("./errors");

module.exports = async (phoneNumber, otp) => {
  const url = "https://api.akedly.io/api/v1/transactions";

  const bodyData = {
    APIKey: process.env.AKEDLY_API_KEY,
    pipelineID: process.env.AKEDLY_PIPELINE_ID,
    verificationAddress: {
      phoneNumber: phoneNumber,
    },
    otp: otp,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const data = await response.json();
  const transactionID = data.data?.transactionID;

  if (response.status == 200 && transactionID) {
    const activateTransaction = await fetch(
      url + "/activate/" + transactionID,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const activateTransactionData = await activateTransaction.json();
    console.log(activateTransactionData);
  }
};
