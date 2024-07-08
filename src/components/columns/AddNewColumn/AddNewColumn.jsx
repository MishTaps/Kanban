export const AddNewColumn = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewColumn = () => {
		const newColumn = {
			name: 'Новая',
			id: selectedBoard.columns.length,
			color: 'blue',
			cards: [],
		};
		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns.push(newColumn);

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
