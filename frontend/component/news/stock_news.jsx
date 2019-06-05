import React from 'react'

class StockNews extends React.Component {
    render () {
        let stockNews = this.props.stockNews ? this.props.stockNews : []
        const newsData = stockNews.map(news => {
            return (
                <li>
                    <a href={news.url} className="stock-news-item">
                        <img src={news.image} />
                        <div className="news-content">
                            <h4>{news.source}</h4>
                            <h3>{news.headline}</h3>
                            <p>{news.summary}</p>
                        </div>
                    </a>
                </li>
            )
        })
        return (
            <div className="stock-news">
                <h1>News</h1>
                <ul>
                    {newsData}
                </ul>
            </div>
        )
    }
}

export default StockNews