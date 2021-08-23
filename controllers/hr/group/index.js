const Group = require('./group.model');

const Make = ({role, color, tags, description} = {}) => {
    return new Promise((resolve, reject) => {
        Group.findOne({role: role}).then((ddoc) => {
            if (ddoc) {
                ddoc.set({
                    ...(color ? {color: color} : {}),
                    ...(tags && tags.length ? {tags: tags} : {}),
                    ...(description ? {description: description} : {}),
                });
                ddoc.save((err, doc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                });
            } else {
                const newGroup = new Group({
                    role: role,
                    color: color,
                    tags: tags,
                    description: description,
                });
                newGroup.save((err, doc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                });
            }
        });
    });
};

const GetGroupByRole = ({role} = {}) => {
    return new Promise((resolve, reject) => {
        Group.findOne({role: role})
            .sort({created_at: -1})
            .lean()
            .then((groupDoc) => {
                resolve(groupDoc);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetGroups = (color = '', tags = []) => {
    return new Promise((resolve, reject) => {
        Group.find({
            ...(color ? {color: color} : {}),
            ...(tags && tags.length ? {tags: {$in: tags}} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((groupDocs) => {
                resolve(groupDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    Make,
    GetGroupByRole,
    GetGroups,
};

const ethers = require('ethers');
const byte32ToString = (role) => {
    return ethers.utils.parseBytes32String(role);
};
