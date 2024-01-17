// models/SecretMessage.js

const mongoose = require("mongoose");

const secretMessageSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    message: { type: String, required: true }
});

const SecretMessage = mongoose.model("SecretMessage", secretMessageSchema);

module.exports = SecretMessage;
