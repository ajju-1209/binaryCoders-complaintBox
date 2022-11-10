import SibApiV3Sdk from "sib-api-v3-sdk";

const sendEmail = async () => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    //Instantiate the client
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.EMAILER_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
      email: "ishaagarwal772000@gmail.com",
    };
    const recievers = [{ email: "thakuryuvraj98@gmail.com" }];
    await apiInstance.sendTransacEmail({
      sender,
      to: recievers,
      subject: "The status of your complaint is",
      //   textContent: "Hey I am sending a test email can you please check it.",
      htmlContent: `
      <h3>Hey user</h3>
      </br> 
      <span>The Status of your complaint is changed.</span>
      </br>
      <h4>Regards</h4>
      </br>
      <h2>Binary Coders</h2>`,
    });
    console.log("Email senddddddddddddddddd");
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
