/* eslint-disable react/prop-types */
import React from 'react';

export const DeleteSubtask = ({ allBoards, selectedBoard, indexColumn, indexCard, indexSubtask, setAllBoards }) => {
	const deleteSubtask = () => {
		const indexBoard = allBoards.boards.indexOf(selectedBoard);

		setAllBoards((draft) => {
			draft.boards[indexBoard].columns[indexColumn].cards[indexCard].subtasks.splice(indexSubtask, 1);
		});
	};

	return (
		<>
			<div className="subtask__delete_container" onClick={deleteSubtask}>
				<div className="icon__delete"></div>
			</div>
		</>
	);
};
