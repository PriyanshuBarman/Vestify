import config from "#config/env.config.js";

export const passwordResetTemplate = (name, token) =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Action Required</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
      color: #333;
      line-height: 1.6;
    "
  >
  
<div style="max-width: 600px; margin: 0 auto; overflow: hidden; border-radius: 12px;background-color: #ffffff;
">
        <!-- Header -->
        <div
          style="
            text-align: center;
            padding: 25px 20px;
            border-bottom: 1px solid #f0f0f0;
          "
        >
          <img
            src="https://res.cloudinary.com/dmtp3bdzx/image/upload/v1760630536/TransparentLogo_ruawkl.png"
            alt="Vestify Logo"
            style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 8px;
              background-color: #04ad83;
            "
          />
          <span
            style="
              font-size: 16px;
              font-weight: 500;
              color: #000;
              letter-spacing: 0.5px;
              vertical-align: middle;
            "
            >Vestify</span
          >
        </div>

        <!-- Content -->
        <div style="padding:40px 30px;text-align:center;">
          <h2 style="font-size:18px;font-weight:500;color:black;margin-bottom:20px;">Reset Password</h2>

          <p style="color:#555;font-size:14px;line-height:1.8;margin-bottom:10px;">Hi ${name},</p>

          <p style="color:#555;font-size:14px;line-height:1.8;margin-bottom:10px;">
            We received a request to reset the password for your Vestify account. Click the button below to proceed.
          </p>

          <!-- Call-to-Action Button -->
           <div style="margin: 40px 0; padding: 20px 0; text-align: center">
            <a
              href="${config.FRONTEND_URL}/auth/reset-password/${token}"
              style="
                display: inline-block;
                background: linear-gradient(135deg, #04ad83, #00a46e);
                color: white;
                text-decoration: none;
                padding: 10px 38px;
                border-radius: 12px;
                font-weight: 500;
                font-size: 14px;
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="color:#555;font-size:14px;line-height:1.8;margin-bottom:10px;">
            If you didn't make this request, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div
        style="
          padding: 40px 30px;
          border-top: 1px solid #eee;
          text-align: center;
        "
      >
        <p
          style="
            font-size: 12px;
            color: #666;
            line-height: 1.6;
            margin: 0 0 8px 0;
          "
        >
          Need help? Contact us at
          <a href="mailto:vestify.contact@gmail.com"
            >vestify.contact@gmail.com</a
          >
        </p>
        <p
          style="
            color: #999;
            font-size: 12px;
            line-height: 1.6;
            margin: 16px 0 0 0;
          "
        >
          © 2025 Vestify. All rights reserved.
        </p>
      </div>
      </div>

  </body>
</html>
`;

export const changeEmailTemplate = (name, otp) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Action Required</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 12px;
        background-color: #ffffff;
      "
    >
      <!-- Header -->
      <div
        style="
          text-align: center;
          padding: 25px 20px;
          border-bottom: 1px solid #f0f0f0;
        "
      >
        <img
          src="https://res.cloudinary.com/dmtp3bdzx/image/upload/v1760630536/TransparentLogo_ruawkl.png"
          alt="Vestify Logo"
          style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 8px;
            background-color: #04ad83
          "
        />
        <span
          style="
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.5px;
            vertical-align: middle;
          "
          >Vestify</span
        >
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px">
        <h2
          style="
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 20px;
            text-align: center;
          "
        >
          OTP Verification
        </h2>

        <p
          style="
            color: #555;
            font-size: 14px;
            line-height: 1.8;
            margin-bottom: 12px;
            text-align: center;
          "
        >
          Hi ${name},
        </p>

        <p
          style="
            color: #555;
            font-size: 14px;
            line-height: 1.8;
            margin-bottom: 12px;
            text-align: center;
          "
        >
          We received a request to change the email for your Vestify account.
          Use the OTP below to proceed.
        </p>

        <!-- OTP Section -->
        <div
          style="
            background-color: #f9f9f9;
            border-left: 4px solid;
            padding: 15px 20px;
            margin: 30px 0;
            border-radius: 8px;
            text-align: center;
          "
        >
          <div
            style="
              font-size: 24px;
              font-weight: 600;
              letter-spacing: 3px;
            "
          >
            ${otp}
          </div>
          <div style="font-size: 12px; color: #999; margin-top: 6px">
            Valid for 10 minutes
          </div>
        </div>

        <p
          style="
            color: #555;
            font-size: 14px;
            line-height: 1.8;
            text-align: center;
          "
        >
          If you didn't make this request, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
       <div
        style="
          padding: 40px 30px;
          border-top: 1px solid #eee;
          text-align: center;
        "
      >
        <p
          style="
            font-size: 12px;
            color: #666;
            line-height: 1.6;
            margin: 0 0 8px 0;
          "
        >
          Need help? Contact us at
          <a href="mailto:vestify.contact@gmail.com"
            >vestify.contact@gmail.com</a
          >
        </p>
        <p
          style="
            color: #999;
            font-size: 12px;
            line-height: 1.6;
            margin: 16px 0 0 0;
          "
        >
          © 2025 Vestify. All rights reserved.
        </p>
      </div>
      </div>
    </div>
  </body>
</html>
`;
export const refreshTokenReuseTemplate = (
  session,
  decoded,
  userAgent,
  ip
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Action Required</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
    "
  >
  <h2>Refresh Token Reuse Detected</h2>
  
  <h3><strong>Suspicious activity detected for user:</strong></h3>
  <table>
    <tr>
      <td><strong>User ID:</strong></td>
      <td>${session.user.id}</td>
    </tr>
    <tr>
      <td><strong>User Email:</strong></td>
      <td>${session.user.email}</td>
    </tr>
  </table>
 

  <h3>Current Session Details</h3>
  <table>
    <tr>
      <td><strong>Session ID:</strong></td>
      <td>${session.id}</td>
    </tr>
    <tr>
      <td><strong>IP Address:</strong></td>
      <td>${session.ip}</td>
    </tr>
    <tr>
      <td><strong>User Agent:</strong></td>
      <td>${session.userAgent}</td>
    </tr>
  </table>

  <h3>New Login Attempt</h3>
  <table>
    <tr>
      <td><strong>New Session ID:</strong></td>
      <td>${decoded.sessionId}</td>
    </tr>
    <tr>
      <td><strong>IP Address:</strong></td>
      <td>${ip}</td>
    </tr>
    <tr>
      <td><strong>User Agent:</strong></td>
      <td>${userAgent}</td>
    </tr>
  </table>
  </body>
</html>
`;
