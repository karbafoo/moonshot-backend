const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Budget Schema
const BudgetSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        bag: {
            type: [
                {
                    amount: Number,
                    symbol: String,
                    name: String,
                    address: String,
                },
            ],
            default: [],
        },
        description: {
            type: String,
            required: true,
        },
        kind: {
            type: String,
            default: 'Budget',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Budget = (module.exports = mongoose.model('Budget', BudgetSchema));
