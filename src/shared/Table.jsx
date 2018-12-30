import React, { Component } from "react";
import _ from "lodash";

class Table extends Component {
	renderCell = (item, column) => {
		if (column.content) return column.content(item);
		return _.get(item, column.path);
	};

	render() {
		const { data, columns } = this.props;
		return (
			<table className="table table-condensed table-hover mt-3">
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							{columns.map((column, index) => (
								<td key={index}>{this.renderCell(item, column)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default Table;
