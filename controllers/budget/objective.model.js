const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Objective Schema
const ObjectiveSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        kind: {
            type: String,
            default: 'Objective',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Objective = (module.exports = mongoose.model(
    'Objective',
    ObjectiveSchema
));
