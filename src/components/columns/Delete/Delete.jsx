/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';

export const Delete = ({
	allBoards,
	setAllBoards,
	selectedBoard,
	draggedFromColumn,
	setDraggedFromColumn,
	setDraggedOverColumn,
	draggedCard,
	setDraggedCard,
	draggedColumn,
	setDraggedColumn,
}) => {
	const handleDragOver = (event) => {
		event.preventDefault();
		setDraggedOverColumn('delete');
	};
	const handleDragLeave = (event) => {
		event.preventDefault();
		setDraggedOverColumn(null);
	};
	const handleDrop = (event) => {
		if (draggedCard) {
			event.preventDefault();

			const indexBoard = allBoards.boards.indexOf(selectedBoard);
			const indexColumn = allBoards.boards[indexBoard].columns.indexOf(draggedFromColumn);
			const indexCard = allBoards.boards[indexBoard].columns[indexColumn].cards.indexOf(draggedCard);

			setAllBoards((draft) => {
				draft.boards[indexBoard].columns[indexColumn].cards.splice(indexCard, 1);
			});
			setDraggedOverColumn(null);
			setDraggedCard(null);
			setDraggedFromColumn(null);
		}
		if (draggedColumn) {
			const indexBoard = allBoards.boards.indexOf(selectedBoard);
			const indexColumn = allBoards.boards[indexBoard].columns.indexOf(draggedColumn);

			setAllBoards((draft) => {
				draft.boards[indexBoard].columns.splice(indexColumn, 1);
			});
			setDraggedColumn(null);
		}
	};
	return (
		<>
			<section
				className={cn('allColumns__delete_container', { 'display-none': !(draggedCard || draggedColumn) })}
			>
				<div
					className="allColumns__delete"
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<div className="icon__delete"></div>
					<div className="allColumns__delete_text">Удалить</div>
				</div>
			</section>
		</>
	);
};
