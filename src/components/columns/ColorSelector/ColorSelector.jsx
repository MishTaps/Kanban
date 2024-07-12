export const ColorSelector = ({
	allBoards,
	setAllBoards,
	indexColumn,
	selectedBoard,
	coordinatesColorSelector,
	setOpenedColorSelector,
}) => {
	const setColor = (colorData) => {
		let db_new = { ...allBoards };
		db_new.boards[selectedBoard.id].columns[indexColumn].color = colorData;
		setAllBoards(db_new);
		setOpenedColorSelector([false, null]);
	};
	return (
		<>
			<div
				className="colorSelector"
				style={{ left: coordinatesColorSelector[0] + 'px', top: coordinatesColorSelector[1] + 'px' }}
			>
				<div className="column__circle column__circle--red" onClick={() => setColor('red')}></div>
				<div className="column__circle column__circle--orange" onClick={() => setColor('orange')}></div>
				<div className="column__circle column__circle--yellow" onClick={() => setColor('yellow')}></div>
				<div className="column__circle column__circle--green" onClick={() => setColor('green')}></div>
				<div className="column__circle column__circle--light-blue" onClick={() => setColor('light-blue')}></div>
				<div className="column__circle column__circle--blue" onClick={() => setColor('blue')}></div>
				<div className="column__circle column__circle--purple" onClick={() => setColor('purple')}></div>
			</div>
		</>
	);
};
