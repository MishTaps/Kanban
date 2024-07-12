import { useState } from 'react';
import { TitleBoardName } from './components/boards/TitleBoardName';
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
	const [openedCard, setOpenedCard] = useState(null);
	const [openedColorSelector, setOpenedColorSelector] = useState([false, null]); // [<Открыт ли селектор>, <Индекс колонки>]
	const [coordinatesColorSelector, setCoordinatesColorSelector] = useState([null, null]);
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
					setSelectedBoard={setSelectedBoard}
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
								openedCard={openedCard}
								setOpenedCard={setOpenedCard}
								coordinatesColorSelector={coordinatesColorSelector}
								setCoordinatesColorSelector={setCoordinatesColorSelector}
								openedColorSelector={openedColorSelector}
								setOpenedColorSelector={setOpenedColorSelector}
							/>
						))}
						<AddNewColumn allBoards={allBoards} selectedBoard={selectedBoard} setAllBoards={setAllBoards} />
					</div>
					<ShowSideBar isHidden={isSideBarHidden} setHidden={setSideBarHidden} />
				</div>
			</div>
		</>
	);
};
