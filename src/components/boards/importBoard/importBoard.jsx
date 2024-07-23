/* eslint-disable react/prop-types */
import React from 'react';

export const ImportBoard = ({ allBoards, setAllBoards }) => {
	// const inputButton = '<input className="list__addNewBoard" type="file"></input>';

	const handleClick = () => {
		const inputButton = document.querySelector('.list__addNewBoard_input');
		inputButton.click();
	};

	const handleChange = (e) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsText(file);

		reader.onload = () => {
			const newBoard = JSON.parse(reader.result);

			let allBoardsIDs = [];
			allBoards.boards.forEach((board) => {
				allBoardsIDs.push(board.id);
			});
			if (allBoardsIDs.includes(newBoard.id)) {
				alert('Ошибка! Доска с данным ID уже существует.');
				return;
			}

			const boardPropertyList = ['id', 'name', 'columns'];
			const columnPropertyList = ['id', 'name', 'color', 'cards'];
			const cardPropertyList = ['id', 'name', 'subtasks'];
			const subtaskPropertyList = ['id', 'name', 'finished'];

			const arePropertiesAlright = (object, propertyList) => {
				let isStructureError = false;
				propertyList.forEach((property) => {
					if (!Object.hasOwn(object, property)) {
						alert(`Ошибка! Неверная структура файла доски.\nОтсутствует поле: ${property}`);
						isStructureError = true;
					}
				});
				if (isStructureError) {
					return false;
				} else {
					return true;
				}
			};

			let isStructureAlright = true;
			isStructureAlright = arePropertiesAlright(newBoard, boardPropertyList);
			if (!isStructureAlright) {
				return;
			}
			for (let columnIndex = 0; columnIndex < newBoard.columns.length; columnIndex++) {
				const column = newBoard.columns[columnIndex];
				isStructureAlright = arePropertiesAlright(column, columnPropertyList);
				if (!isStructureAlright) {
					break;
				}
				for (let cardIndex = 0; cardIndex < newBoard.columns[columnIndex].cards.length; cardIndex++) {
					const card = newBoard.columns[columnIndex].cards[cardIndex];
					isStructureAlright = arePropertiesAlright(card, cardPropertyList);
					if (!isStructureAlright) {
						break;
					}
					for (
						let subtaskIndex = 0;
						subtaskIndex < newBoard.columns[columnIndex].cards.length;
						subtaskIndex++
					) {
						const subtask = newBoard.columns[columnIndex].cards[cardIndex].subtasks[subtaskIndex];
						isStructureAlright = arePropertiesAlright(subtask, subtaskPropertyList);
						if (!isStructureAlright) {
							break;
						}
					}
					if (!isStructureAlright) {
						break;
					}
				}
				if (!isStructureAlright) {
					break;
				}
			}
			if (!isStructureAlright) {
				return;
			}

			setAllBoards((draft) => {
				draft.boards.push(newBoard);
			});
		};

		reader.onerror = () => {
			alert('Ошибка чтения файла...');
			console.log(reader.error);
		};
	};
	return (
		<>
			<input
				className="list__addNewBoard_input"
				type="file"
				accept=".json"
				hidden
				onChange={handleChange}
			></input>
			<div className="list__addNewBoard" onClick={handleClick}>
				+ Импортировать доску
			</div>
		</>
	);
};
