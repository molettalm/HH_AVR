const router = require('express').Router();
let Info = require('../models/info.model');
const authenticateJWT = require('../middleware/authenticateJWT');

router.use(authenticateJWT);

router.route('/').get((req, res) => {
    const { username } = req.query; // Extract the username from the query parameters
    Info.find({ username })
        .then(infos => res.json(infos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const birth = Date.parse(req.body.birth);
    const biological_gender = req.body.biological_gender;
    const height = Number(req.body.height);

    const newInfo = new Info({
        username,
        birth,
        biological_gender,
        height,
    });

    newInfo.save()
        .then(() => res.json('New user info added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Info.findById(req.params.id)
        .then(info => res.json(info))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Info.findByIdAndDelete(req.params.id)
        .then(() => res.json('User info deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Info.findById(req.params.id)
        .then(info => {
            info.username = req.body.username;
            info.birth = Date.parse(req.body.birth);
            info.biological_gender = req.body.biological_gender;
            info.height = Number(req.body.height);

            info.save()
                .then(() => res.json('User info updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;