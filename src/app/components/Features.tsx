// Feature.jsx

import React from "react";

const Feature = ({ title, description }:{title:string; description:string}) => {
	return (
		<div className="flex items-center mb-4">
			<svg
				className="w-6 h-6 fill-current text-blue-500 mr-3"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg">
				{/* Add an icon or symbol representing the feature */}
			</svg>
			<div>
				<h3 className="text-lg font-semibold mb-1">
					{title}
				</h3>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default Feature;
