const revenue = require('./revenue.model');

const New = (address, chain, name) => {
    return new Promise((resolve, reject) => {
        if (
            address &&
            address.toString().length === 42 &&
            address.toString().startsWith('0x') &&
            chain &&
            name
        ) {
            const newrevenue = new revenue({
                address: address,
                chain: chain,
                name: name,
            });
            newrevenue.save((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc.toObject());
                }
            });
        }
    });
};

const Getrevenue = (chain, name) => {
    return new Promise((resolve, reject) => {
        revenue
            .find({chain: chain, name: name})
            .sort({created_at: -1})
            .lean()
            .then((revenueDocs) => {
                resolve(revenueDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    Getrevenue,
    New,
};
