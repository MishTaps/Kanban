import { useState } from 'react';

export const TitleBoardName = ({ allBoards, selectedBoard, setAllBoards, titleText, setTitleText }) => {
	const [isSaved, setIsSaved] = useState(true);

	const changeTitleName = (event) => {
		setTitleText(event.target.value);
		if (event.target.value !== selectedBoard.name) {
			setIsSaved(false);
		} else {
			setIsSaved(true);
		}
	};
	const changeBoardName = (event) => {
		if (event.code === 'Enter') {
			event.target.blur();
			setIsSaved(true);

			let db_new = { ...allBoards };
			db_new.boards[selectedBoard.id].name = titleText;
			setAllBoards(db_new);
		}
	};

	return (
		<input
			type="text"
			className={'header__title' + (!isSaved ? ' inputWasEdited' : '')}
			value={titleText}
			onChange={changeTitleName}
			onKeyUp={changeBoardName}
		></input>
	);
};
