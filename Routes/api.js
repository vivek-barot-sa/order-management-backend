const express = require('express');
const router = express.Router();
const User = require('../Models/user');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/orderDb", { useNewUrlParser: true }, err => {
    if (err) {
        console.error("Error!" + err);
    } else {
        console.log("Connected to MongoDb.");
    }
});

router.get('/', (req, res) => {
    res.send('From API route.');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser);
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email.');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password.');
                } else {
                    res.status(200).send(user);
                }
            }
        }
    });
});

router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem ipsum",
            "date": "2012-04-23"
        },
        {
            "_id": "2",
            "name": "Auto Expo_2",
            "description": "Lorem ipsum_2",
            "date": "2012-04-24"
        }
    ];
    res.json(events);
});

router.get('/specialevents', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Special_Auto Expo",
            "description": "Lorem ipsum",
            "date": "2012-04-23"
        },
        {
            "_id": "2",
            "name": "Special_Auto Expo_2",
            "description": "Lorem ipsum_2",
            "date": "2012-04-24"
        }
    ];
    res.json(events);
});

module.exports = router;