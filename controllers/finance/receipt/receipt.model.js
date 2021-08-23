const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Receipt Schema
const ReceiptSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            index: true,
        },
        to: {
            type: String,
            index: true,
        },
        amount: {
            type: String,
            index: true,
        },
        timestamp: {
            type: Date,
            default: Date.now(),
            index: true,
        },
        kind: {
            type: String,
            default: 'Receipt',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Receipt = (module.exports = mongoose.model('Receipt', ReceiptSchema));
