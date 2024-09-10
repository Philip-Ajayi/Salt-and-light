const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection URI
const uri = 'mongodb+srv://barryjacob08:HrpYPLgajMiRJBgN@cluster0.ssafp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDb() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDb();

const database = client.db('conference');  // Use your database name
const registrations = database.collection('registrations');  // Use your collection name

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle registration form submission
app.post('/register', async (req, res) => {
    const { firstName, lastName, phone, email, location } = req.body;

    try {
        const newRegistration = { firstName, lastName, phone, email, location };
        await registrations.insertOne(newRegistration);
        res.status(200).send('Registration successful');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Registration failed');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  
