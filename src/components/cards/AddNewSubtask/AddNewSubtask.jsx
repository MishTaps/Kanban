/* eslint-disable react/prop-types */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AddNewSubtask = ({ allBoards, setAllBoards, selectedBoard, indexColumn, indexCard }) => {
	const addNewSubtask = () => {
		const newSubtask = {
			name: 'Новая подзадача',
			id: uuidv4(),
			finished: false,
		};
		const indexBoard = allBoards.boards.indexOf(selectedBoard);

		setAllBoards((draft) => {
			draft.boards[indexBoard].columns[indexColumn].cards[indexCard].subtasks.push(newSubtask);
		});
	};
	return (
		<div className="subtask__addNew" onClick={addNewSubtask}>
			+ Новая подзадача
		</div>
	);
};
