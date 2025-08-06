const { createTokenForUser } = require("../services/authTokens")
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

adminSchema.static('verifyPasswordAndGenerateToken', async function (name, password) {
    const possibleUser = await this.findOne({ name });
    if (!possibleUser)
        throw new Error('User Not Found');

    if (possibleUser.password === password) {
        console.log("Passwords have matched")
        const token = createTokenForUser(possibleUser);
        return { token, name: possibleUser.name };
    } else {
        throw new Error('Incorrect Pasword');
    }
})

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
