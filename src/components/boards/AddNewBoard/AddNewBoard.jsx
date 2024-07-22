/* eslint-disable react/prop-types */
import React from 'react';
import { require } from 'uuid';

export const AddNewBoard = ({ setAllBoards }) => {
	const addNewBoard = () => {
		const { v4: uuidv4 } = require('uuid');
		const newBoard = {
			name: 'Новая доска',
			id: uuidv4(),
			columns: [],
		};

		setAllBoards((draft) => {
			draft.boards.push(newBoard);
		});
	};

	return (
		<div className="list__addNewBoard" onClick={addNewBoard}>
			+ Новая доска
		</div>
	);
};
