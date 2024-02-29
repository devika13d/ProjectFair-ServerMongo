
const user = require('../Models/useSchema');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log('Inside userController: register function');
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try {
        const existingUser = await user.findOne({ email: email });
        console.log('Existing user:', existingUser);
        if (existingUser) {
            return res.status(406).json('Account already exists, please login');
        } else {
            const newUser = new user({
                username: username,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            });
            await newUser.save();
            return res.status(200).json('Registration request received successfully');
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(401).json('Internal server error');
    }
};
exports.login = async (req, res) => {
    console.log('Inside login controller function');
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const existingUser = await user.findOne({ email: email, password: password });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey1234')
            console.log(token);
            // Check if the password matches

            res.status(200).json({
                existingUser: existingUser,
                token: token
            });

        } else {
            res.status(406).json('Invalid email or password');
        }
    } catch (err) {
        console.error('Login request fails due to:', err);
        res.status(401).json('Internal server error');
    }
}


