/* eslint-disable react/prop-types */
import cn from 'classnames';
import React from 'react';

export const ShowSideBar = ({ isHidden, setHidden }) => {
	const handleClick = () => {
		setHidden(false);
	};
	return (
		<>
			<div className={cn('hidedSideBar', { 'display-none': !isHidden })} onClick={handleClick}>
				<div className="resetSideBar">👀</div>
			</div>
		</>
	);
};
