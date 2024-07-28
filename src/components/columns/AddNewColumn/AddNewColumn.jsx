/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AddNewColumn = ({ allBoards, selectedBoard, setAllBoards, draggedCard, draggedColumn }) => {
	const addNewColumn = () => {
		const newColumn = {
			name: 'Новая',
			id: uuidv4(),
			color: 'light-blue',
			cards: [],
		};
		const indexBoard = allBoards.boards.indexOf(selectedBoard);

		setAllBoards((draft) => {
			draft.boards[indexBoard].columns.push(newColumn);
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
