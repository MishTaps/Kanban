import { useState } from 'react';
import { AddNewSubtask } from '../AddNewSubtask';
import { DeleteCard } from '../DeleteCard';
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
	if (openedCard === card) {
		subtasksData = listSubtasks.map((item, index) => (
			<Subtask
				key={index}
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

	const startDraggingCard = (event) => {
		setDraggedCard(card);
		setDraggedFromColumn(selectedBoard.columns[indexColumn]);
	};
	const openCard = () => {
		setOpenedCard(card);
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

			let db_new = { ...allBoards };
			db_new.boards[selectedBoard.id].columns[indexColumn].cards[indexCard].name = event.target.value;
			setAllBoards(db_new);
		}
	};

	return (
		<>
			<article className="card" draggable="true" onDragStart={startDraggingCard} onClick={openCard}>
				<div className="card__title_container">
					<input
						type="text"
						className={'card__title' + (!isSaved ? ' inputWasEdited' : '')}
						value={cardName}
						onChange={changeCardNameValue}
						onKeyUp={changeCardName}
					></input>
				</div>
				<div className="card__subtasks">
					{subtasksData}
					<div className="card__footer">
						{openedCard === card && (
							<AddNewSubtask
								allBoards={allBoards}
								setAllBoards={setAllBoards}
								selectedBoard={selectedBoard}
								indexColumn={indexColumn}
								indexCard={indexCard}
							/>
						)}
						{openedCard === card && (
							<DeleteCard
								allBoards={allBoards}
								selectedBoard={selectedBoard}
								indexColumn={indexColumn}
								indexCard={indexCard}
								setAllBoards={setAllBoards}
							/>
						)}
					</div>
				</div>
			</article>
		</>
	);
};
