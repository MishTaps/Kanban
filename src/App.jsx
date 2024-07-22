import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { DeleteBoard } from './components/boards/DeleteBoard';
import { TitleBoardName } from './components/boards/TitleBoardName';
import { AddNewCard } from './components/cards/AddNewCard';
import { AddNewColumn } from './components/columns/AddNewColumn';
import { Column } from './components/columns/Column';
import { Delete } from './components/columns/Delete';
import { ShowSideBar } from './components/sideBar/ShowSideBar';
import { SideBar } from './components/sideBar/SideBar';
import db from './db/db.json';

export const App = () => {
	// Исправить:
	// 1. Глубокая передача данных с помощью контекста
	// 2. Исправить нужные div на button

	const [allBoards, setAllBoards] = useImmer(db);
	const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
	const [isSideBarHidden, setSideBarHidden] = useState(false);
	const [draggedCard, setDraggedCard] = useState(null);
	const [draggedFromColumn, setDraggedFromColumn] = useState(null);
	const [draggedOverColumn, setDraggedOverColumn] = useState(null);
	const [draggedColumn, setDraggedColumn] = useState(null);
	const [openedCard, setOpenedCard] = useState(null);
	const [openedColorSelector, setOpenedColorSelector] = useState({ isOpened: false, columnIndex: null });
	const [coordinatesColorSelector, setCoordinatesColorSelector] = useState({ x: null, y: null });

	const selectedBoard = allBoards.boards[selectedBoardIndex];
	const [titleText, setTitleText] = useState(selectedBoard.name);
	const columnList = Array(selectedBoard.columns.length).fill();

	const handleClick = (event) => {
		if (!event.target.className.includes('column__circle')) {
			setOpenedColorSelector([false, null]);
		}
	};

	return (
		<>
			<div className="main">
				<SideBar
					isHidden={isSideBarHidden}
					setHidden={setSideBarHidden}
					selectedBoard={selectedBoard}
					allBoards={allBoards}
					setSelectedBoardIndex={setSelectedBoardIndex}
					setAllBoards={setAllBoards}
					setTitleText={setTitleText}
					setOpenedColorSelector={setOpenedColorSelector}
					setOpenedCard={setOpenedCard}
				/>
				<div className="main__workWindow" onClick={handleClick}>
					<header className="workWindow__header">
						<TitleBoardName
							allBoards={allBoards}
							selectedBoard={selectedBoard}
							setAllBoards={setAllBoards}
							titleText={titleText}
							setTitleText={setTitleText}
						/>
						<DeleteBoard
							allBoards={allBoards}
							setAllBoards={setAllBoards}
							selectedBoard={selectedBoard}
							setSelectedBoardIndex={setSelectedBoardIndex}
							setTitleText={setTitleText}
						/>
						<AddNewCard allBoards={allBoards} selectedBoard={selectedBoard} setAllBoards={setAllBoards} />
					</header>
					<div className="workWindow__allColumns">
						{columnList.map((item, indexColumn) => (
							<Column
								key={selectedBoard.columns[indexColumn].id}
								allBoards={allBoards}
								indexColumn={indexColumn}
								selectedBoard={selectedBoard}
								setAllBoards={setAllBoards}
								draggedCard={draggedCard}
								setDraggedCard={setDraggedCard}
								draggedFromColumn={draggedFromColumn}
								setDraggedFromColumn={setDraggedFromColumn}
								draggedOverColumn={draggedOverColumn}
								draggedColumn={draggedColumn}
								setDraggedColumn={setDraggedColumn}
								setDraggedOverColumn={setDraggedOverColumn}
								openedCard={openedCard}
								setOpenedCard={setOpenedCard}
								coordinatesColorSelector={coordinatesColorSelector}
								setCoordinatesColorSelector={setCoordinatesColorSelector}
								openedColorSelector={openedColorSelector}
								setOpenedColorSelector={setOpenedColorSelector}
							/>
						))}
						<AddNewColumn
							allBoards={allBoards}
							selectedBoard={selectedBoard}
							setAllBoards={setAllBoards}
							draggedCard={draggedCard}
							draggedColumn={draggedColumn}
						/>
						<Delete
							allBoards={allBoards}
							setAllBoards={setAllBoards}
							selectedBoard={selectedBoard}
							draggedFromColumn={draggedFromColumn}
							setDraggedFromColumn={setDraggedFromColumn}
							setDraggedOverColumn={setDraggedOverColumn}
							draggedCard={draggedCard}
							setDraggedCard={setDraggedCard}
							draggedColumn={draggedColumn}
							setDraggedColumn={setDraggedColumn}
						/>
					</div>
					<ShowSideBar isHidden={isSideBarHidden} setHidden={setSideBarHidden} />
				</div>
			</div>
		</>
	);
};
