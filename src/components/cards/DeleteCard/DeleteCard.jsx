export const DeleteCard = ({ allBoards, selectedBoard, indexColumn, indexCard, setAllBoards }) => {
	const handleClick = () => {
		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns[indexColumn].cards.splice(indexCard, 1);

		setAllBoards(db_new);
	};

	return (
		<div className="card__delete_container" onClick={handleClick}>
			<div className="icon__delete"></div>
		</div>
	);
};
