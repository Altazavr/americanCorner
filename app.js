const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const { connectToMongoDB } = require('./modules/connectMongodb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Подключение роутеров
const emailRoute = require('./routes/transporter');
const register = require('./routes/registerPage');
const login = require('./routes/loginPage');
const registerAdmin = require('./routes/registerAdmin');
const adminPage = require('./routes/adminPage');
const delete_user = require('./routes/delete_user');

// Подключение к MongoDB
mongoose.connect(
    "mongodb+srv://test:1234@cluster0.9i6ai63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
connectToMongoDB()
    .then((client) => {
        if (!client) {
            throw new Error("Failed to connect to MongoDB Atlas. Client is undefined.");
        }
        app.locals.db = client.db();

        // Использование роутеров
        app.use("/", emailRoute);
        app.use("/main", register);
        app.use("/main", registerAdmin);
        app.use("/main", login);
        app.use("/main", adminPage);
        app.use("/main", delete_user);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error);
    });

// Функция старта сервера
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Сервер работает на порту ${PORT}`);
        });
    } catch (e) {
        console.error('Ошибка работы сервера:', e);
    }
}

startServer();
