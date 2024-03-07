const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, 7);
        return hash;
    } catch(e) {
        console.error('Ошибка при хешировании пароля');
    }
}
async function comparedPassword(password, hashedPassword) {
    const compareHashedPassword = await bcrypt.compare(password, hashedPassword);
    return compareHashedPassword;
};
module.exports = { hashPassword, comparedPassword };