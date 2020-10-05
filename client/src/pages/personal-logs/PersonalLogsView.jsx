import _ from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const PersonalLogsView = ({
	events,
	handleClick
}) => (
	<div className="container">
		<div className="jumbotron">
			<h1 className="display-4">
				Hello, welcome to your activity chart!
			</h1>
			<Button onClick={handleClick}>
				Add Event
			</Button>
		</div>
			{events.length > 0 && (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Time</th>
							<th>Text</th>
						</tr>
					</thead>
					<tbody>
						{_.map(events, (event) => (
							<tr>
								<td>{event.timestamp}</td>
								<td>{event.text}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
	</div>
);

export default PersonalLogsView;
