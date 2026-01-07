const mongoose = require('mongoose');
const Counter = require('./Counter.model');
const { hashPassword } = require('../utils/hash');

const authSchema = new mongoose.Schema(
    {
        // Auto-generated MongoDB ObjectId (_id) is default

        huid: {
            type: Number,
            unique: true,
            index: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false, // never expose password by default
        },

        full_name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        contact_number: {
            type: String,
            default: null,
            match: [/^[0-9+\- ]{7,20}$/, 'Invalid contact number'],
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Invalid email address',
            ],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        versionKey: false,
    }
);
module.exports = mongoose.model('Auth', authSchema);
