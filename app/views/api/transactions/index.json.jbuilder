json.transactions @transactions do |transaction|

        json.symbol transaction.stock.symbol
        json.shares transaction.shares
        json.purchasePrice transaction.purchase_price

end