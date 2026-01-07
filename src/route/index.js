const express = require('express');
const router = express.Router();

router.get('/temp', (req, res) => {
  res.json({ message: 'User service online' });
});

module.exports = router;
