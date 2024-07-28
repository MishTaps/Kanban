/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';
import { AddNewBoard } from '../../boards/AddNewBoard';
import { Board } from '../../boards/Board';
import { ImportBoard } from '../../boards/importBoard/importBoard';
import { HideSideBar } from '../HideSideBar';

export const SideBar = ({
	isHidden,
	setHidden,
	selectedBoard,
	allBoards,
	setSelectedBoardIndex,
	setAllBoards,
	setTitleText,
	setOpenedColorSelector,
	setOpenedCard,
}) => {
	const listBoards = Array(allBoards.boards.length).fill();

	const handleClick = () => {
		setHidden(true);
	};

	return (
		<>
			<aside className={cn('main__sideBar', { 'display-none': isHidden })}>
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
									setSelectedBoardIndex={setSelectedBoardIndex}
									setTitleText={setTitleText}
									setOpenedColorSelector={setOpenedColorSelector}
									setOpenedCard={setOpenedCard}
								/>
							))}

							<AddNewBoard setAllBoards={setAllBoards} />
							<ImportBoard allBoards={allBoards} setAllBoards={setAllBoards} />
						</div>
					</div>
					<HideSideBar handleClick={handleClick} />
				</div>
			</aside>
		</>
	);
};
