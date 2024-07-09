const router = require('express').Router();
let Daily = require('../models/daily.model');
const authenticateJWT = require('../middleware/authenticateJWT');

router.route('/').get((req, res) => {
    Daily.find()
        .then(dailies => res.json(dailies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const { 
        username, 
        weight, 
        hours_of_sleep, 
        blood_pressure_high, 
        blood_pressure_low, 
        blood_sugar, 
        calories_consumed, 
        date 
    } = req.body;

    if (
        !weight && 
        !hours_of_sleep && 
        !blood_pressure_high && 
        !blood_pressure_low && 
        !blood_sugar && 
        !calories_consumed
    ) {
        return res.status(400).json('Error: Please fill out at least one field apart from the date.');
    }

    const newDaily = new Daily({
        username,
        weight: weight || null,
        hours_of_sleep: hours_of_sleep || null,
        blood_pressure_high: blood_pressure_high || null,
        blood_pressure_low: blood_pressure_low || null,
        blood_sugar: blood_sugar || null,
        calories_consumed: calories_consumed || null,
        date: Date.parse(date)
    });

    newDaily.save()
        .then(() => res.json('Daily metrics added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Daily.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Daily.findByIdAndDelete(req.params.id)
        .then(() => res.json('Daily metrics deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Daily.findById(req.params.id)
        .then(daily => {
            const { 
                username, 
                weight, 
                hours_of_sleep, 
                blood_pressure_high, 
                blood_pressure_low, 
                blood_sugar, 
                calories_consumed, 
                date 
            } = req.body;


            daily.username = username;
            daily.weight = weight || null;
            daily.hours_of_sleep = hours_of_sleep || null;
            daily.blood_pressure_high = blood_pressure_high || null;
            daily.blood_pressure_low = blood_pressure_low || null;
            daily.blood_sugar = blood_sugar || null;
            daily.calories_consumed = calories_consumed || null;
            daily.date = Date.parse(date);
            
            daily.save()
                .then(() => res.json('Daily metrics updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;