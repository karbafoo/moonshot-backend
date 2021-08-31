const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ERC20Token Schema
const ERC20TokenSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            unique: true,
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
        imageUrl: {
            type: String,
        },
        symbol: {
            type: String,
        },
        kind: {
            type: String,
            default: 'ERC20Token',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const ERC20Token = (module.exports = mongoose.model(
    'ERC20Token',
    ERC20TokenSchema
));
