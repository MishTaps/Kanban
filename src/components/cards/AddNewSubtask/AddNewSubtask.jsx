export const AddNewSubtask = ({ allBoards, setAllBoards, selectedBoard, indexColumn, indexCard }) => {
	const addNewSubtask = () => {
		const newSubtask = {
			name: 'Новая подзадача',
			id: selectedBoard.columns[0].cards.length,
			finished: false,
		};
		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns[indexColumn].cards[indexCard].subtasks.push(newSubtask);

		setAllBoards(db_new);
	};
	return (
		<div className="subtask__addNew" onClick={addNewSubtask}>
			+ Добавить подзадачу
		</div>
	);
};
