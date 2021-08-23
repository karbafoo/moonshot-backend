const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Appropriation Schema
const AppropriationSchema = mongoose.Schema(
    {
        budget: {
            type: Schema.Types.ObjectId,
            ref: 'Budget',
            required: true,
            index: true,
        },
        objectives: {
            type: Schema.Types.ObjectId,
            ref: 'Objectives',
            required: true,
            index: true,
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
        name: {
            type: String,
            required: true,
        },
        description: {
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
        kind: {
            type: String,
            default: 'Appropriation',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Appropriation = (module.exports = mongoose.model(
    'Appropriation',
    AppropriationSchema
));
