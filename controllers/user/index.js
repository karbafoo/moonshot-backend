const User = require('./user.model');
const Account = require('./account.model');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const Config = require('../../config');
const {
    ecrecover,
    fromRpcSig,
    pubToAddress,
    bufferToHex,
    keccak256,
    // 1keccakFromString,
} = require('ethereumjs-util');

const getNonceForAddress = (address) => {
    return new Promise((resolve, reject) => {
        __getAccount__(address).then(resolve).catch(reject);
    });
};

const Authenticate = ({signedMessage, nonce, address, name} = {}) => {
    return new Promise((resolve, reject) => {
        const n = name.toString().trim().length;
        if (!signedMessage || !n || n.length < 4) {
            return reject(err);
        }
        __Auth__(signedMessage, nonce, address, name)
            .then(resolve)
            .catch(reject);
    });
};

const getUserByAccountId = ({account_id}) => {
    return new Promise((resolve, reject) => {
        Account.findOne({_id: account_id})
            .then((res) => {
                if (!res) {
                    reject(404);
                } else {
                    resolve(res._id);
                }
            })
            .catch(reject);
    });
};

const getUserById = (account_id) => {
    return new Promise((resolve, reject) => {
        User.findOne({account: account_id})
            .then((doc) => {
                if (!doc) {
                    reject(404);
                } else {
                    resolve({
                        user_id: doc._id,
                        name: doc.name,
                        address: doc.address,
                    });
                }
            })
            .catch(reject);
    });
};

const getUsersById = (list = []) => {
    const l = [...new Set(list.map((i) => i.toString()))];
    return Promise.all(l.map((u) => getUserById(u)));
};

const getAll = (list = []) => {
    return new Promise((resolve, reject) => {
        User.find({})
            .then((docs) => {
                resolve(
                    docs.map((doc) => {
                        return {
                            user_id: doc._id,
                            name: doc.name,
                            address: doc.address,
                        };
                    })
                );
            })
            .catch(reject);
    });
};

const getByAddress = ({address}) => {
    return new Promise((resolve, reject) => {
        User.find({address: address.toString().toLowerCase()})
            .then((docs) => {
                console.log(address, docs);
                const doc = docs[0] || {name: 'ERROR'};
                resolve({
                    user_id: doc._id,
                    name: doc.name,
                    address: doc.address,
                });
            })
            .catch(reject);
    });
};

module.exports = {
    getNonceForAddress,
    Authenticate,
    getUserByAccountId,
    getUserById,
    getUsersById,
    getAll,
    getByAddress,
};

const __getAccount__ = (address) => {
    return new Promise((resolve, reject) => {
        if (
            address &&
            address.toString().length === 42 &&
            address.toString().startsWith('0x')
        ) {
            Account.findOne({address: address})
                .then((res) => {
                    if (!res) {
                        const newAccount = new Account({
                            address: address.toString().toLowerCase(),
                            nonce: 'karbafoo-' + uuidv4(),
                        });
                        newAccount.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(doc.nonce);
                            }
                        });
                    } else {
                        resolve(res.nonce);
                    }
                })
                .catch(reject);
        } else {
            reject('ERROR INVALID INPUT');
        }
    });
};

const __getAccountByNonce__ = (nonce) => {
    return new Promise((resolve, reject) => {
        if (nonce && nonce.toString().length > 0) {
            Account.findOne({nonce: nonce})
                .then((doc) => {
                    if (!doc) {
                        reject(404);
                    } else {
                        resolve(doc);
                    }
                })
                .catch(reject);
        } else {
            reject('ERROR INVALID INPUT');
        }
    });
};
const __Auth__ = (signedMessage, nonce, address, name) => {
    return new Promise((resolve, reject) => {
        __getAccountByNonce__(nonce)
            .then((accountDoc) => {
                const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
                const {v, r, s} = fromRpcSig(signedMessage);
                const msg = Buffer.from(nonce);
                const prefixedMsg = keccak256(
                    Buffer.concat([
                        prefix,
                        new Buffer.from(String(msg.length)),
                        msg,
                    ])
                );
                const pubKey = ecrecover(prefixedMsg, v, r, s);
                const recAddr = bufferToHex(pubToAddress(pubKey));

                if (recAddr === accountDoc.address) {
                    __getUser__(accountDoc._id, accountDoc.address, name)
                        .then((userDoc) => {
                            jwt.sign(
                                {account_id: accountDoc._id},
                                Config.USER_SECRET,
                                {
                                    algorithm: 'HS256',
                                },
                                (err, token) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve({
                                            token: token,
                                            profile: {
                                                name: userDoc.name,
                                                user_id: userDoc._id.toString(),
                                                address: accountDoc.address,
                                            },
                                        });
                                    }
                                }
                            );
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

const __getUser__ = (account_id, address, name) => {
    return new Promise((resolve, reject) => {
        if (name && name.toString().length >= 4) {
            User.findOne({account: account_id})
                .then((userDoc) => {
                    if (!userDoc) {
                        const newUser = new User({
                            account: account_id,
                            address: address.toString().toLowerCase(),
                            name: name,
                        });
                        newUser.save((err, doc) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(doc);
                            }
                        });
                    } else {
                        resolve(userDoc);
                    }
                })
                .catch(reject);
        } else {
            reject('less than 4');
        }
    });
};

const adminCheck = () => {
    User.find({})
        .then((userDoc) => {
            if (!userDoc || !userDoc.length) {
                const addr = '0x9B00B2A3514CC05Ea9957ad5e4D279D724a81Afb';
                const nonce = 'karbafoo-6f4e8f96-70c1-4a0d-8cfb-84a7e6c64c7f';
                __getAccount__(addr)
                    .then((nonce) => {
                        Account.findOne({address: address})
                            .then((accountDoc) => {
                                const newUser = new User({
                                    account: accountDoc._id,
                                    address: addr,
                                    name: 'Farhad',
                                });
                                newUser.save((err, doc) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(doc);
                                    }
                                });
                            })
                            .catch(console.log);
                    })
                    .catch(console.log);
            }
        })
        .catch(console.log);
};

adminCheck();
