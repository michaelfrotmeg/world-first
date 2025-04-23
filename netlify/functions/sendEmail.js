const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        // Ensure the method is POST
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };
        }

        console.log("Received event:", event.body); // Log request data

        // Parse the body of the request to extract form data
        const formData = JSON.parse(event.body);

        // Ensure that the necessary fields are present
        if (!formData || Object.keys(formData).length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Form data is missing or invalid." }),
            };
        }

        

        // Create a transporter for sending the email using the SMTP details
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            
            debug: true, // 
        });

        console.log("SMTP Host:", process.env.SMTP_HOST);
        console.log("SMTP Port:", process.env.SMTP_PORT);


        transporter.verify((error, success) => {
            if (error) {
                console.error("SMTP Server Verification Failed:", error);
            } else {
                console.log("SMTP Server is ready to send emails");
            }
        });
        

        // Generate a message from all form data
        let messageContent = "You have received a new form submission:\n\n";
        for (const [key, value] of Object.entries(formData)) {
            messageContent += `${key}: ${value}\n`; // Add each field name and value to the message
        }

        // Setup email data
        let mailOptions = {
            from: process.env.SMTP_USER, // Sender's email
            to: "world-firrst@salxpie.xyz", // Recipient's email
            subject: `New Contact Form Submission`, // Subject
            text: messageContent, // Body content
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response); // Log success message

        return {
            statusCode: 200,
            body: JSON.stringify({ success: "Email sent successfully!" }),
        };
    } catch (error) {
        console.error("Error occurred:", error); // Log error details
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
