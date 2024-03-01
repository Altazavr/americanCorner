const express = require('express');
const router = express.Router();
const User = require('../modules/userSchema');

router.post('/delete_user', async (req, res) => {
    const userId = req.body.user_id;
    try {
        await User.findByIdAndDelete(userId);
        res.redirect('/main/adminPage'); 
    } catch (error) {
        console.error('Ошибка удаления пользователя:', error);
        res.status(500).send('Ошибка удаления пользователя');
    }
});

module.exports = router;
