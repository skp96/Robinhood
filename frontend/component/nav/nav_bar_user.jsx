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

    update(field) {
        return (e) => {
            let input = e.target.value
            this.setState({ [field]: input })
            let matchingSymbols = []

            const { stocks } = this.props
            let allStocks = stocks ? stocks : []
            for (let i = 0; i < allStocks["allStocks"].length; i++) {
                let symbol = allStocks["allStocks"][i]["symbol"]

                if (symbol.indexOf(input.toUpperCase()) != -1) {
                    matchingSymbols.push(allStocks["allStocks"][i])
                }
            }
            this.setState({ ["matches"]: matchingSymbols })
        }
    }

    componentDidMount() {
        const {getAllStocks} = this.props
        getAllStocks()
    }
    render () {
        debugger
        return (
            <nav className="user-nav" >
                <Link className="user-nav-home" to="/">
                    <img src={window.logo} />
                </Link>
                <form className="search-bar-form">
                    <i className="fas fa-search"></i>
                    <input type="text" onChange={this.update("searchInput")} value={this.state.searchInput} name="search"  placeholder="Search" />
                </form>
                <div className="user-nav-links">
                    <button onClick={() => this.props.logout()}>Logout</button>
                </div>
            </nav>
        )
    }
}

export default NavBarUser;