const { Auth } = require('../models');
const AuthDTO = require('../dto/auth.dto');

/**
 * Get all users
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await Auth.find().sort({ created_at: -1 });
        const response = users.map(AuthDTO.response);

        res.status(200).json({
            success: true,
            count: response.length,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user by HUID
 */
const getUserByHuid = async (req, res, next) => {
    try {
        const user = await Auth.findOne({ huid: req.params.huid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: AuthDTO.response(user),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create user
 */
const createUser = async (req, res, next) => {
    try {
        const payload = AuthDTO.create(req.body);
        const user = await Auth.create(payload);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: AuthDTO.response(user),
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Username or email already exists',
            });
        }
        next(error);
    }
};

/**
 * Update user by HUID
 */
const updateUserByHuid = async (req, res, next) => {
    try {
        const payload = AuthDTO.update(req.body);

        const user = await Auth.findOneAndUpdate(
            { huid: req.params.huid },
            payload,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: AuthDTO.response(user),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete user by HUID
 */
const deleteUserByHuid = async (req, res, next) => {
    try {
        const user = await Auth.findOneAndDelete({ huid: req.params.huid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserByHuid,
    createUser,
    updateUserByHuid,
    deleteUserByHuid,
};
