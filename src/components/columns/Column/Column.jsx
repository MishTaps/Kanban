/* eslint-disable react/prop-types */
import cn from 'classnames';
import React, { useState } from 'react';
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
	setDraggedColumn,
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
		if (draggedCard) {
			event.preventDefault();
			setDraggedOverColumn(column);
		}
	};
	const dragLeaveColumn = (event) => {
		if (draggedCard) {
			event.preventDefault();
			setDraggedOverColumn(null);
		}
	};
	const dropCard = (event) => {
		event.preventDefault();

		let cardIndex = null;
		let cardIndexCount = 0;
		allBoards.boards[allBoards.boards.indexOf(selectedBoard)].columns[
			selectedBoard.columns.indexOf(draggedFromColumn)
		].cards.forEach((card) => {
			if (card.id === draggedCard.id) {
				cardIndex = cardIndexCount;
			}
			cardIndexCount++;
		});

		setAllBoards((draft) => {
			draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards.push(draggedCard);

			draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[
				selectedBoard.columns.indexOf(draggedFromColumn)
			].cards.splice(cardIndex, 1);
		});
		setDraggedOverColumn(null);
		setDraggedCard(null);
		setDraggedFromColumn(null);
	};
	const showColorSelector = (event) => {
		const correctX = 0;
		const correctY = 20;
		let coordinates_new = { ...coordinatesColorSelector };
		coordinates_new.x = event.pageX + correctX;
		coordinates_new.y = event.pageY + correctY;
		setOpenedColorSelector({ isOpened: true, columnIndex: indexColumn });
		setCoordinatesColorSelector(coordinates_new);
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

			if (columnName) {
				setAllBoards((draft) => {
					draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].name = columnName;
				});
			} else {
				setColumnName('[Колонка без имени]');
				setAllBoards((draft) => {
					draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].name =
						'[Колонка без имени]';
				});
			}
		}
	};
	const handleDragStart = (event) => {
		if (event.target.className === 'allColumns__column') {
			setDraggedColumn(column);
		}
	};
	const handleDragEnd = (event) => {
		setDraggedColumn(null);
		if (event.target.className === 'allColumns__column') {
			setDraggedColumn(null);
		}
	};

	return (
		<>
			<section
				className="allColumns__column"
				draggable="true"
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="column__title">
					<div className={`column__circle column__circle--${column.color}`} onClick={showColorSelector} />
					<div className="column__titleText_container">
						<div className="column__titleText_countCards">{`(${column.cards.length}) :`}&nbsp;</div>
						<div className="column__titleText_input_container">
							<input
								className={cn('column__titleText_input', { inputWasEdited: !isSaved })}
								value={columnName}
								onChange={changeColumnNameValue}
								onKeyUp={changeColumnName}
							></input>
						</div>
					</div>
					{openedColorSelector.isOpened && openedColorSelector.columnIndex === indexColumn && (
						<ColorSelector
							key={selectedBoard.columns[indexColumn].id}
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
					className={cn('column__cards', {
						column__cards_dragOver: draggedOverColumn && column.id === draggedOverColumn.id,
					})}
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
		</>
	);
};
