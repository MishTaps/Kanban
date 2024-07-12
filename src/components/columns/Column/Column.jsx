import { useState } from 'react';
import { Card } from '../../cards/Card';
import { ColorSelector } from '../ColorSelector';

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
	openedCard,
	setOpenedCard,
	coordinatesColorSelector,
	setCoordinatesColorSelector,
	openedColorSelector,
	setOpenedColorSelector,
}) => {
	const column = selectedBoard.columns[indexColumn];
	const listCards = Array(column.cards.length).fill();
	const [columnName, setColumnName] = useState(column.name);
	const [isSaved, setIsSaved] = useState(true);

	const dragOverColumn = (event) => {
		event.preventDefault();
		setDraggedOverColumn(column);
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
		db_new.boards[selectedBoard.id].columns[selectedBoard.columns.indexOf(draggedFromColumn)].cards.forEach(
			(card) => {
				if (card.id === draggedCard.id) {
					cardIndex = cardIndexCount;
				}
				cardIndexCount++;
			},
		);
		db_new.boards[selectedBoard.id].columns[selectedBoard.columns.indexOf(draggedFromColumn)].cards.splice(
			cardIndex,
			1,
		);

		setAllBoards(db_new);
		setDraggedOverColumn(null);
	};
	const showColorSelector = (event) => {
		const correctX = 0;
		const correctY = 20;
		setOpenedColorSelector([true, indexColumn]);
		setCoordinatesColorSelector([event.pageX + correctX, event.pageY + correctY]);
	};
	const changeColumnNameValue = (event) => {
		setColumnName(event.target.value);
		if (event.target.value !== column.name) {
			setIsSaved(false);
		} else {
			setIsSaved(true);
		}
	};
	const changeColumnName = (event) => {
		if (event.code === 'Enter') {
			event.target.blur();
			setIsSaved(true);

			let db_new = { ...allBoards };
			db_new.boards[selectedBoard.id].columns[indexColumn].name = columnName;
			setAllBoards(db_new);
		}
	};

	return (
		<section className="allColumns__column">
			<div className="column__title">
				<div className={`column__circle column__circle--${column.color}`} onClick={showColorSelector} />
				<div className="column__titleText_container">
					<div className="column__titleText_countCards">{`(${column.cards.length}) :`}&nbsp;</div>
					<div className="column__titleText_input_container">
						<input
							className={'column__titleText_input' + (!isSaved ? ' inputWasEdited' : '')}
							value={columnName}
							onChange={changeColumnNameValue}
							onKeyUp={changeColumnName}
						></input>
					</div>
				</div>
				{openedColorSelector[0] && openedColorSelector[1] === indexColumn && (
					<ColorSelector
						allBoards={allBoards}
						setAllBoards={setAllBoards}
						indexColumn={indexColumn}
						selectedBoard={selectedBoard}
						coordinatesColorSelector={coordinatesColorSelector}
						setOpenedColorSelector={setOpenedColorSelector}
					/>
				)}
			</div>
			<div
				className={
					'column__cards' +
					(draggedOverColumn && column.id === draggedOverColumn.id ? ' column__cards_dragOver' : '')
				}
				onDrop={dropCard}
				onDragOver={dragOverColumn}
				onDragLeave={dragLeaveColumn}
			>
				{listCards.map((item, index) => (
					<Card
						key={selectedBoard.columns[indexColumn].cards[index].id}
						indexColumn={indexColumn}
						allBoards={allBoards}
						setAllBoards={setAllBoards}
						selectedBoard={selectedBoard}
						indexCard={index}
						draggedCard={draggedCard}
						setDraggedCard={setDraggedCard}
						draggedFromColumn={draggedFromColumn}
						setDraggedFromColumn={setDraggedFromColumn}
						openedCard={openedCard}
						setOpenedCard={setOpenedCard}
					/>
				))}
			</div>
		</section>
	);
};
