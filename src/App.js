import { useState } from 'react';
import { AddNewCard } from './components/cards/AddNewCard';
import { AddNewColumn } from './components/columns/AddNewColumn';
import { Column } from './components/columns/Column';
import { ShowSideBar } from './components/sideBar/ShowSideBar';
import { SideBar } from './components/sideBar/SideBar';
import db from './db/db.json';

export const App = () => {
	const [allBoards, setAllBoards] = useState(db);
	const [selectedBoard, setSelectedBoard] = useState(allBoards.boards[0]);
	const [isSideBarHidden, setSideBarHidden] = useState(false);
	const [draggedCard, setDraggedCard] = useState(null);
	const [draggedFromColumn, setDraggedFromColumn] = useState(null);
	const [draggedOverColumn, setDraggedOverColumn] = useState(null);
	const columnList = Array(selectedBoard.columns.length).fill();

	// console.log('------- Начало обработки -------');
	// console.log(`allBoards:`);
	// console.log(allBoards);
	// console.log(`selectedBoard:`);
	// console.log(selectedBoard);
	// console.log(`isSideBarHidden:`);
	// console.log(isSideBarHidden);
	// console.log(`draggedCard:`);
	// console.log(draggedCard);
	// console.log(`draggedFromColumn:`);
	// console.log(draggedFromColumn);
	// console.log(`draggedOverColumn:`);
	// console.log(draggedOverColumn);

	return (
		<>
			<SideBar
				isHidden={isSideBarHidden}
				setHidden={setSideBarHidden}
				selectedBoard={selectedBoard}
				allBoards={allBoards}
				setSelectedBoard={setSelectedBoard}
				setAllBoards={setAllBoards}
			/>
			<div className="main__workWindow">
				<header className="workWindow__header">
					<div className="header__title">{selectedBoard.name}</div>
					<AddNewCard allBoards={allBoards} selectedBoard={selectedBoard} setAllBoards={setAllBoards} />
				</header>
				<div className="workWindow__allColumns">
					{columnList.map((item, indexColumn) => (
						<Column
							key={indexColumn}
							allBoards={allBoards}
							indexColumn={indexColumn}
							selectedBoard={selectedBoard}
							setAllBoards={setAllBoards}
							draggedCard={draggedCard}
							setDraggedCard={setDraggedCard}
							draggedFromColumn={draggedFromColumn}
							setDraggedFromColumn={setDraggedFromColumn}
							draggedOverColumn={draggedOverColumn}
							setDraggedOverColumn={setDraggedOverColumn}
						/>
					))}
					<AddNewColumn allBoards={allBoards} selectedBoard={selectedBoard} setAllBoards={setAllBoards} />
				</div>
				<ShowSideBar isHidden={isSideBarHidden} setHidden={setSideBarHidden} />
			</div>
		</>
	);
};
