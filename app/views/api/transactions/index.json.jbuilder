json.array! @transactions do |transaction|
    
    json.portfolio_id transaction.portfolio_id
    json.stock_id transaction.stock_id
    json.purchase_price transaction.purchase_price
    json.shares transaction.shares

    json.portfolio_join do 
        json.id @portfolio_join.id
        json.portfolio_id @portfolio_join.portfolios_id
        json.stock_id @portfolio_join.stocks_id
        json.shares @portfolio_join.shares
    end
end