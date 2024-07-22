/* eslint-disable react/prop-types */
import React from 'react';
import { require } from 'uuid';

export const AddNewCard = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewCard = () => {
		try {
			const { v4: uuidv4 } = require('uuid');
			const newCard = {
				name: 'Новая задача',
				id: uuidv4(),
				subtasks: [],
			};

			setAllBoards((draft) => {
				draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[0].cards.push(newCard);
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
