const Contract = require('./contract.model');
const ERC20Token = require('./erc20.model');

const Make = ({address, chain, name, imageUrl} = {}) => {
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
                        ...(imageUrl ? {imageUrl: imageUrl} : {}),
                    });
                    ddoc.save((err, doc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(parseContractList([doc.toObject()])[0]);
                        }
                    });
                } else {
                    const newContract = new Contract({
                        address: address,
                        chain: chain,
                        name: name,
                        imageUrl: imageUrl,
                    });
                    newContract.save((err, doc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(parseContractList([doc.toObject()])[0]);
                        }
                    });
                }
            });
        } else {
            reject({msg: 'bad input', code: 406});
        }
    });
};

const GetContractHistorys = ({chain, name, address} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({
            ...(chain ? {chain: chain} : {}),
            ...(name ? {name: name} : {}),
            ...(address ? {address: address} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((contractDocs) => {
                resolve(parseContractList(contractDocs));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const GetContractByName = ({chain, name} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({
            ...(chain ? {chain: chain} : {}),
            ...(name ? {name: name} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((contractDocs) => {
                const contractDoc = contractDocs[0];
                if (contractDoc) {
                    resolve({
                        name: contractDoc.name,
                        chain: contractDoc.chain,
                        address: contractDoc.address,
                    });
                } else {
                    reject({msg: 'NOT_FOUND', code: 404});
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const GetUniqueContracts = ({chain, name, address} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.aggregate([
            {
                $match: {
                    ...(chain ? {chain: chain} : {}),
                    ...(name ? {name: name} : {}),
                    ...(address ? {address: address} : {}),
                },
            },
            {
                $sort: {created_at: -1},
            },
            {
                $group: {
                    _id: {
                        name: '$name',
                    },

                    doc: {$first: '$$ROOT'},
                },
            },
        ])
            .then((uniqueContracts) => {
                // Contract.find();
                resolve(
                    parseContractList(
                        uniqueContracts.map((aggrDoc) => aggrDoc.doc)
                    )
                );
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const MakeERC20Token = ({address, chain, name, symbol, imageUrl} = {}) => {
    return new Promise((resolve, reject) => {
        if (
            address &&
            address.toString().length === 42 &&
            address.toString().startsWith('0x') &&
            chain &&
            name
        ) {
            ERC20Token.findOne({chain: chain, address: address}).then(
                (ddoc) => {
                    if (ddoc) {
                        ddoc.set({
                            ...(name ? {name: name} : {}),
                            ...(symbol ? {symbol: symbol} : {}),
                            ...(imageUrl ? {imageUrl: imageUrl} : {}),
                        });
                        ddoc.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(parseTokenList([doc.toObject()])[0]);
                            }
                        });
                    } else {
                        const newERC20Token = new ERC20Token({
                            address: address,
                            chain: chain,
                            name: name,
                            symbol: symbol,
                            imageUrl: imageUrl,
                        });
                        newERC20Token.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(parseTokenList([doc.toObject()])[0]);
                            }
                        });
                    }
                }
            );
        } else {
            reject({msg: 'bad input', code: 406});
        }
    });
};

const GetUniqueERC20Tokens = ({chain, name, address, symbol} = {}) => {
    return new Promise((resolve, reject) => {
        ERC20Token.aggregate([
            {
                $match: {
                    ...(chain ? {chain: chain} : {}),
                    ...(name ? {name: name} : {}),
                    ...(symbol ? {symbol: symbol} : {}),
                    ...(address ? {address: address} : {}),
                },
            },
            {
                $sort: {created_at: -1},
            },
            {
                $group: {
                    _id: {
                        name: '$name',
                    },

                    doc: {$first: '$$ROOT'},
                },
            },
        ])
            .then((uniqueERC20Tokens) => {
                resolve(
                    parseTokenList(
                        uniqueERC20Tokens.map((aggrDoc) => aggrDoc.doc)
                    )
                );
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetERC20TokenHistory = ({chain, name, address, symbol} = {}) => {
    return new Promise((resolve, reject) => {
        ERC20Token.find({
            ...(chain ? {chain: chain} : {}),
            ...(name ? {name: name} : {}),
            ...(symbol ? {symbol: symbol} : {}),
            ...(address ? {address: address} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((tokenDocs) => {
                resolve(parseTokenList(tokenDocs));
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetERC20TokenByName = ({chain, name} = {}) => {
    return new Promise((resolve, reject) => {
        ERC20Token.find({
            ...(chain ? {chain: chain} : {}),
            ...(name ? {name: name} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((tokenDocs) => {
                const tokenDoc = tokenDocs[0];
                if (tokenDoc) {
                    resolve({
                        name: tokenDoc.name,
                        chain: tokenDoc.chain,
                        symbol: tokenDoc.symbol,
                        address: tokenDoc.address,
                    });
                } else {
                    reject({msg: 'NOT_FOUND', code: 404});
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
module.exports = {
    GetContractHistorys,
    GetUniqueContracts,
    GetContractByName,
    Make,
    ///
    MakeERC20Token,
    GetUniqueERC20Tokens,
    GetERC20TokenHistory,
    GetERC20TokenByName,
};

const parseContractList = (contractDocs = []) => {
    return contractDocs.map((contractDoc) => ({
        name: contractDoc.name,
        chain: contractDoc.chain,
        address: contractDoc.address,
        created_at: contractDoc.created_at,
    }));
};
const parseTokenList = (tokenDocs = []) => {
    return tokenDocs.map((tokenDoc) => ({
        name: tokenDoc.name,
        chain: tokenDoc.chain,
        symbol: tokenDoc.symbol,
        address: tokenDoc.address,
        created_at: tokenDoc.created_at,
    }));
};
