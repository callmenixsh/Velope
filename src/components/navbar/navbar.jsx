import React from "react";
import RnW from "./rnw";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../toggletheme";

const navbar = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-center">
				<div className=" flex justify-around items-center mt-2 md:mt-5 md:mt-10 mx-5 select-none w-[95%] xl:w-[80%] 2xl:w-[1500px] ">
					<div
						className="flex items-start font-Logo text-xl md:text-2xl 2xl:text-4xl w-20 md:w-30 2xl:w-40 flex justify-start transition-all duration-300"
						onClick={() => navigate("/")}
					>
						<h1 className="transition-all duration-300 hover:drop-shadow-[0_0_2px_#000]/50 dark:hover:drop-shadow-[0_0_2px_#fff]">
							Velope
						</h1>
					</div>
					<div className="w-20 md:w-30 2xl:w-40 flex justify-end items-start">
						<ThemeToggle />
					</div>
				</div>
			</div>
			<h2 className="font-Heading text-[.6em] md:text-base 2xl:text-2xl md:mt-2 text-center flex flex-col items-center justify-end py-5 transition-all duration-300">
				<p>Velope is a quiet place to leave words for anyone.</p>
				<p>No logins. No names. Just open letters, floating in the web.</p>
			</h2>
			<RnW />
		</>
	);
};

export default navbar;
