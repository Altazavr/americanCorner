const express = require('express');
const router = express.Router();
const User = require('../modules/userSchema');
const Admin = require('../modules/adminSchema')
const { comparedPassword } = require('../modules/hashPassword');

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        const existingAdmin = await User.findOne({ username });
        if(!existingUser) {
            res.send('<h1>Пользователь с таким именем не зарегестрирован...  <a href="/main/register">Кликните чтобы зарегестрироваться</a></h1>')
            return;
        }
        if(!existingAdmin) {
            res.send('<h1>Админ с таким именем не зарегестрирован...</h1>')
            return;
        }
        const checkedHashedPassword = await comparedPassword(password, existingUser.password);
        if(password === Admin.password) {
            res.redirect('/adminPage');
        } else {
            res.send('Неправильно введен пароль');
        }
        
        if(checkedHashedPassword) {
            res.redirect('/main');
        } else {
            res.send('Неправильно введен пароль');
        }
    } catch(e) {
        console.error('Ошибка со входом пользователя:', e);
        res.status(500).send('Че то не то со входом');
    }
})
module.exports = router;