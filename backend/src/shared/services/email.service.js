import { Resend } from "resend";
import { RESEND_API_KEY } from "../../../config/env.config.js";

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
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
