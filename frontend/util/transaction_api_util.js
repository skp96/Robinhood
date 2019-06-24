export const createTransaction = (transaction) => {
    return $.ajax({
        method: 'POST',
        url: 'api/transactions',
        data: {transaction}
    });
}

export const fetchTransactions = (portfolioId) => {
    return $.ajax({
        method: 'GET',
        url: 'api/transaction',
        data: {portfolioId}
    });
}

