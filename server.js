const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection string
const uri = 'mongodb+srv://barryjacob08:HrpYPLgajMiRJBgN@cluster0.ssafp.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle registration
app.post('/register', async (req, res) => {
    const { firstName, lastName, phone, email, location } = req.body;

    try {
        // Connect to MongoDB
        await client.connect();

        // Get the database and collection
        const db = client.db('conference');
        const collection = db.collection('registrations');

        // Insert the registration document
        await collection.insertOne({ firstName, lastName, phone, email, location });

        res.status(200).send('Registration successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed');
    } finally {
        // Ensure the client will close when done
        await client.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
            
