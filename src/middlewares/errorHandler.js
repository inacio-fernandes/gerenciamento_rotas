const nodemailer = require('nodemailer');

// Function to handle errors
function handleError(errorMessage, error) {
    console.error(errorMessage, error.message);

    // Send error notification via email
    sendErrorEmail(errorMessage, error).catch((err) => {
        console.error('Failed to send error email:', err.message);
    });
}

// Function to send an error email
async function sendErrorEmail(errorMessage, error) {
    console.error('Sending error email:', errorMessage, error.message);
    return;
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password or app password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com', // Replace with the recipient's email
        subject: errorMessage,
        text: `An error occurred:\n\n${error.message}\n\nStack Trace:\n${error.stack}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Error email sent successfully.');
}

module.exports = { handleError };