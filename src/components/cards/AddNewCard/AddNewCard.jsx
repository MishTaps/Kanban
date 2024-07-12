export const AddNewCard = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewCard = () => {
		try {
			// Так неправильно делать. Потом переделаю
			// Начало
			const min = Math.ceil(0);
			const max = Math.floor(1000000);
			const newID = Math.floor(Math.random() * (max - min) + min);
			// Конец

			const newCard = {
				name: 'Новая задача',
				id: newID,
				subtasks: [],
			};
			let db_new = { ...allBoards };
			db_new.boards[db_new.boards.indexOf(selectedBoard)].columns[0].cards.push(newCard);

			setAllBoards(db_new);
		} catch {
			console.error('Невозможно создать новую карточку. Для начала необходимо создать столбец.');
		}
	};

	return (
		<>
			<div className="header__addTaskButton">
				<button type="button" className="addTaskButton" onClick={addNewCard}>
					+ Новая задача
				</button>
			</div>
		</>
	);
};
