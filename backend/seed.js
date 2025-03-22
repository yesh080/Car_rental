// seed.js - Run this file with Node.js to populate your database
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => {
    console.log('MongoDB Connection Error:', err);
    process.exit(1);
});

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
    image: { type: String },
    category: { type: String, default: 'Standard' },
    description: { type: String },
    features: [{ type: String }],
    licensePlate: { type: String, unique: true, sparse: true } // Added licensePlate field with sparse index
});

const Car = mongoose.model('Car', carSchema);

// Sample car data
const cars = [
    {
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        price: 50,
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Hybrid',
        available: true,
        image: 'https://via.placeholder.com/800x600?text=Toyota+Camry',
        category: 'Sedan',
        description: 'Comfortable mid-size sedan with excellent fuel economy and reliability.',
        features: ['Bluetooth', 'Backup Camera', 'Lane Departure Warning', 'Adaptive Cruise Control'],
        licensePlate: 'CAM-2023'
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
        image: 'https://via.placeholder.com/800x600?text=Honda+Accord',
        category: 'Sedan',
        description: 'Sporty sedan with excellent handling and spacious interior.',
        features: ['Apple CarPlay', 'Android Auto', 'Heated Seats', 'Sunroof'],
        licensePlate: 'ACC-2022'
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
        image: 'https://via.placeholder.com/800x600?text=Tesla+Model+3',
        category: 'Electric',
        description: 'All-electric sedan with cutting-edge technology and impressive range.',
        features: ['Autopilot', 'Touchscreen Display', 'Over-the-air Updates', 'Supercharger Access'],
        licensePlate: 'TSL-2023'
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
        image: 'https://via.placeholder.com/800x600?text=BMW+3+Series',
        category: 'Luxury',
        description: 'Luxury compact executive car with dynamic handling and premium interior.',
        features: ['Leather Seats', 'Navigation System', 'Premium Sound System', 'Parking Assistant'],
        licensePlate: 'BMW-2022'
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
        image: 'https://via.placeholder.com/800x600?text=Mercedes+C-Class',
        category: 'Luxury',
        description: 'Elegant luxury sedan with advanced safety features and refined ride quality.',
        features: ['MBUX Infotainment', 'Burmester Sound System', 'Driver Assistance Package', 'Heated Steering Wheel'],
        licensePlate: 'MBZ-2023'
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
        image: 'https://via.placeholder.com/800x600?text=Audi+A4',
        category: 'Luxury',
        description: 'Premium compact executive car with Quattro all-wheel drive and sophisticated technology.',
        features: ['Virtual Cockpit', 'WiFi Hotspot', 'Bang & Olufsen Audio', 'Ambient Lighting'],
        licensePlate: 'AUD-2022'
    },
    {
        make: 'Toyota',
        model: 'RAV4',
        year: 2023,
        price: 55,
        transmission: 'Automatic',
        seats: 5,
        fuelType: 'Hybrid',
        available: true,
        image: 'https://via.placeholder.com/800x600?text=Toyota+RAV4',
        category: 'SUV',
        description: 'Compact SUV offering excellent fuel efficiency and versatile cargo space.',
        features: ['All-Wheel Drive', 'Apple CarPlay', 'Android Auto', 'Toyota Safety Sense'],
        licensePlate: 'RAV-2023'
    },
    {
        make: 'Jeep',
        model: 'Wrangler',
        year: 2022,
        price: 65,
        transmission: 'Manual',
        seats: 4,
        fuelType: 'Gasoline',
        available: true,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9165feda754d4a0663ca771fdc8a4321184bb970',
        category: 'SUV',
        description: 'Iconic off-road SUV with removable top and doors for the ultimate adventure.',
        features: ['4x4 Capability', 'Removable Doors', 'Washable Interior', 'Trail Rated'],
        licensePlate: 'JEP-2022'
    },
    {
        make: 'Ford',
        model: 'F-150',
        year: 2023,
        price: 70,
        transmission: 'Automatic',
        seats: 6,
        fuelType: 'Gasoline',
        available: true,
        image: 'https://via.placeholder.com/800x600?text=Ford+F-150',
        category: 'Truck',
        description: 'Full-size pickup truck with impressive towing capacity and spacious cabin.',
        features: ['Pro Power Onboard', 'Trailer Backup Assist', 'SYNC 4', 'Tailgate Work Surface'],
        licensePlate: 'F150-2023'
    },
    {
        make: 'Chevrolet',
        model: 'Corvette',
        year: 2022,
        price: 120,
        transmission: 'Automatic',
        seats: 2,
        fuelType: 'Gasoline',
        available: true,
        image: 'https://via.placeholder.com/800x600?text=Chevrolet+Corvette',
        category: 'Sports',
        description: 'Mid-engine American sports car with exhilarating performance and distinctive styling.',
        features: ['Performance Data Recorder', 'Bose Premium Audio', 'Head-Up Display', 'Magnetic Ride Control'],
        licensePlate: 'VETTE-22'
    },
    {
        make: 'Porsche',
        model: '911',
        year: 2023,
        price: 150,
        transmission: 'Automatic',
        seats: 4,
        fuelType: 'Gasoline',
        available: true,
        image: 'https://via.placeholder.com/800x600?text=Porsche+911',
        category: 'Sports',
        description: 'Legendary sports car offering precision handling and timeless design.',
        features: ['Sport Chrono Package', 'Porsche Active Suspension Management', 'Leather Interior', 'BOSE Surround Sound'],
        licensePlate: '911-2023'
    },
    {
        make: 'Volkswagen',
        model: 'Golf',
        year: 2022,
        price: 40,
        transmission: 'Manual',
        seats: 5,
        fuelType: 'Gasoline',
        available: true,
        image: 'https://via.placeholder.com/800x600?text=Volkswagen+Golf',
        category: 'Hatchback',
        description: 'Compact hatchback with sporty handling and practical interior space.',
        features: ['Digital Cockpit', 'Panoramic Sunroof', 'Fender Premium Audio', 'Adaptive Cruise Control'],
        licensePlate: 'GOLF-22'
    }
];

// Seed function
const seedDB = async () => {
    try {
        // Delete all existing cars
        await Car.deleteMany({});
        console.log('Deleted all existing cars');
        
        // Insert new cars
        await Car.insertMany(cars);
        console.log(`Successfully seeded database with ${cars.length} cars`);
        
        // Disconnect from MongoDB
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.disconnect();
    }
};

// Run the seed function
seedDB();