/* eslint-disable react/prop-types */
import cn from 'classnames';
import React, { useState } from 'react';

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
			const indexBoard = allBoards.boards.indexOf(selectedBoard);

			if (titleText) {
				setAllBoards((draft) => {
					draft.boards[indexBoard].name = titleText;
				});
			} else {
				setTitleText('[Доска без имени]');
				setAllBoards((draft) => {
					draft.boards[indexBoard].name = '[Доска без имени]';
				});
			}
		}
	};

	return (
		<input
			type="text"
			className={cn('header__title', { inputWasEdited: !isSaved })}
			value={titleText}
			onChange={changeTitleName}
			onKeyUp={changeBoardName}
		></input>
	);
};
