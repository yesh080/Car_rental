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
  category: { type: String, default: "Standard" },
  description: { type: String },
  features: [{ type: String }],
  licensePlate: { type: String, unique: true, sparse: true }, // Added licensePlate field with sparse index
  location: {
    type: String,
    enum: ["Thrissur", "Irinjalakuda", "Chalakudy"],
    required: true,
  },
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

app.get("/api/available-cars", async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.query;

    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    // Find booked cars that overlap with the requested period
    const bookedCars = await Booking.find({
      $or: [
        {
          pickupDate: { $lte: returnD },
          returnDate: { $gte: pickup },
        },
      ],
    }).distinct("carId"); // Get unique booked car IDs

    // Find available cars that are NOT in the bookedCars list
    const availableCars = await Car.find({
      location,
      _id: { $nin: bookedCars }, // Exclude booked cars
    });

    res.json(availableCars);
  } catch (err) {
    console.error("Error fetching available cars:", err);
    res.status(500).json({ error: "Server error" });
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
  const authHeader = req.headers.authorization;
  // console.log("Auth Header Received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  // console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ error: "Invalid token" });
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

    // Ensure at least one field is provided for update
    if (!name && !phone && !address) {
      return res.status(400).json({ error: "At least one field is required" });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId, // Extracted from authMiddleware
      { name, phone, address },
      { new: true, runValidators: true }
    ).select("-password");

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//booking
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
    const { carId, pickupDate, dropoffDate, location } = req.body;

    // Ensure pickup and dropoff dates are valid
    if (new Date(pickupDate) >= new Date(dropoffDate)) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    // Check if the car is available for the given date range
    const existingBookings = await Booking.find({
      carId,
      $or: [
        { pickupDate: { $lt: dropoffDate }, dropoffDate: { $gt: pickupDate } },
      ],
    });

    if (existingBookings.length > 0) {
      return res
        .status(400)
        .json({ error: "Car is already booked for these dates" });
    }

    // Create a new booking
    const booking = new Booking({
      userId: req.user.userId,
      carId,
      pickupDate,
      dropoffDate,
      location,
    });

    await booking.save();
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
      "make model year price image location"
    );

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
