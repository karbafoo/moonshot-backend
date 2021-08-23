const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        roles: {
            type: [String],
            default: [],
        },
        kind: {
            type: String,
            default: 'User',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const User = (module.exports = mongoose.model('User', UserSchema));
