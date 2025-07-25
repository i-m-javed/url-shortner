const Users = require("../model/users");
const validator = require("validator");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Create new user
    // Note: In a production app, you should hash the password before storing
    const newUser = await Users.create({
      name,
      email,
      password, // In production: use bcrypt to hash password
      createdAt: new Date()
    });

    // Return user data (excluding password)
    const userData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    };

    return res.status(201).json(userData);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    // In production: use bcrypt.compare to check hashed password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  const userId = req.params.userId; // Assuming you'll pass user ID in the route

  try {
    const user = await Users.findById(userId).select("-password"); // Exclude password
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  try {
    // Validate email if provided
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await Users.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }

    // Update user
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user's URLs
exports.getUserUrls = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findById(userId).populate("urls");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user.urls);
  } catch (error) {
    console.error("Get user URLs error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // In a production app, you might want to handle related data (like URLs)
    // Either delete them or update them to remove the user reference

    return res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};