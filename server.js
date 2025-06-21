
require('dotenv').config();

const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

const contactLimiter = rateLimit({
	windowMs: 1440 * 60 * 1000, 
	max: 3, 
	message: 'Too many contact form submissions from this IP, please try again tomorrow',
    standardHeaders: true, 
	legacyHeaders: false,
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify(function(error, success) {
    if (error) console.error("Error with SMTP configuration:", error);
    else console.log("Nodemailer is ready to send emails");
});


app.post('/api/contact', contactLimiter, async (req, res) => {
    const { Name, Email, Subject, Message } = req.body;

    if (!Name || !Email || !Subject || !Message) {
        return res.status(400).json({ success: false, message: 'Please fill out all fields.' });
    }

   
    const notificationMailOptions = {
        from: `"${Name}" <${process.env.SMTP_USER}>`,
        replyTo: Email,
        to: process.env.RECIPIENT_EMAIL, 
        subject: `New Portfolio Message: ${Subject}`,
        text: `You have a new message from:\n\nName: ${Name}\nEmail: ${Email}\n\nMessage:\n${Message}`
    };

   
    const autoReplyMailOptions = {
        from: `"Subhodip Sarkar" <${process.env.SMTP_USER}>`,
        to: Email, 
        subject: `Thank you for your message!`,
        text: `Hi ${Name},\n\nThanks for contacting me! I have received your message and will get back to you within 24 hours.\n\nBest regards,\nSubhodip Sarkar`,
        html: `<p>Hi ${Name},</p><p>Thanks for contacting me! I have received your message and will get back to you within 24 hours.</p><p>Best regards,<br>Subhodip Sarkar</p>`
    };

   
    try {
        
        await transporter.sendMail(notificationMailOptions);
        
        // 2. Send the auto-reply to the user
        await transporter.sendMail(autoReplyMailOptions);

       
        res.status(200).json({ success: true, message: 'Thank you! Your message has been sent successfully. A confirmation has been sent to your email.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Sorry, there was an error sending your message. Please try again later.' });
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
