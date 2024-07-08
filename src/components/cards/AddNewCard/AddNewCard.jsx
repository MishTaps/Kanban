export const AddNewCard = ({ allBoards, selectedBoard, setAllBoards }) => {
	const addNewCard = () => {
		try {
			const newCard = {
				name: 'Новая задача',
				id: selectedBoard.columns[0].cards.length,
				subtasks: [],
			};
			let db_new = { ...allBoards };
			db_new.boards[selectedBoard.id].columns[0].cards.push(newCard);

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
