export const Card = ({
	indexColumn,
	indexCard,
	boardData,
	draggedCard,
	setDraggedCard,
	draggedFromColumn,
	setDraggedFromColumn,
}) => {
	const cardName = boardData.columns[indexColumn].cards[indexCard].name;
	const cardSubtasks = boardData.columns[indexColumn].cards[indexCard].subtasks;

	let countDoneSubtasks = 0;
	cardSubtasks.forEach((subtask) => {
		if (subtask.finished) {
			countDoneSubtasks++;
		}
	});

	const startDraggingCard = () => {
		setDraggedCard(boardData.columns[indexColumn].cards[indexCard]);
		setDraggedFromColumn(boardData.columns[indexColumn]);
	};

	return (
		<article className="card" draggable="true" onDragStart={startDraggingCard}>
			<div className="card__title">{cardName}</div>
			<div className="card__subtasks">
				{countDoneSubtasks} из {cardSubtasks.length} подзадач
			</div>
		</article>
	);
};
