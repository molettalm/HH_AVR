const router = require('express').Router();
let Daily = require('../models/daily.model');
const authenticateJWT = require('../middleware/authenticateJWT');

router.route('/').get((req, res) => {
    Daily.find()
        .then(dailies => res.json(dailies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const weight = Number(req.body.weight);
    const hours_of_sleep = Number(req.body.hours_of_sleep);
    const blood_pressure = Number(req.body.blood_pressure);
    const blood_sugar = Number(req.body.blood_sugar);
    const calories_consumed = Number(req.body.calories_consumed);

    const newDaily = new Daily({
        username,
        weight,
        hours_of_sleep,
        blood_pressure,
        blood_sugar,
        calories_consumed,
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
            daily.username = req.body.username;
            daily.weight = Number(req.body.weight);
            daily.hours_of_sleep = Number(req.body.hours_of_sleep);
            daily.blood_pressure = Number(req.body.blood_pressure);
            daily.blood_sugar = Number(req.body.blood_sugar);
            daily.calories_consumed = Number(req.body.calories_consumed);

            daily.save()
                .then(() => res.json('Daily metrics updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;