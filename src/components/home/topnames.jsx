import React from "react";

import { useNavigate } from "react-router-dom";

const topnames = () => {

    const navigate = useNavigate();
	return (
		<div className="relative w-fit" onClick={() => navigate("/read")}>
			<img
				src="/assets/icons/lettertop.svg"
				className="w-25 md:w-50 2xl:w-80"
				alt="Letter Icon"
			/>
			<p className="absolute inset-0 flex items-center justify-center text-[.5em] md:text-base 2xl:text-2xl text-black pointer-events-none">
				Velope
			</p>
		</div>
	);
};

export default topnames;
