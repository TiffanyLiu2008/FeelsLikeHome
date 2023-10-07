const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Username is required'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    handleValidationErrors
];

// #3 ; / ; POST
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;
        const existingEmail = await User.findOne({where: {email: email}});
        if (existingEmail) {
            const err = new Error("User already exists");
            err.status = 500;
            err.errors = ["User with that email already exists"];
            return next(err);
        }
        const existingUsername = await User.findOne({where: {username: username}});
        if (existingUsername) {
            const err = new Error("User already exists");
            err.status = 500;
            err.errors = ["User with that username already exists"];
            return next(err);
        }
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, username, hashedPassword, firstName, lastName });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;
