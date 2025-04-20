import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Rnw = () => {
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const isValidName = (value) => /^[a-zA-Z\s]+$/.test(value.trim());

	const handleNavigate = (path) => {
		if (isValidName(name)) {
			navigate(`${path}?name=${encodeURIComponent(name.trim())}`);
		} else {
			alert("Please enter a valid name");
		}
	};

	return (
		<div className="flex justify-center select-none">
			<div className="flex justify-center pb-4 md:pt-3 2xl:pt-6 border-b-1  md:border-b-1 w-[95%] xl:w-[80%] 2xl:w-[1500px]">
				<div className="font-Heading">
					<input
						className="font-Content w-full border-b-1 md:border-b-2 border-gray-400 dark:border-white/70 dark:focus:border-white focus:border-black outline-none px-2 placeholder-black/50 dark:placeholder-white/50 text-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<div className="flex justify-around">
						<div
							className="flex items-center text-[.5em] md:text-base 2xl:text-2xl transition-all duration-300"
							onClick={() => handleNavigate("/read")}
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
							onClick={() => handleNavigate("/write")}
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
	);
};

export default Rnw;
