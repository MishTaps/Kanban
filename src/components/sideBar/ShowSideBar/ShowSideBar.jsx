export const ShowSideBar = ({ isHidden, setHidden }) => {
	const handleClick = () => {
		setHidden(false);
	};
	return (
		<>
			<div className={'hidedSideBar' + (isHidden ? '' : ' display-none')} onClick={handleClick}>
				<div className="resetSideBar">👀</div>
			</div>
		</>
	);
};
