import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Write = () => {
	const colors = [
		"bg-red",
		"bg-orange",
		"bg-yellow",
		"bg-green",
		"bg-teal",
		"bg-aqua",
		"bg-cyan",
		"bg-blue",
		"bg-indigo",
		"bg-violet",
		"bg-pink",
	];

	const [selectedColor, setSelectedColor] = useState("bg-red");

	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const theName = queryParams.get("name") || "Velope";

	const today = new Date().toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
			<div
				className={`border-[0.5px] md:border-1 dark:border-white relative flex flex-col font-Content ${selectedColor} text-black p-5 rounded-xl w-[300px] h-[320px] md:w-[400px] md:h-[420px]`}
			>
				<div className="flex text-lg md:text-2xl 2xl:text-3xl">
					<div>To:</div> <div className="ml-2">{theName}</div>
				</div>
				<textarea
					placeholder="Fusce ante mi, "
					className="resize w-full h-full rounded-md p-2 focus:outline-none text-base md:text-2xl"
					maxLength={200}
				/>
				<div className="absolute bottom-0 left-3 text-[0.5em] md:text-sm">
					{today}
				</div>
				<div className="bg-gray-200 border-[0.5px] md:border-1 dark:border-white absolute bottom-0 right-0 rounded-xl">
					<img src="assets/icons/message.svg" className="p-2 w-16 h-12" />
				</div>
			</div>
			<div className="flex md:flex-col gap-2">
				{colors.map((color, index) => (
					<div
						key={index}
						className={`w-5 h-5 md:w-7 md:h-7 rounded-full ${color} cursor-pointer border-[0.5px] md:border-1 dark:border-white`}
						onClick={() => setSelectedColor(color)}
					></div>
				))}
			</div>
		</div>
	);
};

export default Write;
