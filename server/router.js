const express = require('express');
const router = express.Router();
//need router typical in express

router.get('/', (req, res) => {
    res.send('server is running');
})

module.exports = router;