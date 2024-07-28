/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';

export const Board = ({
	indexBoard,
	selectedBoard,
	allBoards,
	setSelectedBoardIndex,
	setTitleText,
	setOpenedColorSelector,
	setOpenedCard,
}) => {
	const board = allBoards.boards[indexBoard];

	const selectBoard = () => {
		let newBoard;
		allBoards.boards.forEach((board) => {
			if (board.id === allBoards.boards[indexBoard].id) {
				newBoard = board;
			}
		});
		selectedBoard = allBoards.boards[newBoard.id];
		setTitleText(board.name);
		setSelectedBoardIndex(indexBoard);
		setOpenedColorSelector({ isOpened: false, columnIndex: null });
		setOpenedCard(null);
	};

	return (
		<div
			className={cn('list__board', { list__board_selected: board.id === selectedBoard.id })}
			onClick={selectBoard}
		>
			{board.name}
		</div>
	);
};
