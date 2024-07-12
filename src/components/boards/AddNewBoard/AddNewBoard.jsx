export const AddNewBoard = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewBoard = () => {
		// Так неправильно делать. Потом переделаю
		// Начало
		const min = Math.ceil(0);
		const max = Math.floor(1000000);
		const newID = Math.floor(Math.random() * (max - min) + min);
		// Конец

		const newBoard = {
			name: 'Новая доска',
			id: newID,
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
