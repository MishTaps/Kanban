/* eslint-disable react/prop-types */
import cn from 'classnames';
import React, { useState } from 'react';
import { DeleteSubtask } from '../DeleteSubtask';

export const Subtask = ({
	allBoards,
	card,
	openedCard,
	selectedBoard,
	indexColumn,
	indexCard,
	indexSubtask,
	setAllBoards,
}) => {
	const subtask = card.subtasks[indexSubtask];
	const [subtaskName, setSubtaskName] = useState(subtask.name);
	const [subtaskStatus, setSubtaskStatus] = useState(subtask.finished);
	const [isSaved, setIsSaved] = useState(true);

	const changeSubtaskNameValue = (event) => {
		setSubtaskName(event.target.value);
		if (event.target.value !== subtask.name) {
			setIsSaved(false);
		} else {
			setIsSaved(true);
		}
	};
	const changeSubtaskName = (event) => {
		if (event.code === 'Enter') {
			event.target.blur();
			setIsSaved(true);

			if (subtaskName) {
				setAllBoards((draft) => {
					draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards[
						indexCard
					].subtasks[indexSubtask].name = subtaskName;
				});
			} else {
				setSubtaskName('[Подзадача без имени]');

				setAllBoards((draft) => {
					draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards[
						indexCard
					].subtasks[indexSubtask].name = '[Подзадача без имени]';
				});
			}
		}
	};
	const changeSubtaskStatus = (event) => {
		setSubtaskStatus(event.target.checked);

		setAllBoards((draft) => {
			draft.boards[allBoards.boards.indexOf(selectedBoard)].columns[indexColumn].cards[indexCard].subtasks[
				indexSubtask
			].finished = event.target.checked;
		});
	};
	return (
		<>
			<div className={'subtask_' + (openedCard === card.id ? 'long' : 'short')}>
				<input
					className="subtask__checkbox"
					type="checkbox"
					checked={subtaskStatus}
					onChange={changeSubtaskStatus}
				></input>
				<input
					type="text"
					className={cn('subtask__text', { inputWasEdited: !isSaved })}
					value={subtaskName}
					onChange={changeSubtaskNameValue}
					onKeyUp={changeSubtaskName}
				></input>
				<DeleteSubtask
					allBoards={allBoards}
					selectedBoard={selectedBoard}
					indexColumn={indexColumn}
					indexCard={indexCard}
					indexSubtask={indexSubtask}
					setAllBoards={setAllBoards}
				/>
			</div>
		</>
	);
};
