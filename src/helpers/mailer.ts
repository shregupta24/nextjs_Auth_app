import * as nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

//resuable function to either send verification mail or forget password mail
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, //sets expiry time 1 hour from now
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "480335e9febd23",
        pass: "0057f1944b1f28",
      },
    });

    const mailOptions = {
        from : "shreya@gmail.com",
        to : email,
        subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html : `<p> Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}" > here</a> 
        to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} 
        or copy and paste this link in you browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} 
        </p>`
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message);
  }
};
