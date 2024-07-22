/* eslint-disable react/prop-types */
import React from 'react';
import { require } from 'uuid';

export const AddNewSubtask = ({ allBoards, setAllBoards, selectedBoard, indexColumn, indexCard }) => {
	const addNewSubtask = () => {
		const { v4: uuidv4 } = require('uuid');
		const newSubtask = {
			name: 'Новая подзадача',
			id: uuidv4(),
			finished: false,
		};

		setAllBoards((draft) => {
			draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards[indexCard].subtasks.push(
				newSubtask,
			);
		});
	};
	return (
		<div className="subtask__addNew" onClick={addNewSubtask}>
			+ Новая подзадача
		</div>
	);
};
