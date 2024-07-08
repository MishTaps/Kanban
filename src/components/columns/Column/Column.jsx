import { Card } from '../../cards/Card';

export const Column = ({
	allBoards,
	indexColumn,
	selectedBoard,
	setAllBoards,
	draggedCard,
	setDraggedCard,
	draggedFromColumn,
	setDraggedFromColumn,
	draggedOverColumn,
	setDraggedOverColumn,
}) => {
	const columnColor = selectedBoard.columns[indexColumn].color;
	const columnName = selectedBoard.columns[indexColumn].name;
	const columnID = selectedBoard.columns[indexColumn].id;
	const columnCards = selectedBoard.columns[indexColumn].cards;
	const listCards = Array(selectedBoard.columns[indexColumn].cards.length).fill();

	const dragOverColumn = (event) => {
		event.preventDefault();
		setDraggedOverColumn(selectedBoard.columns[indexColumn]);
	};
	const dragLeaveColumn = (event) => {
		event.preventDefault();
		setDraggedOverColumn(null);
	};
	const dropCard = (event) => {
		event.preventDefault();

		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns[indexColumn].cards.push(draggedCard);

		let cardIndex = null;
		let cardIndexCount = 0;

		db_new.boards[selectedBoard.id].columns[draggedFromColumn.id].cards.forEach((card) => {
			if (card.id === draggedCard.id) {
				cardIndex = cardIndexCount;
			}
			cardIndexCount++;
		});
		db_new.boards[selectedBoard.id].columns[draggedFromColumn.id].cards.splice(cardIndex, 1);

		setAllBoards(db_new);
		setDraggedOverColumn(null);
	};

	return (
		<section className="allColumns__column">
			<div className="column__title">
				<div className={`column__circle column__circle--${columnColor}`} />
				<div className="column__titleText">
					{columnName}
					<span className="column__titleText_countCards">{` (${columnCards.length})`}</span>
				</div>
			</div>
			<div
				className={
					'column__cards' +
					(draggedOverColumn && columnID === draggedOverColumn.id ? ' column__cards_dragOver' : '')
				}
				onDrop={dropCard}
				onDragOver={dragOverColumn}
				onDragLeave={dragLeaveColumn}
			>
				{listCards.map((item, index) => (
					<Card
						key={index}
						indexColumn={indexColumn}
						indexCard={index}
						boardData={selectedBoard}
						draggedCard={draggedCard}
						setDraggedCard={setDraggedCard}
						draggedFromColumn={draggedFromColumn}
						setDraggedFromColumn={setDraggedFromColumn}
					/>
				))}
			</div>
		</section>
	);
};
