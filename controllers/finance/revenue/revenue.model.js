const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Revenue Schema
const RevenueSchema = mongoose.Schema(
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
        recepits: {
            type: [{type: Schema.Types.ObjectId, ref: 'Receipt'}],
            default: [],
            index: true,
        },
        kind: {
            type: String,
            default: 'Revenue',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Revenue = (module.exports = mongoose.model('Revenue', RevenueSchema));
