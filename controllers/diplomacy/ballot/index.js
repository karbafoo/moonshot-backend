const Ballot = require('./ballot.model');

const Make = ({name, start, end, tags, description} = {}) => {
    return new Promise((resolve, reject) => {
        const newBallot = new Ballot({
            name: name,
            start: start,
            end: end,
            tags: tags,
            description: description,
        });
        newBallot.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const Update = ({name, start, end, tags, description} = {}) => {
    return new Promise((resolve, reject) => {
        Ballot.findOne({
            name: name,
        }).then((doc) => {
            doc.set({
                ...(start ? {start: start} : {}),
                ...(end ? {end: end} : {}),
                ...(tags && tags.length ? {tags: tags} : {}),
                ...(description ? {description: description} : {}),
            });
            newBallot.save((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc.toObject());
                }
            });
        });
    });
};

const GetBallotByName = ({name} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({name: name})
            .sort({created_at: -1})
            .lean()
            .then((ballotDocs) => {
                resolve(ballotDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetBallots = ({start, end, tags = []} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({
            ...(start ? {start: {$ge: start}} : {}),
            ...(end ? {end: {$le: end}} : {}),
            ...(tags && tags.length ? {tags: {$in: tags}} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((ballotDocs) => {
                resolve(ballotDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    Make,
    Update,
    GetBallotByName,
    GetBallots,
};
