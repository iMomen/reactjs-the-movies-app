import React, { Component } from "react";
import Table from "../shared/Table";
import Search from "../shared/Search";

class WishListMovies extends Component {
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
							onClick={() => onWatched(movie)}
						>
							Watched
						</button>
						<button
							className="btn btn-danger btn-sm"
							onClick={() => onDelete(movie)}
						>
							Delete
						</button>
					</div>
				)
			}
		];

		const {
			data,
			onWatched,
			onDelete,
			searchWishListTerm,
			handleSearch
		} = this.props;
		return (
			<React.Fragment>
				<Search searchTerm={searchWishListTerm} handleSearch={handleSearch} />
				<Table columns={columns} data={data} />
			</React.Fragment>
		);
	}
}

export default WishListMovies;
