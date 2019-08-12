const express = require('express');
const router = express.Router();
const User = require('../Models/user/user');
const Offer = require('../Models/offer/offer');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/orderDb", { useNewUrlParser: true }, err => {
    if (err) {
        console.error("Error!" + err);
    } else {
        console.log("Connected to MongoDb.");
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request.');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request.');
    }
    try {
        let payload = jwt.verify(token, 'vivek');
        if (!payload) {
            return res.status(401).send('Unauthorized Request.');
        }
        req.userId = payload.subject;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized Request.");
    }
}

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
            res.status(200).send({ registeredUser });
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
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'vivek');
                    res.status(200).send({ token: token, uid: user._id, uname: user.name, uaddress: user.address, upincode: user.pincode, uemail: user.email, urole: user.role });
                }
            }
        }
    });
});

router.post('/offer', (req, res) => {
    let offerData = req.body;
    let offer = new Offer(offerData);
    offer.save((error, addedOffer) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send({ addedOffer });
        }
    });
});

router.get('/specialevents', verifyToken, (req, res) => {
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

router.post('/searchcustomer', verifyToken, (req, res) => {
    let userData = req.body.uniqId;
    User.findOne({ uniqId: userData }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid Id.');
            } else {
                res.status(200).send(user);
            }
        }
    });
});

router.put('/updateprofile', verifyToken, (req, res) => {
    let data = req.body;
    User.updateOne({ _id: data.id }, { $set: data }, (err, UpdatedUser) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(UpdatedUser);
        }
    });
});

module.exports = router;