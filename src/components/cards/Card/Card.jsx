/* eslint-disable react/prop-types */
import cn from 'classnames';
import React, { useState } from 'react';
import { AddNewSubtask } from '../AddNewSubtask';
import { Subtask } from '../Subtask';

export const Card = ({
	allBoards,
	setAllBoards,
	selectedBoard,
	indexColumn,
	indexCard,
	setDraggedCard,
	setDraggedFromColumn,
	openedCard,
	setOpenedCard,
}) => {
	const card = selectedBoard.columns[indexColumn].cards[indexCard];
	const [isSaved, setIsSaved] = useState(true);
	const [cardName, setCardName] = useState(card.name);

	let countDoneSubtasks = 0;
	card.subtasks.forEach((subtask) => {
		if (subtask.finished) {
			countDoneSubtasks++;
		}
	});

	let subtasksData;
	const listSubtasks = Array(card.subtasks.length).fill();
	if (openedCard === card.id) {
		subtasksData = listSubtasks.map((item, index) => (
			<Subtask
				key={selectedBoard.columns[indexColumn].cards[indexCard].subtasks[index].id}
				card={card}
				openedCard={openedCard}
				indexSubtask={index}
				allBoards={allBoards}
				selectedBoard={selectedBoard}
				indexColumn={indexColumn}
				indexCard={indexCard}
				setAllBoards={setAllBoards}
			/>
		));
	} else if (card.subtasks.length === 0) {
		subtasksData = null;
	} else {
		subtasksData = `${countDoneSubtasks} из ${card.subtasks.length} подзадач`;
	}

	const startDraggingCard = () => {
		setDraggedCard(card);
		setDraggedFromColumn(selectedBoard.columns[indexColumn]);
	};
	const stopDraggingCard = () => {
		setDraggedCard(null);
		setDraggedFromColumn(null);
	};
	const openCard = () => {
		setOpenedCard(card.id);
	};
	const changeCardNameValue = (event) => {
		setCardName(event.target.value);
		if (event.target.value !== card.name) {
			setIsSaved(false);
		} else {
			setIsSaved(true);
		}
	};
	const changeCardName = (event) => {
		if (event.code === 'Enter') {
			event.target.blur();
			setIsSaved(true);

			if (cardName) {
				setAllBoards((draft) => {
					draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards[indexCard].name =
						cardName;
				});
			} else {
				setCardName('[Задача без имени]');
				setAllBoards((draft) => {
					draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards[indexCard].name =
						'[Задача без имени]';
				});
			}
		}
	};

	return (
		<>
			<article
				className="card"
				draggable="true"
				onDragStart={startDraggingCard}
				onClick={openCard}
				onDragEnd={stopDraggingCard}
			>
				<div className="card__title_container">
					<input
						type="text"
						className={cn('card__title', { inputWasEdited: !isSaved })}
						value={cardName}
						onChange={changeCardNameValue}
						onKeyUp={changeCardName}
					></input>
				</div>
				<div className="card__subtasks">
					{subtasksData}
					<div className="card__footer">
						{openedCard === card.id && (
							<AddNewSubtask
								allBoards={allBoards}
								setAllBoards={setAllBoards}
								selectedBoard={selectedBoard}
								indexColumn={indexColumn}
								indexCard={indexCard}
							/>
						)}
					</div>
				</div>
			</article>
		</>
	);
};
