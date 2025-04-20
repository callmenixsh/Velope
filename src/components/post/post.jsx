import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";

const Post = () => {
	const [reactions, setReactions] = useState({
		love: false,
		funny: false,
		sad: false,
	});

	const cardRef = useRef(null);

	const handleReaction = (type) => {
		setReactions((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	const handleDownload = async () => {
		if (!cardRef.current) return;
		try {
			const dataUrl = await toPng(cardRef.current);
			const link = document.createElement("a");
			link.download = 'velope-card.png';
			link.href = dataUrl;
			link.click();
		} catch (error) {
			console.error("Failed to generate image", error);
		}
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
		<div className="flex flex-col items-center my-10 gap-5">
			{/* Card */}
			<div
				ref={cardRef}
				className="border-[0.5px] md:border-1 dark:border-white relative flex flex-col font-Content bg-red text-black p-5 rounded-xl w-[300px] h-[320px] md:w-[400px] md:h-[420px]"
			>
				<div className="flex text-lg md:text-2xl 2xl:text-3xl">
					<div>To:</div> <div className="ml-2">Velope</div>
				</div>
				<div className="resize w-full h-full rounded-md p-2 focus:outline-none text-base md:text-2xl">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis
					aliquet pulvinar. Donec fermentum ultricies nunc, id semper turpis
					bibendum eget. Aliquam congue vulputate egestas. Curabitur sit.
				</div>
				<div className="absolute bottom-0 left-3 text-[0.5em] md:text-sm">
					4 Apr 2024
				</div>
			</div>


			{/* Reactions */}
			<div className="flex gap-1 md:gap-2 text-[.5em] md:text-base 2xl:text-2xl flex-wrap justify-end mt-1">
				{[...inactiveReactions, ...activeReactions].map(([type, emoji]) => {
					const isActive = reactions[type];
					return (
						<button
							key={type}
							onClick={() => handleReaction(type)}
							className="flex items-center hover:scale-105 bg-gray-100 dark:bg-gray-700 p-0.5 md:p-1 2xl:p-2 rounded-xl md:rounded-2xl 2xl:rounded-4xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300"
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

			{/* Download Button */}
			<button onClick={handleDownload} className="border p-2 rounded-lg dark:border-white transition-all duration-300">
				<img src="assets/icons/download.svg" alt="Download" className="size-8 dark:invert transition-all duration-300 " />
			</button>
		</div>
	);
};

export default Post;
