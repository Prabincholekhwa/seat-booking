class MailTemplate {

    static instance: MailTemplate

    static get(): MailTemplate {
        if (!MailTemplate.instance) {
            MailTemplate.instance = new MailTemplate();
        }
        return MailTemplate.instance;
    }


    subscriptionTemplate = (name: string): string => {
        return `
        <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seat-Booking Subscription Email</title>
        <style>
          body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          /* Add your custom styles here */
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
          }
          .header {
            background-color: #f0f0f0;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #f0f0f0;
            padding: 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Vehicle Seat Booking System</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Welcome to our email newsletter! We are excited to share some exciting news and updates with you.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod quam eget velit ultrices, at cursus nunc cursus. Pellentesque a urna auctor, blandit massa eget, consequat elit.</p>
            <p>Nulla facilisi. Integer a tortor venenatis, blandit justo eu, dictum tellus. Suspendisse non tellus id leo euismod consequat. Sed gravida ligula vel justo posuere, in posuere nulla dictum.</p>
            <p>Thank you for being a part of our community. Stay tuned for more updates!</p>
            <p>Best regards,</p>
            <p>SEAT-BOOKING</p>
          </div>
          <div class="footer">
            <p>If you wish to unsubscribe from our newsletter, click <a href="#">here</a>.</p>
            <p>Contact us: booking@example.com</p>
          </div>
        </div>
      </body>
      </html>
        `
    }

    verifyEmailTempletae = (name: string, code: number): string => {
        return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code Email</title>
  <style>
    body, p, h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
    .header {
      background-color: #f0f0f0;
      padding: 10px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #f0f0f0;
      padding: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Vehicle Seat Booking System</h1>
    </div>
    <div class="content">
      <p>Hey, ${name}</p>
      <p>Your verification code to verify your account is: ${code}</strong></p>
      <p>Thank you.</p>
    </div>
    <div class="footer">
      <p>If you did not request this verification code, please ignore this email.</p>
      <p>Contact us: booking@example.com</p>
    </div>
  </div>
</body>
</html>

        `
    }
}

const mailTemplate = MailTemplate.get()

export {mailTemplate as MailTemplate}