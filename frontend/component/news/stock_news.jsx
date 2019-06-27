import React from 'react'

class StockNews extends React.Component {
    render () {
        let stockNews = this.props.stockNews ? this.props.stockNews : []
        const newsData = stockNews.map((news, idx) => {
            return (
                <li key={idx}>
                    <a href={news.url} className="stock-news-item">
                        <img src={news.image} width="200" height="200" className="news-image" />
                        <div className="news-content">
                            <h3>{news.source}</h3>
                            <h4>{news.headline}</h4>
                        </div>
                    </a>
                </li>
            )
        })
        return (
            <div>
                <div className = "stock-news">
                    <h1>News</h1>
                </div>
                <ul className="stock-news-container">
                    {newsData}
                </ul>
            </div>
        )
    }
}

export default StockNews