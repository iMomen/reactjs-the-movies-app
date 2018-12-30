import React, { Component } from "react";
import Header from "./shared/Header";
import WishListMovies from "./components/WishListMovies";
import WatchedMovies from "./components/WatchedMovies";
import AddNewMovie from "./components/AddNewMovie";
import {
	getWishedMovies,
	getWatchedMovies,
	getMovieByName
} from "./services/httpServices";

class App extends Component {
	state = {
		/* Change this titles to get different list of movies */
		wishedMoviesTitle: "inception",
		watchedMovieTitle: "x-men",
		searchTerm: "",
		newMovieName: "",
		wishListMovies: [],
		filtredWishListMovies: [],
		watchedMovies: [],
		filtredWatchedMovies: []
	};

	async componentDidMount() {
		const { wishedMoviesTitle, watchedMovieTitle } = this.state;
		const {
			data: { Search: wishListMovies }
		} = await getWishedMovies(wishedMoviesTitle);
		const {
			data: { Search: watchedMovies }
		} = await getWatchedMovies(watchedMovieTitle);
		this.setState({
			watchedMovies,
			filtredWatchedMovies: watchedMovies,
			wishListMovies,
			filtredWishListMovies: wishListMovies
		});
	}

	/* handleAddToWishList => onUnwatched: add to wishListMovies and remove from watchedMovies */
	handleAddToWishList = wishedMovie => {
		const watchedMovies = this.state.filtredWatchedMovies.filter(
			movie => movie.imdbID !== wishedMovie.imdbID
		);
		const wishListMovies = [...this.state.filtredWishListMovies];
		wishListMovies.push(wishedMovie);
		this.setState({
			filtredWatchedMovies: watchedMovies,
			filtredWishListMovies: wishListMovies
		});
	};

	/* handleAddToWatchedList => onWatched: add to watchedMovies and remove from wishListMovies */
	handleAddToWatchedList = watchedMovie => {
		const wishListMovies = this.state.filtredWishListMovies.filter(
			movie => movie.imdbID !== watchedMovie.imdbID
		);
		const watchedMovies = [...this.state.filtredWatchedMovies];
		watchedMovies.push(watchedMovie);
		this.setState({
			filtredWishListMovies: wishListMovies,
			filtredWatchedMovies: watchedMovies
		});
	};

	handleDelete = (dataArr, deletedMovie) => {
		const movies = this.state[dataArr].filter(
			m => m.imdbID !== deletedMovie.imdbID
		);
		this.setState({
			[dataArr]: movies
		});
	};

	filterMovies = (dataArr, filtredDataArr, { currentTarget }) => {
		const searchTerm = currentTarget.value;
		this.setState({ searchTerm });
		let movies = this.state[dataArr];
		movies = movies.filter(m =>
			m.Title.toLowerCase().startsWith(searchTerm.toLowerCase())
		);
		this.setState({
			[filtredDataArr]: movies
		});
	};

	setNewMovieName = ({ currentTarget }) => {
		const newMovieName = currentTarget.value;
		this.setState({ newMovieName });
	};

	handelAddNew = async () => {
		const { data: newMovie } = await getMovieByName(this.state.newMovieName);
		const wishListMovies = [...this.state.filtredWishListMovies];
		wishListMovies.push(newMovie);
		this.setState({
			filtredWishListMovies: wishListMovies
		});
	};

	render() {
		const {
			filtredWishListMovies,
			filtredWatchedMovies,
			searchTerm,
			newMovieName
		} = this.state;
		return (
			<React.Fragment>
				<Header />
				<main className="container-fluid">
					<AddNewMovie
						handleOnChange={this.setNewMovieName}
						movieName={newMovieName}
						handelAddNew={this.handelAddNew}
					/>
					<div className="row">
						<div className="col">
							<h5>
								WishList
								<span className="badge badge-pill badge-light">
									{filtredWishListMovies.length}
								</span>
							</h5>
							<WishListMovies
								data={filtredWishListMovies}
								onDelete={movie =>
									this.handleDelete("filtredWishListMovies", movie)
								}
								onWatched={this.handleAddToWatchedList}
								searchWished={searchTerm}
								handleSearch={e =>
									this.filterMovies(
										"wishListMovies",
										"filtredWishListMovies",
										e
									)
								}
							/>
						</div>
						<div className="col">
							<h5>
								Watched Movies
								<span className="badge badge-pill badge-light">
									{filtredWatchedMovies.length}
								</span>
							</h5>
							<WatchedMovies
								data={filtredWatchedMovies}
								onDelete={movie =>
									this.handleDelete("filtredWatchedMovies", movie)
								}
								onUnwatched={this.handleAddToWishList}
								searchWatched={searchTerm}
								handleSearch={e =>
									this.filterMovies("watchedMovies", "filtredWatchedMovies", e)
								}
							/>
						</div>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
