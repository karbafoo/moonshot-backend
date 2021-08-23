const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MasterAccount Schema
const MasterAccountSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            index: true,
        },
        chain: {
            type: String,
            required: true,
            index: true,
        },
        kind: {
            type: String,
            default: 'MasterAccount',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const MasterAccount = (module.exports = mongoose.model(
    'MasterAccount',
    MasterAccountSchema
));
