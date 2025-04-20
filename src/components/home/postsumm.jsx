import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Postsumm = () => {
	const navigate = useNavigate();
	const [reactions, setReactions] = useState({
		love: false,
		funny: false,
		sad: false,
	});

	const handleReaction = (type) => {
		setReactions((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	const reactionEmojis = {
		love: "❤️",
		funny: "😂",
		sad: "😢",
	};

	const activeReactions = Object.entries(reactionEmojis).filter(
		([type]) => reactions[type]
	);
	const inactiveReactions = Object.entries(reactionEmojis).filter(
		([type]) => !reactions[type]
	);

	return (
		<div className="flex flex-col group select-none">
			<div className="flex bg-gray-200 dark:bg-gray-800 p-2 md:p-4 2xl:p-6 w-20 h-16 md:h-32 md:w-40 2xl:h-48 2xl:w-60 rounded-sm md:rounded-md 2xl:rounded-xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300" 
			onClick={() => navigate("/post")}>
				<div className="flex flex-col text-[.5em] md:text-base 2xl:text-2xl font-Content">
					<div className="flex">
						<div>To:</div>
						<div className="ml-1 font-semibold">Velope</div>
					</div>
					<div>summary in 10 characters or something...</div>
				</div>
			</div>

			{/* Reactions */}
			<div className="flex gap-1 md:gap-2 text-[.5em] md:text-base 2xl:text-2xl flex-wrap justify-end mt-0.5 md:mt-1 translate-y-[-5px] md:translate-y-[-10px] 2xl:translate-y-[-15px]">
				{[...inactiveReactions, ...activeReactions].map(([type, emoji]) => {
					const isActive = reactions[type];
					return (
						<button
							key={type}
							onClick={() => handleReaction(type)}
							className={`flex items-center hover:scale-105 bg-gray-100 dark:bg-gray-700 p-0.5 md:p-1 2xl:p-2 rounded-xl md:rounded-2xl 2xl:rounded-4xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300 ${
								!isActive ? "opacity-0 group-hover:opacity-100" : ""
							}`}
						>
							<span>{emoji}</span>
							{isActive && (
								<span className="ml-1 text-[.25em] md:text-[.5em] 2xl:text-xl translate-y-[2.5px] md:translate-y-[5px] 2xl:translate-y-[10px] transition-all duration-300">
									1
								</span>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Postsumm;
