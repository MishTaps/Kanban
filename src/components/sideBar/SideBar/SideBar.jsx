import { AddNewBoard } from '../../boards/AddNewBoard';
import { Board } from '../../boards/Board';
import { HideSideBar } from '../HideSideBar';

export const SideBar = ({ isHidden, setHidden, selectedBoard, allBoards, setSelectedBoard, setAllBoards }) => {
	const listBoards = Array(allBoards.boards.length).fill();

	const handleClick = () => {
		setHidden(true);
	};
	return (
		<>
			<aside className={'main__sideBar' + (isHidden ? ' display-none' : '')}>
				<div className="sideBar display-flex">
					<div className="sideBar__logo">kanban</div>
					<div className="sideBar__allBoards">
						<div className="sideBar__title">
							Все доски
							<span className="sideBar__title_countBoards">{` (${allBoards.boards.length})`}</span>
						</div>
						<div className="sideBar__list">
							{listBoards.map((item, index) => (
								<Board
									key={index}
									indexBoard={index}
									selectedBoard={selectedBoard}
									allBoards={allBoards}
									setSelectedBoard={setSelectedBoard}
								/>
							))}

							<AddNewBoard
								allBoards={allBoards}
								selectedBoard={selectedBoard}
								setAllBoards={setAllBoards}
							/>
						</div>
					</div>
					<HideSideBar handleClick={handleClick} />
				</div>
			</aside>
		</>
	);
};
