const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Ballot Schema
const BallotSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        start: {
            type: String,
        },
        end: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
        },
        kind: {
            type: String,
            default: 'Ballot',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Ballot = (module.exports = mongoose.model('Ballot', BallotSchema));
