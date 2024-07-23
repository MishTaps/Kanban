/* eslint-disable react/prop-types */
import React from 'react';
import { require } from 'uuid';

export const DeleteBoard = ({ allBoards, setAllBoards, selectedBoard, setSelectedBoardIndex, setTitleText }) => {
	const handleClick = () => {
		const indexBoard = allBoards.boards.indexOf(selectedBoard);

		setAllBoards((draft) => {
			draft.boards.splice(indexBoard, 1);
			const { v4: uuidv4 } = require('uuid');

			if (!draft.boards[0]) {
				const newBoard = {
					name: '[Доска без имени]',
					id: uuidv4(),
					columns: [],
				};
				draft.boards.push(newBoard);
			}
			setTitleText(draft.boards[0].name);
		});
		setSelectedBoardIndex(0);
	};
	return (
		<>
			<button type="button" className="header__deleteBoard" onClick={handleClick}>
				<div className="icon__delete"></div>
				<div className="deleteBoard__text">Удалить доску</div>
			</button>
		</>
	);
};
