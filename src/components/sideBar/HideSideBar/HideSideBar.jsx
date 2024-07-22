/* eslint-disable react/prop-types */
import React from 'react';

export const HideSideBar = ({ handleClick }) => {
	return (
		<div className="sideBar__footer" onClick={handleClick}>
			Спрятать список досок
		</div>
	);
};
