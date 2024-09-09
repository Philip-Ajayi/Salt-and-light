const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const uri = 'mongodb+srv://barryjacob08:HrpYPLgajMiRJBgN@cluster0.ssafp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const registrationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    location: String
});

const Registration = mongoose.model('Registration', registrationSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const { firstName, lastName, phone, email, location } = req.body;

    const newRegistration = new Registration({ firstName, lastName, phone, email, location });

    try {
        await newRegistration.save();
        res.status(200).send('Registration successful');
    } catch (error) {
        res.status(500).send('Registration failed');
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
  
