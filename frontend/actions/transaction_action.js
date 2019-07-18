import * as TransactionApiUtil from '../util/transaction_api_util'

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION"

const receiveTransaction = (transaction) => {
    return {
        type: RECEIVE_TRANSACTION,
        transaction: transaction,
    }
}

const receiveTransactions = (transactions) => {
    return {
        type: RECEIVE_TRANSACTIONS,
        transactions: transactions
    }
}

export const createTransaction = (transaction) => {

    return (dispatch) => {
        return TransactionApiUtil.createTransaction(transaction).then(transaction => {
            return dispatch(receiveTransaction(transaction))
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