const express = require('express');
const router = express.Router();
const User = require('../modules/userSchema');
const { hashPassword } = require('../modules/hashPassword');
router.get('/register', (req, res) => {
    res.render('register');
})
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingEmail = await User.findOne({ email });

        if(existingEmail) {
           return res.status(500).send('Пользователь с таким email уже существует');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User(
            {
                username: username,
                email: email,
                password: hashedPassword,
                createdAt: new Date(),
            }
        );
        await newUser.save();
        console.log('Пользователь успешно зарегестрирован');
        res.redirect('/main/login');
    } catch(e) {
        console.error('Ошибка регистрации пользователя:', e);
        res.status(500).send('Че то не то с регестрацией');
    }
})
module.exports = router;