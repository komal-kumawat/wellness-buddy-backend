const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already exists", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already exists", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        // Convert user to a plain object and remove password
        const userObj = user.toObject();
        delete userObj.password;
        return res.json({ status: true, user: userObj });
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "Incorrect email or password", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect email or password", status: false });
        }
        // Convert user to a plain object and remove password
        const userObj = user.toObject();
        delete userObj.password;
        return res.json({ status: true, user: userObj });

    } catch (ex) {
        next(ex);
    }
};
