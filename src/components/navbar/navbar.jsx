import React from "react";
import RnW from "./rnw";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../toggletheme";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-center">
				<div className="flex justify-between items-center mt-3 md:mt-8 mx-5 select-none w-[95%] xl:w-[80%] 2xl:w-[1500px]">
					<div className="flex flex-col items-start gap-0">
						<div
							className="flex items-center gap-2 md:gap-3 font-Logo type-title w-32 md:w-44 2xl:w-56 justify-start transition-all duration-300 cursor-pointer"
							onClick={() => navigate("/")}
						>
							<img
								src="/velope.png"
								alt="Velope logo"
								className="size-8 md:size-10 2xl:size-12 object-contain"
							/>
							<h1 className="transition-all duration-300 hover:drop-shadow-[0_0_2px_#000]/50 dark:hover:drop-shadow-[0_0_2px_#fff]">
								Velope
							</h1>
						</div>
						<div className="font-Heading type-meta text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-0.5 ml-1">
							open letters, floating in the web
						</div>
					</div>
					<div className="w-20 md:w-30 2xl:w-40 flex justify-end items-start">
						<ThemeToggle />
					</div>
				</div>
			</div>
			<RnW />
		</>
	);
};

export default Navbar;
