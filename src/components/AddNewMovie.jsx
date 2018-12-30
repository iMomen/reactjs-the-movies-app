import React, { Component } from "react";

class AddNewMovie extends Component {
	render() {
		const { movieName, handleOnChange, handelAddNew } = this.props;
		return (
			<div className="row mb-3">
				<div className="col-md-3">
					<div className="fomr-group">
						<div className="input-group">
							<input
								className="form-control"
								type="text"
								name="movieName"
								id="movieName"
								placeholder="Add new movie..."
								value={movieName}
								onChange={handleOnChange}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-outline-success"
									type="button"
									onClick={handelAddNew}
								>
									+ Add new movie
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddNewMovie;
