import React from "react";

const Dog = (props) => {
	return (
		<div className="child">
			<img style={{ width: 300, height: 300 }} src={props.url} alt="" />
		</div>
	);
};

export default Dog;
