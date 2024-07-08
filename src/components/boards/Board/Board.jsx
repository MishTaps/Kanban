export const Board = ({ indexBoard, selectedBoard, allBoards, setSelectedBoard }) => {
	const boardName = allBoards.boards[indexBoard].name;
	const boardID = allBoards.boards[indexBoard].id;

	const selectBoard = () => {
		let newBoard;
		allBoards.boards.forEach((board) => {
			if (board.id === indexBoard) {
				newBoard = board;
			}
		});
		selectedBoard = allBoards.boards[newBoard.id];
		setSelectedBoard(newBoard);
	};

	return (
		<div
			className={`list__board${boardID === selectedBoard.id ? ' list__board_selected' : ''}`}
			onClick={selectBoard}
		>
			{boardName}
		</div>
	);
};
