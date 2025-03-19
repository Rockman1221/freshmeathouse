const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { name, email, phone, address, orderDetails } = req.body;

  if (!name || !email || !phone || !address || !orderDetails || orderDetails.length === 0) {
    return res.status(400).json({ message: "⚠️ Missing required order details." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${email}, ${process.env.EMAIL_USER}`,
      subject: "✅ Fresh Meat House - Order Confirmation",
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for your order! Here are your details:</p>
        <ul>
          ${orderDetails.map(item => `<li>${item.quantity} x ${item.name} - $${item.price.toFixed(2)} per lb</li>`).join("")}
        </ul>
        <p><strong>📍 Address:</strong> ${address}</p>
        <p><strong>📞 Contact:</strong> ${phone}</p>
        <p>We will weigh your order and confirm the final total before delivery.</p>
        <p>For any questions, please contact us.</p>
        <br>
        <p>🔴 <strong>Fresh Meat House Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order email sent successfully." });
  } catch (error) {
    console.error("🚨 Error sending email:", error);
    res.status(500).json({ message: "⚠️ Failed to send order confirmation email." });
  }
};
