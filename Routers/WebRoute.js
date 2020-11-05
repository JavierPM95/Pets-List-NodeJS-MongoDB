const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {description: "Dynamic description"})
})

router.get('/service', (req, res) => {
    res.render("service", {description: "Dynamic Service"})
})

module.exports = router;