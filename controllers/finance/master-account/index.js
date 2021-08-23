const MasterAccount = require('./master-account.model');

const Make = ({address, chain, name} = {}) => {
    return new Promise((resolve, reject) => {
        if (
            address &&
            address.toString().length === 42 &&
            address.toString().startsWith('0x') &&
            chain &&
            name
        ) {
            MasterAccount.findOne({chain: chain, address: address}).then(
                (ddoc) => {
                    if (ddoc) {
                        ddoc.set({
                            ...(name ? {name: name} : {}),
                        });
                        ddoc.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(doc.toObject());
                            }
                        });
                    } else {
                        const newMasterAccount = new MasterAccount({
                            address: address,
                            chain: chain,
                            name: name,
                        });
                        newMasterAccount.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(doc.toObject());
                            }
                        });
                    }
                }
            );
        }
    });
};

const GetMasterAccounts = ({chain, name, address} = {}) => {
    return new Promise((resolve, reject) => {
        MasterAccount.find({
            ...(chain ? {chain: chain} : {}),
            ...(name ? {name: name} : {}),
            ...(address ? {address: address} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((accountDocs) => {
                resolve(accountDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    GetMasterAccounts,
    Make,
};

const firstCheck = () => {
    MasterAccount.find({})

        .then((accountDocs) => {
            if (!accountDocs || !accountDocs.length) {
                const addr = '0x9B00B2A3514CC05Ea9957ad5e4D279D724a81Afb';
                const newMasterAccount = new MasterAccount({
                    address: addr,
                    chain: '42',
                    name: 'VaN Master',
                });
                newMasterAccount.save((err, doc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                });
            }
        })
        .catch(console.log);
};

firstCheck();
