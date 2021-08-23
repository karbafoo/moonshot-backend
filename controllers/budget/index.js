const Budget = require('./budget.model');
const Appropriation = require('./appropriation.model');
const Objective = require('./objective.model');

const MakeBudget = ({name, bag, start, end, description} = {}) => {
    return new Promise((resolve, reject) => {
        const newBudget = new Budget({
            name: name,
            bag: bag,
            start: start,
            end: end,
            description: description,
        });
        newBudget.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const GetBudget = ({name, start, end, description} = {}) => {
    return new Promise((resolve, reject) => {
        Budget.find({
            ...(name ? {name: name} : {}),
            ...(start ? {start: {$ge: start}} : {}),
            ...(end ? {end: {$le: end}} : {}),
            ...(description ? {description: description} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((dDocs) => {
                resolve(
                    dDocs.map((b) => ({
                        budget_id: b._id,
                        name: b.name,
                        bag: b.bag,
                        start: b.start,
                        end: b.end,
                        description: b.description,
                    }))
                );
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const GetBudgetById = ({budget_id} = {}) => {
    return new Promise((resolve, reject) => {
        Budget.findById(budget_id)
            .then((dDoc) => {
                if (!dDoc) {
                    return reject('NOT_FOUND');
                }
                resolve({
                    budget_id: dDoc._id,
                    name: dDoc.name,
                    bag: dDoc.bag,
                    start: dDoc.start,
                    end: dDoc.end,
                    description: dDoc.description,
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const MakeAppropriation = ({
    name,
    budget_id,
    objectives,
    bag,
    start,
    end,
    description,
} = {}) => {
    return new Promise((resolve, reject) => {
        const newAppropriation = new Appropriation({
            name: name,
            budget: budget_id,
            objectives: objectives,
            bag: bag,
            start: start,
            end: end,
            description: description,
        });
        newAppropriation.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const GetAppropriation = ({
    name,
    budget_id,
    objectives,
    start,
    end,
    description,
} = {}) => {
    return new Promise((resolve, reject) => {
        console.log({
            ...(name ? {name: name} : {}),
            ...(budget_id ? {budget: budget_id} : {}),
            ...(objectives && objectives.length
                ? {objectives: {$in: objectives}}
                : {}),
            ...(start ? {start: {$ge: start}} : {}),
            ...(end ? {end: {$le: end}} : {}),
            ...(description ? {description: description} : {}),
        });
        Appropriation.find({
            ...(name ? {name: name} : {}),
            ...(budget_id ? {budget: budget_id} : {}),
            ...(objectives && objectives.length
                ? {objectives: {$in: objectives}}
                : {}),
            ...(start ? {start: {$ge: start}} : {}),
            ...(end ? {end: {$le: end}} : {}),
            ...(description ? {description: description} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((dDocs) => {
                resolve(
                    dDocs.map((d) => ({
                        appropriation_id: d._id,
                        name: d.name,
                        budget: d.budget_id,
                        objectives: d.objectives,
                        bag: d.bag,
                        start: d.start,
                        end: d.end,
                        description: d.description,
                    }))
                );
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const MakeObjective = ({name, description} = {}) => {
    return new Promise((resolve, reject) => {
        const newObjective = new Objective({
            name: name,
            description: description,
        });
        newObjective.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc.toObject());
            }
        });
    });
};

const GetObjective = ({name, start, end, description} = {}) => {
    return new Promise((resolve, reject) => {
        Objective.find({
            ...(name ? {name: name} : {}),
            ...(start ? {start: {$ge: start}} : {}),
            ...(end ? {end: {$le: end}} : {}),
            ...(description ? {description: description} : {}),
        })
            .sort({created_at: -1})
            .lean()
            .then((dDocs) => {
                resolve(
                    dDocs.map((o) => ({
                        objective_id: o._id,
                        name: o.name,
                        description: o.description,
                    }))
                );
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    GetBudget,
    MakeBudget,
    GetBudgetById,
    GetAppropriation,
    MakeAppropriation,
    GetObjective,
    MakeObjective,
};
