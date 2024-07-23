/* eslint-disable react/prop-types */
import { saveAs } from 'file-saver';
import React from 'react';

export const SaveBoard = ({ selectedBoard }) => {
	const saveBoard = () => {
		const fileJSON = JSON.stringify(selectedBoard, null, 2);
		saveAs(
			new Blob([fileJSON], {
				type: 'application/json;charset=' + document.characterSet,
			}),
			`${selectedBoard.name}.json`,
		);
	};
	return (
		<>
			<div className="header__saveBoardButton">
				<button type="button" className="saveBoardButton" onClick={saveBoard}>
					Сохранить доску
				</button>
			</div>
		</>
	);
};
