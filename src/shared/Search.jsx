import React, { Component } from "react";

class Search extends Component {
	render() {
		const { searchTerm, handleSearch } = this.props;
		return (
			<div className="fomr-group">
				<input
					className="form-control"
					type="text"
					name="searchWatchedList"
					id="searchWatchedList"
					placeholder="Search..."
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
		);
	}
}

export default Search;
