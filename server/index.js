require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const SecretMessage = require("./models/SecretMessage");
async function clearSecretMessages() {
    try {
        await SecretMessage.deleteMany({}); // This deletes all documents in the collection
        console.log('Secret messages cleared from the database.');
    } catch (error) {
        console.error('Failed to clear secret messages:', error);
    }
}
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

process.on('SIGINT', async () => {
    await clearSecretMessages();
    process.exit();
});

process.on('SIGTERM', async () => {
    await clearSecretMessages();
    process.exit();
});