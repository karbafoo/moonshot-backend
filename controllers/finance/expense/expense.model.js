const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Expense Schema
const ExpenseSchema = mongoose.Schema(
    {
        budget: {
            type: Schema.Types.ObjectId,
            ref: 'Budget',
        },
        appropriation: {
            type: Schema.Types.ObjectId,
            ref: 'Appropriation',
        },
        description: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            index: true,
        },
        symbol: {
            type: String,
            index: true,
        },
        data: {
            type: String,
            index: true,
        },
        recepits: {
            type: [{type: Schema.Types.ObjectId, ref: 'Receipt'}],
            default: [],
            index: true,
        },
        kind: {
            type: String,
            default: 'Expense',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Expense = (module.exports = mongoose.model('Expense', ExpenseSchema));
