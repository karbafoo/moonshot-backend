const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Vote Schema
const VoteSchema = mongoose.Schema(
    {
        ballot: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            index: true,
            required: true,
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: 'Participant',
            required: true,
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: 'Participant',
            required: true,
        },
        kind: {
            type: String,
            default: 'Vote',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Vote = (module.exports = mongoose.model('Vote', VoteSchema));
