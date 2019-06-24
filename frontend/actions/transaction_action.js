import * as TransactionApiUtil from '../util/transaction_api_util'

// export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION'
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'

// const receiveTransaction = (transaction) => {
//     return {
//         type: RECEIVE_TRANSACTION,
//         transaction: transaction,
//     }
// }

const receiveTransactions = (transactions) => {
    return {
        type: RECEIVE_TRANSACTIONS,
        transactions: transactions
    }
}

export const createTransaction = (transaction) => {
    return (dispatch) => {
        return TransactionApiUtil.createTransaction(transaction).then(transactions => {
            return dispatch(receiveTransactions(transactions))
        });
    };
}

export const fetchTransactions = (portfolioId) => {
    return (dispatch) => {
        return TransactionApiUtil.fetchTransactions(portfolioId).then(transactions => {
            return dispatch(receiveTransactions(transactions))
        });
    };
}