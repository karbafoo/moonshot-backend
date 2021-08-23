const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Contract Schema
const ContractSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            index: true,
        },
        chain: {
            type: String,
            required: true,
            index: true,
        },
        isToken: {
            type: Boolean,
            default: false,
        },
        kind: {
            type: String,
            default: 'Contract',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Contract = (module.exports = mongoose.model('Contract', ContractSchema));
