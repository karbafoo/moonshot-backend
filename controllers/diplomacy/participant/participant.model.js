const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Participant Schema
const ParticipantSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            required: true,
        },
        ballot: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            index: true,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            default: 1,
        },
        kind: {
            type: String,
            default: 'Participant',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Participant = (module.exports = mongoose.model(
    'Participant',
    ParticipantSchema
));
