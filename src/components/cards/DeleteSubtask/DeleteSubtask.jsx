export const DeleteSubtask = ({ allBoards, selectedBoard, indexColumn, indexCard, indexSubtask, setAllBoards }) => {
	const deleteSubtask = () => {
		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns[indexColumn].cards[indexCard].subtasks.splice(indexSubtask, 1);

		setAllBoards(db_new);
	};

	return (
		<>
			<div className="subtask__delete_container" onClick={deleteSubtask}>
				<div className="icon__delete"></div>
			</div>
		</>
	);
};
