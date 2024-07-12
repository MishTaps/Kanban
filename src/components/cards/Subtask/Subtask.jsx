import { useState } from 'react';
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

			let db_new = { ...allBoards };
			db_new.boards[selectedBoard.id].columns[indexColumn].cards[indexCard].subtasks[indexSubtask].name =
				subtaskName;
			setAllBoards(db_new);
		}
	};
	const changeSubtaskStatus = (event) => {
		setSubtaskStatus(event.target.checked);

		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns[indexColumn].cards[indexCard].subtasks[indexSubtask].finished =
			event.target.checked;
		setAllBoards(db_new);
	};
	return (
		<>
			<div className={'subtask_' + (openedCard === card ? 'long' : 'short')}>
				<input
					className="subtask__checkbox"
					type="checkbox"
					checked={subtaskStatus}
					onChange={changeSubtaskStatus}
				></input>
				<input
					type="text"
					className={'subtask__text' + (!isSaved ? ' inputWasEdited' : '')}
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
