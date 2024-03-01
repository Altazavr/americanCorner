const express = require('express');
const router = express.Router();
const User = require('../modules/userSchema');

router.get('/adminPage', async (req, res) => {
    try {
        const users = await User.find();
        res.render('adminPage', { users: users });
    } catch (error) {
        console.error('Ошибка получения пользователей:', error);
        res.status(500).send('Ошибка получения пользователей');
    }
});

module.exports = router;
