const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const authController = require('../controllers/auth.controller');
// const authMiddleware = require('../middlewares/auth.middleware');
// const validate = require('../middlewares/validate.middleware');
const baseRoute = "/users";

router.get('/test', (req, res) => {
    const state = mongoose.connection.readyState;

    /**
     * Mongoose connection states:
     * 0 = disconnected
     * 1 = connected
     * 2 = connecting
     * 3 = disconnecting
     */
    let statusMessage = '';

    switch (state) {
        case 0:
            statusMessage = 'MongoDB is disconnected ❌';
            break;
        case 1:
            statusMessage = 'MongoDB is connected ✅';
            break;
        case 2:
            statusMessage = 'MongoDB is connecting... ⏳';
            break;
        case 3:
            statusMessage = 'MongoDB is disconnecting... ⚠️';
            break;
        default:
            statusMessage = 'Unknown MongoDB state';
    }

    res.status(200).json({
        mongoState: state,
        message: statusMessage,
    });
});

/** 
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (can be protected later)
 */
router.get(`${baseRoute}/`, authController.getAllUsers);

/**
 * @route   GET /api/users/:huid
 * @desc    Get user by HUID
 * @access  Private
 */
router.get(`${baseRoute}/:huid`, authController.getUserByHuid);

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Public (or Admin only later)
 */
router.post(`${baseRoute}/`, authController.createUser);

/**
 * @route   PUT /api/users/:huid
 * @desc    Update user by HUID
 * @access  Private
 */
router.put(`${baseRoute}/:huid`, authController.updateUserByHuid);

/**
 * @route   DELETE /api/users/:huid
 * @desc    Delete user by HUID
 * @access  Private (Admin)
 */
router.delete(`${baseRoute}/:huid`, authController.deleteUserByHuid);

module.exports = router;
