const Contract = require('./contract.model');

const Make = ({address, chain, name, isToken} = {}) => {
    return new Promise((resolve, reject) => {
        if (
            address &&
            address.toString().length === 42 &&
            address.toString().startsWith('0x') &&
            chain &&
            name
        ) {
            Contract.findOne({chain: chain, address: address}).then((ddoc) => {
                if (ddoc) {
                    ddoc.set({
                        ...(name ? {name: name} : {}),
                        ...(isToken != null ? {isToken: isToken} : {}),
                    });
                    ddoc.save((err, doc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(doc.toObject());
                        }
                    });
                } else {
                    const newContract = new Contract({
                        address: address,
                        chain: chain,
                        name: name,
                        isToken: isToken,
                    });
                    newContract.save((err, doc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(doc.toObject());
                        }
                    });
                }
            });
        }
    });
};

const GetContract = ({chain, name, address, isToken} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({
            ...(chain ? {chain: chain} : {}),
            ...(name ? {name: name} : {}),
            ...(address ? {address: address} : {}),
            ...(isToken ? {isToken: isToken} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((contractDocs) => {
                resolve(contractDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    GetContract,
    Make,
};
