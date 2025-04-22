import React from "react";
import { useNavigate } from "react-router-dom";

const Topnames = ({ name }) => {
	const navigate = useNavigate();

	return (
		<div
			className="relative w-fit"
			onClick={() => navigate(`/read/${name}`)} 
		>
			<img
				src="/assets/icons/lettertop.svg"
				className="w-25 md:w-50 2xl:w-80"
				alt="Letter Icon"
			/>
			<p className="absolute inset-0 flex items-center justify-center text-[.6em] md:text-xl 2xl:text-3xl text-black pointer-events-none font-Content font-Message1 font-bold">
				{name}
			</p>
		</div>
	);
};

export default Topnames;
