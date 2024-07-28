/* eslint-disable react/prop-types */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AddNewCard = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewCard = () => {
		try {
			const newCard = {
				name: 'Новая задача',
				id: uuidv4(),
				subtasks: [],
			};
			const indexBoard = allBoards.boards.indexOf(selectedBoard);

			setAllBoards((draft) => {
				draft.boards[indexBoard].columns[0].cards.push(newCard);
			});
		} catch {
			alert('Невозможно создать новую карточку. Для начала необходимо создать столбец.');
		}
	};

	return (
		<>
			<div className="header__addTaskButton">
				<button type="button" className="addTaskButton" onClick={addNewCard}>
					+ Новая задача
				</button>
			</div>
		</>
	);
};
