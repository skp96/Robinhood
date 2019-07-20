import React from 'react';
import { Link } from 'react-router-dom';


class NavBarUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: "",
            matches: []
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        document.getElementById("root").addEventListener("click", this.removeAccount);
    }

    componentWillUnmount() {
        document.getElementById("root").removeEventListener("click", this.removeErrors)
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
        let account = document.getElementById("account")
        account.classList.add("change-to-visible")
    }

    removeAccount() {
        let account = document.getElementById("account")
        account.classList.remove("change-to-visible")
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
                        <input type="text" onChange={this.update("searchInput")} value={this.state.searchInput} name="search"  placeholder="Search" className="search-input" />
                    </form>
                    <div className="search-results">
                        {searchResults}
                    </div>
                </div>
                <div className="general-items">
                    <Link className="home-link" to="/">Home</Link>
                    <div className="home-notification">
                        <button>Notification</button>
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
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Log Out</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="user-nav-links">
                    <div onClick={() => this.props.logout()}>Logout</div>
                </div> */}
            </nav>
        )
    }
}

export default NavBarUser;