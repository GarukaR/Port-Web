const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email service is ready to send messages');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return false;
  }
};

// Send contact form notification email
const sendContactNotification = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Contact Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 8px; border: 1px solid #dee2e6;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border: 1px solid #dee2e6;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Subject:</td>
              <td style="padding: 8px; border: 1px solid #dee2e6;">${subject}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
          <div style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #666; font-size: 12px;">
          <p>This email was sent from your portfolio website contact form.</p>
          <p>Reply directly to this email to respond to ${name}.</p>
        </div>
      </div>
    `,
    replyTo: email, // Allow direct reply to the contact person
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error);
    throw error;
  }
};

// Send auto-reply email to the contact person
const sendAutoReply = async (contactData) => {
  const { name, email, subject } = contactData;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thank you for contacting me - ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Thank You for Your Message!</h2>
        
        <p style="color: #555; line-height: 1.6;">Hi ${name},</p>
        
        <p style="color: #555; line-height: 1.6;">
          Thank you for reaching out through my portfolio website. I've received your message about "<strong>${subject}</strong>" and I really appreciate you taking the time to contact me.
        </p>
        
        <div style="padding: 15px; background-color: #e7f3ff; border-left: 4px solid #007bff; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; color: #0056b3;"><strong>What happens next?</strong></p>
          <p style="margin: 10px 0 0 0; color: #0056b3;">I typically respond to all inquiries within 24 hours. I'll review your message carefully and get back to you with a thoughtful response.</p>
        </div>
        
        <p style="color: #555; line-height: 1.6;">
          In the meantime, feel free to check out my other projects on my portfolio or connect with me on LinkedIn.
        </p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://linkedin.com/in/garuka-ranasinghe" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Connect on LinkedIn</a>
        </div>
        
        <p style="color: #555; line-height: 1.6;">
          Best regards,<br>
          <strong>Garuka Ranasinghe</strong><br>
          Full Stack Developer
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #666; font-size: 12px;">
          <p>This is an automated response. Please don't reply to this email directly.</p>
          <p>If you need immediate assistance, please email me directly at garukar9895@gmail.com</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent to:', email, 'MessageId:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error);
    // Don't throw error for auto-reply failures - main notification is more important
    return { success: false, error: error.message };
  }
};

module.exports = {
  verifyConnection,
  sendContactNotification,
  sendAutoReply,
};