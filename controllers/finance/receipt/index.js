const Receipt = require('./receipt.model');
const Make = ({to, from, amount, description}) => {
    return new Promise((resolve, reject) => {
        const newReceipt = new Receipt({
            to: to,
            amount: amount,
            from: from,
            description: description,
        });
        newReceipt.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const GetReceipt = (chain, name) => {
    return new Promise((resolve, reject) => {
        Receipt.find({chain: chain, name: name})
            .sort({created_at: -1})
            .lean()
            .then((receiptDocs) => {
                resolve(receiptDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    GetReceipt,
    Make,
};
