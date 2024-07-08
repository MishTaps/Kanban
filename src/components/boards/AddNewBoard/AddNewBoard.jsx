export const AddNewBoard = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewBoard = () => {
		const newBoard = {
			name: 'Новая доска',
			id: allBoards.boards.length,
			columns: [],
		};
		let db_new = { ...allBoards };
		db_new.boards.push(newBoard);

		setAllBoards(db_new);
	};

	return (
		<div className="list__addNewBoard" onClick={addNewBoard}>
			+ Новая доска
		</div>
	);
};
