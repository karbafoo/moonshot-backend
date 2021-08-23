const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Group Schema
const GroupSchema = mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        color: {
            type: String,
        },
        description: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
        kind: {
            type: String,
            default: 'Group',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Group = (module.exports = mongoose.model('Group', GroupSchema));
