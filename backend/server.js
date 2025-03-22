// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Car Model
const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    transmission: { type: String, default: 'Automatic' },
    seats: { type: Number, default: 5 },
    fuelType: { type: String, default: 'Gasoline' },
    available: { type: Boolean, default: true },
    image: { type: String }
});

const Car = mongoose.model('Car', carSchema);

// Routes
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find({ available: true });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed data route (for development)
app.post('/api/seed', async (req, res) => {
    try {
        // Clear existing cars
        await Car.deleteMany({});
        
        // Sample car data
        const sampleCars = [
            {
                make: 'Toyota',
                model: 'Camry',
                year: 2023,
                price: 50,
                transmission: 'Automatic',
                seats: 5,
                fuelType: 'Hybrid',
                available: true,
                image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/10903/1695443447797/front-left-side-47.jpg?impolicy=resize&imwidth=480'
            },
            {
                make: 'Honda', 
                model: 'Accord',
                year: 2022,
                price: 45,
                transmission: 'Automatic',
                seats: 5,
                fuelType: 'Gasoline',
                available: true,
                image: 'https://via.placeholder.com/300x200'
            },
            {
                make: 'Tesla',
                model: 'Model 3',
                year: 2023,
                price: 75,
                transmission: 'Automatic',
                seats: 5,
                fuelType: 'Electric',
                available: true,
                image: 'https://via.placeholder.com/300x200'
            },
            {
                make: 'BMW',
                model: '3 Series',
                year: 2022,
                price: 65,
                transmission: 'Automatic',
                seats: 5,
                fuelType: 'Gasoline',
                available: true,
                image: 'https://via.placeholder.com/300x200'
            },
            {
                make: 'Mercedes-Benz',
                model: 'C-Class',
                year: 2023,
                price: 70,
                transmission: 'Automatic',
                seats: 5,
                fuelType: 'Hybrid',
                available: true,
                image: 'https://via.placeholder.com/300x200'
            },
            {
                make: 'Audi',
                model: 'A4',
                year: 2022,
                price: 60,
                transmission: 'Automatic',
                seats: 5,
                fuelType: 'Gasoline',
                available: true,
                image: 'https://via.placeholder.com/300x200'
            }
        ];
        
        // Insert sample cars
        await Car.insertMany(sampleCars);
        
        res.status(201).json({ message: 'Database seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});