import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

export const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

export const generateOtpToken = (email, otp) => {
  return jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: "5m" });
};
