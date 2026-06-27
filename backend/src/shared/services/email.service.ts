import { envConfig } from "@/config/env.config.js";
import { Resend } from "resend";

const resend = new Resend(envConfig.RESEND_API_KEY);

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  try {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { data, error } = await resend.emails.send({
      from: "Vestify <no-reply@resend.dev>",
      to: [to],
      subject,
      html,
    });

    if (error) throw error;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};
