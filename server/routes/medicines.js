const router = require('express').Router();
let Medicine = require('../models/medicine.model');

router.route('/').get((req, res) => {
    Medicine.find()
        .then(medicines => res.json(medicines))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const medicine_name = req.body.medicine_name;
    const period = Number(req.body.period);
    const first_intake = Date.parse(req.body.first_intake);

    const newMedicine = new Medicine({
        username,
        medicine_name,
        period,
        first_intake,
    });

    newMedicine.save()
        .then(() => res.json('Medicine added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Medicine.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Medicine.findByIdAndDelete(req.params.id)
        .then(() => res.json('Medicine deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Medicine.findById(req.params.id)
        .then(medicine => {
            medicine.username = req.body.username;
            medicine.medicine_name = req.body.medicine_name;
            medicine.period = Number(req.body.period);
            medicine.first_intake = Date.parse(req.body.first_intake);

            medicine.save()
                .then(() => res.json('Medicine updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;