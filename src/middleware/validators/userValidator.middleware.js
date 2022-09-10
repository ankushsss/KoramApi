const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    body('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('first_name')
        .exists()
        .withMessage('Your first name is required'),
    body('last_name')
        .exists()
        .withMessage('Your last name is required'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin,  Role.User])
        .withMessage('Invalid Role type'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters'),
    body('confirm_password')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number')
];


exports.createRestSchema = [
    body('name')
        .exists()
        .withMessage('name is required')
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 chars long'),
    body('first_name')
        .exists()
        .withMessage('added_by')
        .isAlpha()
        .withMessage('must be integer')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('address')
        .exists()
        .withMessage('Restaurent address is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('contact')
        .exists()
        .withMessage('contact is required')
        .isMobilePhone()
        .withMessage('Must be a valid phone')
];

exports.updateUserSchema = [
    body('username')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('first_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('last_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser, Role.NormalUser])
        .withMessage('Invalid Role type'),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters')
        .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body('confirm_password')
        .optional()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'password', 'confirm_password', 'email', 'role', 'first_name', 'last_name', 'age'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];



exports.updateRestauSchema = [
    body('name')
        .exists()
        .withMessage('name is required')
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 chars long'),
    body('first_name')
        .exists()
        .withMessage('added_by')
        .isAlpha()
        .withMessage('must be integer')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('address')
        .exists()
        .withMessage('Restaurent address is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('contact')
        .exists()
        .withMessage('contact is required')
        .isMobilePhone()
        .withMessage('Must be a valid phone')
];


console.log(body);
exports.validateLogin = [
    body('username')
        .exists()
        .withMessage('username is required')
];
