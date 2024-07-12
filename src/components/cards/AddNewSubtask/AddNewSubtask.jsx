export const AddNewSubtask = ({ allBoards, setAllBoards, selectedBoard, indexColumn, indexCard }) => {
	const addNewSubtask = () => {
		// Так неправильно делать. Потом переделаю
		// Начало
		const min = Math.ceil(0);
		const max = Math.floor(1000000);
		const newID = Math.floor(Math.random() * (max - min) + min);
		// Конец

		const newSubtask = {
			name: 'Новая подзадача',
			id: newID,
			finished: false,
		};
		let db_new = { ...allBoards };
		db_new.boards[db_new.boards.indexOf(selectedBoard)].columns[indexColumn].cards[indexCard].subtasks.push(
			newSubtask,
		);

		setAllBoards(db_new);
	};
	return (
		<div className="subtask__addNew" onClick={addNewSubtask}>
			+ Добавить подзадачу
		</div>
	);
};
