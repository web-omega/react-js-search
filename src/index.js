import React, {Component} from "react";
import "./style.css";
import {AiOutlineSearch as Search} from "react-icons/ai";
import PropTypes from 'prop-types';

/**
 * Search component
 */
class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ""
        };

    }

    // Search will be done using:
    // Object with data -> prop (data)
    // Haystack to search (object property) -> prop (haystack)
    search(searchTerm) {
        let results = undefined;
        if (this.props.data) {

            if (this.props.caseInsensitive) {
                results = this.props.data.filter(object => this.getObjectText(object).toLowerCase().includes(searchTerm.toLowerCase()));
            } else {
                results = this.props.data.filter(object => this.getObjectText(object).includes(searchTerm));
            }
        }
        return results;
    }

    getObjectText(obj) {
        let text = "";
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && this.props.keys.includes(key)) {
                text += obj[key];
            }
        }
        return text;
    }

    render() {
        let placeholderText = "Search...";
        if (this.props.placeHolderText)
            placeholderText = this.props.placeHolderText;

        return (
            <div className="searchComponent">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={placeholderText}
                        name="search"
                        onChange={(e) => this.onSearchChange(e)}
                    />
                    <button onClick={(e) => this.onSearchClick(e)}>
                        <Search/>
                    </button>
                </div>
            </div>
        );
    }

    onSearchChange(e) {
        this.setState({searchValue: e.target.value});
        if (this.props.onSearchTextChange) {
            this.props.onSearchTextChange(e.target.value, this.search(e.target.value));
        }
    }

    onSearchClick(e) {
        if (this.props.onSearchButtonClick) {
            this.props.onSearchButtonClick(this.state.searchValue, this.search(e.target.value));
        }
    }

}

SearchBar.propTypes = {
    onSearchTextChange: PropTypes.func.isRequired,
    onSearchButtonClick: PropTypes.func.isRequired,
    placeHolderText: PropTypes.string,
    data: PropTypes.array,
    keys: PropTypes.array.isRequired
};


export default SearchBar;
