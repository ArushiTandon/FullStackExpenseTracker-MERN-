const Users = require('../models/user'); 
const { generateToken } = require('../middlewares/jwt');

exports.signUp = async (req, res) => {
  console.log("SIGN UP BODY:", req.body);

  const { fullName, email, password,  } = req.body;

  try {
    const existingUser = await Users.findOne({ fullName });

    if (existingUser) {
      console.log('Username already exists');
      return res.status(200).json({ message: 'Username already exists' });
    }

    const newUser = new Users({ fullName, email, password });
    await newUser.save(); // Mongoose will run pre-save hook to hash the password

    res.status(201).json({
      userId: newUser._id,
      message: 'ACCOUNT CREATED!',
      redirectUrl: '/user/login',
    });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(400).json({ error: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      console.log('Invalid email or password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log('Password Valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid email or password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const payload = {
      id: user._id
    };

    const token = generateToken(payload);

    return res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.error('error:', error);
    res.status(400).json({ error: 'Error logging in' });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await Users.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

exports.uploadImage = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const userId = req.user.id; // from jwtAuthMiddleware
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;


  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      { profileImageUrl: imageUrl },
      { new: true } // return updated user
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: "Profile image updated successfully!",
      profileImageUrl: user.profileImageUrl
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Failed to update profile image" });
  }
};

