import React from 'react';
import { Link } from 'react-router-dom';


class NavBarUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: "",
            matches: [],
            zIndexSet: false,
            setTrans: false,
        }
        this.update = this.update.bind(this)
        this.handleChart = this.handleChart.bind(this)
        this.resetZindex = this.resetZindex.bind(this)
        this.handleTransactionContainer = this.handleTransactionContainer.bind(this)
        this.resetTransWatchlist = this.resetTransWatchlist.bind(this)
    }

    componentDidMount() {
        document.getElementById("root").addEventListener("click", this.removeAccount);
        document.getElementById("root").addEventListener("click", this.resetZindex);
        document.getElementById("root").addEventListener("click", this.resetTransWatchlist);
        this.setChartStyling()
    }

    componentWillUnmount() {
        document.getElementById("root").removeEventListener("click", this.removeAccount);
        document.getElementById("root").removeEventListener("click", this.resetZindex);
        document.getElementById("root").removeEventListener("click", this.resetTransWatchlist);
    }

    setChartStyling() {
        let chart = document.getElementsByClassName("recharts-wrapper")[0]
        if (chart !== undefined) {
            chart.style.zIndex = "1"
        }
        
    }

    update(field) {
        return (e) => {
            let input = e.target.value
            this.setState({ [field]: input })
            const {searchStocks} = this.props
            if (input != "") {
                searchStocks(input).then(stocks => {

                    this.setState({ ["matches"]: stocks.searchedStocks["searches"] })
                })
            } else {
                this.setState({["matches"]: []})
            }
        }
    }

    handleClassChange() {
        
        let transactionWatchlist = document.getElementById("trans-watch")
        debugger
        if (transactionWatchlist !== null) {

            transactionWatchlist.style.zIndex = "-1"
            this.setState({ ["setTrans"]: true })
        }

        let account = document.getElementById("account")
        account.classList.add("change-to-visible")
    }

    removeAccount() {
        let account = document.getElementById("account")
        account.classList.remove("change-to-visible")
    }

    handleChart() {
        let chart = document.getElementsByClassName("recharts-wrapper")[0]
        chart.style.zIndex = "-1"
        this.setState({ ["zIndexSet"]: true});

    }

    resetZindex() {
        if (this.state.zIndexSet === true) {
            let chart = document.getElementsByClassName("recharts-wrapper")[0]
            chart.style.zIndex = "1"
        }
    }

    handleTransactionContainer() {
        let transactionWatchlist = document.getElementById("trans-watch")
        transactionWatchlist.style.zIndex = "-1"
        this.setState({ ["setTrans"]: true})
    }

    resetTransWatchlist() {
        if (this.state.setTrans === true) {
            let transactionWatchlist = document.getElementById("trans-watch")
            transactionWatchlist.style.zIndex = "1"
        }
    }



    render () {
        const {currentUser} = this.props

        let buying_power = currentUser.portfolio.buying_power

        let searchResults = this.state.matches.map((result, idx) => {
            let symbol = result.symbol
            let name = result.name
            return (
                <Link to={`/stocks/${symbol}`} key={idx} className="search-row">
                    <div className="search-cell">{symbol}</div>
                    <div className="search-cell">{name}</div>
                </Link>
            )
        })

        if (searchResults.length > 0) {
            searchResults.unshift(<h1 key="search" className="search-cell">Stocks</h1>)
        }

        if (searchResults.length == 0 && this.state.searchInput) {
            searchResults = <div className="search-cell-error">We were unable to find any results for your search.</div>
        }

        return (
            <nav className="user-nav" >
                <Link className="user-nav-home" to="/">
                    <i className="fas fa-feather-alt"></i>
                </Link>
                <div className="search-bar-container">
                    <form className="search-bar-form">
                        <i className="fas fa-search"></i>
                        <input type="text" onChange={this.update("searchInput")} onClick={() => this.handleChart()} value={this.state.searchInput} name="search"  placeholder="Search" className="search-input" id="search-box" />
                    </form>
                    <div className="search-results">
                        {searchResults}
                    </div>
                </div>
                <div className="general-items">
                    <Link className="home-link" to="/">Home</Link>
                    <div className="home-notification">
                        <button onClick={() => this.handleTransactionContainer()}>Notification</button>
                        <ul className="notfication-contents">
                            <li>Funds Available</li>
                            <li>${buying_power.toLocaleString(undefined, { maximumFractionDigits: 2 })} is now available for trading</li>
                        </ul>
                    </div>
                    <div className="account-info">
                        <button onClick={ () => this.handleClassChange()}>Account</button> 
                        <ul className="account-content" id="account">
                            <li>{currentUser.fname + " " + currentUser.lname}</li>
                            <li>${buying_power.toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                            <li>Buying Power</li>
                            <li></li>
                            <li onClick={() => this.props.logout()}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Log Out</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBarUser;