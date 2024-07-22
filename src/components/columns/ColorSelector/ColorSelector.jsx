/* eslint-disable react/prop-types */
import React from 'react';

export const ColorSelector = ({
	allBoards,
	setAllBoards,
	indexColumn,
	selectedBoard,
	coordinatesColorSelector,
	setOpenedColorSelector,
}) => {
	const colors = ['red', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple'];
	const setColor = (colorData) => {
		const indexBoard = allBoards.boards.indexOf(selectedBoard);

		setAllBoards((draft) => {
			draft.boards[indexBoard].columns[indexColumn].color = colorData;
		});
		setOpenedColorSelector([false, null]);
	};
	return (
		<>
			<div
				className="colorSelector"
				style={{ left: coordinatesColorSelector.x + 'px', top: coordinatesColorSelector.y + 'px' }}
			>
				{colors.map((item, index) => (
					<div
						key={index}
						className={`column__circle column__circle--${colors[index]}`}
						onClick={() => setColor(colors[index])}
					></div>
				))}
			</div>
		</>
	);
};
