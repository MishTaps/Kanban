export const AddNewColumn = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewColumn = () => {
		// Так неправильно делать. Потом переделаю
		// Начало
		const min = Math.ceil(0);
		const max = Math.floor(1000000);
		const newID = Math.floor(Math.random() * (max - min) + min);
		// Конец

		const newColumn = {
			name: 'Новая',
			id: newID,
			color: 'light-blue',
			cards: [],
		};
		let db_new = { ...allBoards };
		db_new.boards[db_new.boards.indexOf(selectedBoard)].columns.push(newColumn);

		setAllBoards(db_new);
	};

	return (
		<>
			<section className="allColumns__addNewColumn_container" onClick={addNewColumn}>
				<div className="allColumns__addNewColumn">+ Новая колонка</div>
			</section>
		</>
	);
};
