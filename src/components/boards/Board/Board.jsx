export const Board = ({
	indexBoard,
	selectedBoard,
	allBoards,
	setSelectedBoard,
	setTitleText,
	setOpenedColorSelector,
	setOpenedCard,
}) => {
	const board = allBoards.boards[indexBoard];

	const selectBoard = () => {
		let newBoard;
		allBoards.boards.forEach((board) => {
			if (board.id === indexBoard) {
				newBoard = board;
			}
		});
		selectedBoard = allBoards.boards[newBoard.id];
		setTitleText(board.name);
		setSelectedBoard(newBoard);
		setOpenedColorSelector([false, null]);
		setOpenedCard(null);
	};
	return (
		<div
			className={'list__board' + (board.id === selectedBoard.id ? ' list__board_selected' : '')}
			onClick={selectBoard}
		>
			{board.name}
		</div>
	);
};
