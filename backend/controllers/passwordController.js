const bcrypt = require('bcrypt');
const User = require('../models/user');
const ForgotPassword = require('../models/password');
const Brevo = require('sib-api-v3-sdk');
const uuid = require('uuid');

const defaultClient = Brevo.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.FORGOT_PASSWORD;


exports.forgotpassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    console.log('Received forgot password request for email:', email);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const id = uuid.v4();
    await ForgotPassword.create({ id, userId: user._id, active: true, expiresAt: new Date(Date.now() + 15 * 60 * 1000)});

    const resetLink = `${process.env.FRONTEND_URL}/resetpassword/${id}`;
    const emailData = {
      sender: { email: 'arushitandon4@gmail.com', name: 'Expense Tracker' },
      to: [{ email }],
      subject: 'Password Reset Request',
      htmlContent: `<p>Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`
    };

    const apiInstance = new Brevo.TransactionalEmailsApi();
    await apiInstance.sendTransacEmail(emailData);

    res.status(200).json({ message: 'A reset link has been sent.', resetId: id });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ error: 'Failed to process request. Please try again.' });
  }
};

exports.updatepassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const resetRequest = await ForgotPassword.findOne({ id, active: true });

    if (!resetRequest) return res.status(404).json({ error: 'Invalid or expired reset link.' });

     if (resetRequest.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Reset link has expired. Please request a new one.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(resetRequest.userId, { password: hashedPassword });
    await ForgotPassword.findOneAndUpdate({ id }, { active: false });

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password. Please try again.' });
  }
};