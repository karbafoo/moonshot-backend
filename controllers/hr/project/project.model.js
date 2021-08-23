const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project Schema
const ProjectSchema = mongoose.Schema(
    {
        groups: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Group',
                },
            ],
            default: [],
        },
        name: {
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
            default: 'Project',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Project = (module.exports = mongoose.model('Project', ProjectSchema));
