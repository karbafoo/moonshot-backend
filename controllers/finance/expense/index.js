const Expense = require('./expense.model');
const ReceiptController = require('../receipt');
const Make = ({
    address,
    symbol,
    budget,
    appropriation,
    amount,
    weights,
    users,
    tx,
    description,
}) => {
    return new Promise((resolve, reject) => {
        const totaoLWeight = weights.reduce((sum, i) => sum + parseFloat(i), 0);
        Promise.all(
            users.map((u, i) =>
                ReceiptController.Make({
                    to: u,
                    amount: (parseFloat(weights[i]) / totaoLWeight) * amount,
                    from: address,
                    description: description,
                })
            )
        )
            .then((receiptDocs) => {
                const newExpense = new Expense({
                    from: address,
                    symbol: symbol,
                    budget: budget,
                    appropriation: appropriation,
                    amount: amount,
                    recepits: receiptDocs,
                    description: description,
                    data: tx,
                });
                newExpense.save((err, doc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const GetExpense = ({chain, name}) => {
    return new Promise((resolve, reject) => {
        Expense.find({})
            .sort({created_at: -1})
            .populate({path: 'recepits'})
            .lean()
            .then((expenseDocs) => {
                resolve(expenseDocs);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    GetExpense,
    Make,
};
