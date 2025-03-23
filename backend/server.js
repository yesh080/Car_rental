// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Car Model
const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  transmission: { type: String, default: "Automatic" },
  seats: { type: Number, default: 5 },
  fuelType: { type: String, default: "Gasoline" },
  available: { type: Boolean, default: true },
  image: { type: String },
});

const Car = mongoose.model("Car", carSchema);

// Routes
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find({ available: true });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updated User Schema with phone and address
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
});

const User = mongoose.model("User", UserSchema);

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      address: address || "",
    });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email already in use" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to Protect Routes
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// Protected Route Example
app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

// Update User Profile Route (Protected)
app.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, address },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Booking Schema
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  pickupDate: { type: Date, required: true },
  dropoffDate: { type: Date, required: true },
  status: { type: String, default: "Active" }, // e.g., Active, Completed, Canceled
});

const Booking = mongoose.model("Booking", bookingSchema);

// Create Booking Route
app.post("/api/bookings", authMiddleware, async (req, res) => {
  try {
    const { carId, pickupDate, dropoffDate } = req.body;

    // Check if the car is available
    const car = await Car.findById(carId);
    if (!car || !car.available) {
      return res.status(400).json({ error: "Car is not available" });
    }

    // Create a new booking
    const booking = new Booking({
      userId: req.user.userId,
      carId,
      pickupDate,
      dropoffDate,
    });
    await booking.save();

    // Mark the car as unavailable
    car.available = false;
    await car.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get User's Bookings Route
app.get("/api/bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).populate(
      "carId",
      "make model year price image"
    );
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});