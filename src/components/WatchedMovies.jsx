import React, { Component } from "react";
import Table from "../shared/Table";
import Search from "../shared/Search";

class WatchedMovies extends Component {
	render() {
		const columns = [
			{
				label: "Title",
				content: movie => movie.Title
			},
			{
				label: "",
				content: movie => (
					<div>
						<button
							className="btn btn-success btn-sm mr-1"
							onClick={() => onUnwatched(movie)}
						>
							Unwatch
						</button>
						<button
							className="btn btn-danger btn-sm"
							onClick={() => onDelete(movie, data)}
						>
							Delete
						</button>
					</div>
				)
			}
		];

		const {
			data,
			onUnwatched,
			onDelete,
			searchWatchedList,
			handleSearch
		} = this.props;
		return (
			<React.Fragment>
				<Search searchTerm={searchWatchedList} handleSearch={handleSearch} />
				<Table columns={columns} data={data} />
			</React.Fragment>
		);
	}
}

export default WatchedMovies;
