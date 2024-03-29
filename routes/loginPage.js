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
        const existingAdmin = await Admin.findOne({ username });
    
        if(!existingUser && !existingAdmin) {
            res.send('<h1>Пользователь с таким именем не зарегистрирован...  <a href="/main/register">Кликните чтобы зарегистрироваться</a></h1>');
            return;
        }
    
        let checkedHashedPassword;
    
        if(existingUser) {
            checkedHashedPassword = await comparedPassword(password, existingUser.password);
        } else {
            checkedHashedPassword = await comparedPassword(password, existingAdmin.password);
        }
    
        if(checkedHashedPassword) {
            if(existingAdmin) {
                res.redirect('/main/adminPage');
            } else {
                res.redirect('/main');
            }
        } else {
            res.send('Неправильно введен пароль');
        }
    } catch(e) {
        console.error('Ошибка со входом пользователя:', e);
        res.status(500).send('Че то не то со входом');
    }
})
module.exports = router;