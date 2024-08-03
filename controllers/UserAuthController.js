const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Use BCrypt to encrypt the password and return the encrypted password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Else create new user
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    return res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).send({ message: "Error Signing up", error: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and password is correct
    const existingUser = await User.findOne({ email: email });

    // User does not exist
    if (!existingUser) {
      return res.status(400).send({ message: "User Not found" });
    }

    // Compare the password entered by user
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    // Password does not match
    if (!passwordMatched) {
      return res.status(400).send({ message: "Wrong Password." });
    }

    // Password matches
    const jwtToken = jwt.sign(
      {
        _id: existingUser._id,
        email: email,
      },
      process.env.JWT_KEY
    );

    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // expires in 24 hours
      httpOnly: true,
      secure: true, // true if using HTTPS, false if using HTTP
      sameSite: "lax",
    });

    return res
      .status(200)
      .send({ message: "Logged in successfully", existingUser });
  } catch (error) {
    return res.status(500).send({ message: "Error Logging in", error: error });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });

    return res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error Logging out", error: error });
  }
};
