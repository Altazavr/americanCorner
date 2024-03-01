const express = require('express');
const router = express.Router();
const Admin = require('../modules/adminSchema');
const { hashPassword } = require('../modules/hashPassword');
router.get('/registerAdmin', (req, res) => {
    res.render('registerAdmin');
})
router.post('/registerAdmin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await Admin.findOne({ username });

        if(existingUser) {
           return res.status(500).send('Админ с таким именем уже существует');
        }

        const hashedPassword = await hashPassword(password);
        const newAdmin = new Admin(
            {
                username: username,
                password: hashedPassword,
            }
        );
        await newAdmin.save();
        console.log('Админ успешно зарегестрирован');
        res.redirect('/main/adminPage');
    } catch(e) {
        console.error('Ошибка регистрации Админа:', e);
        res.status(500).send('Че то не то с регестрацией');
    }
})
module.exports = router;