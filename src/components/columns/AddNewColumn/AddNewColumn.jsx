/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';
import { require } from 'uuid';

export const AddNewColumn = ({ allBoards, selectedBoard, setAllBoards, draggedCard, draggedColumn }) => {
	const addNewColumn = () => {
		const { v4: uuidv4 } = require('uuid');
		const newColumn = {
			name: 'Новая',
			id: uuidv4(),
			color: 'light-blue',
			cards: [],
		};

		setAllBoards((draft) => {
			draft.boards[allBoards.boards.indexOf(selectedBoard)].columns.push(newColumn);
		});
	};

	return (
		<>
			<section
				className={cn('allColumns__addNewColumn_container', { 'display-none': draggedCard || draggedColumn })}
				onClick={addNewColumn}
			>
				<div className="allColumns__addNewColumn">+ Новая колонка</div>
			</section>
		</>
	);
};
