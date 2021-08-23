const Participant = require('./participant.model');

const Make = ({user, ballot, limit, weight} = {}) => {
    return new Promise((resolve, reject) => {
        const newParticipant = new Participant({
            user: user,
            ballot: ballot,
            limit: limit,
            weight: weight,
        });
        newParticipant.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const Update = ({user, ballot, limit, weight} = {}) => {
    return new Promise((resolve, reject) => {
        Participant.findOne({
            user: user,
            ballot: ballot,
        }).then((doc) => {
            doc.set({
                ...(ballot ? {ballot: ballot} : {}),
                ...(limit ? {limit: limit} : {}),
                ...(weight ? {weight: weight} : {}),
                ...(votes ? {votes: votes} : {}),
            });
            newParticipant.save((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc.toObject());
                }
            });
        });
    });
};

const GetParticipantByUserId = ({user_id} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({user: user_id})
            .sort({created_at: -1})
            .lean()
            .then((participantDocs) => {
                resolve(participantDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetParticipantsByUserId = ({user_id} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({user: user_id})
            .sort({created_at: -1})
            .lean()
            .then((participantDocs) => {
                resolve(participantDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const GetParticipantByBallotId = ({ballot_id} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({ballot: ballot_id})
            .sort({created_at: -1})
            .lean()
            .then((participantDocs) => {
                resolve(participantDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetParticipantsByBallotId = ({ballot_id} = {}) => {
    return new Promise((resolve, reject) => {
        Contract.find({ballot: ballot_id})
            .sort({created_at: -1})
            .lean()
            .then((participantDocs) => {
                resolve(participantDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    Make,
    Update,
    GetParticipantByUserId,
    GetParticipantsByUserId,
    GetParticipantByBallotId,
    GetParticipantsByBallotId,
};
