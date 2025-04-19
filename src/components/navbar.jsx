import React from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./toggletheme";

const navbar = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-center">
				<div className=" flex  justify-around mt-5 md:mt-10 mx-5 select-none w-[95%] xl:w-[80%] 2xl:w-[1500px] ">
					<h1
						className="font-Logo text-lg md:text-2xl 2xl:text-4xl w-20 md:w-30 2xl:w-40 flex justify-start transition-all duration-300"
						onClick={() => navigate("/")}
					>
						Velope
					</h1>
					<h2 className="font-Heading text-[.5em] md:text-base 2xl:text-2xl text-center flex flex-col items-center justify-end py-5 transition-all duration-300">
						<p>Velope is a quiet place to leave words for anyone.</p>
						<p>No logins. No names. Just open letters, floating in the web.</p>
					</h2>
					<div className="w-20 md:w-30 2xl:w-40 flex justify-end items-start">
						<ThemeToggle />
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<div className="flex justify-center pb-4 md:pt-3 2xl:pt-6 border-b-1  md:border-b-1 w-[95%] xl:w-[80%] 2xl:w-[1500px]">
					<div className="font-Heading  ">
						<input
							className="w-full border-b-1 md:border-b-2 border-gray-400 dark:border-white/70 dark:focus:border-white focus:border-black outline-none px-2 placeholder-black/50 dark:placeholder-white/50 text-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300"
							placeholder="Name"
						/>

						<div className="flex justify-around">
							<div
								className="flex items-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300"
								onClick={() => navigate("/read")}
							>
								<div>
									<img
										src="/assets/icons/glasses.svg"
										alt="Light icon"
										className="dark:invert size-4 md:size-8 xl:size-10 p-0.5 md:p-1 xl:p-2 transition-all duration-300 "
									/>
								</div>
								READ
							</div>
							<div
								className="flex items-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300"
								onClick={() => navigate("/write")}
							>
								<div>
									<img
										src="/assets/icons/pen.svg"
										alt="Light icon"
										className="dark:invert size-4 md:size-8 xl:size-10 p-0.5 md:p-1 xl:p-2 transition-all duration-300"
									/>
								</div>
								WRITE
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default navbar;
