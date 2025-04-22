import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import Notfound from "../notfound/notfound";

const Post = () => {
	const cardRef = useRef(null);
	const navigate = useNavigate();
	const { state } = useLocation();
	const message = state?.message;

	if (!message) {
		navigate("/read");
		return <Notfound />;
	}

	const formattedDate = new Date(message.date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const handleDownload = async () => {
		if (!cardRef.current) return;
		try {
			const dataUrl = await toPng(cardRef.current);
			const link = document.createElement("a");
			link.download = "card.png";
			link.href = dataUrl;
			link.click();
		} catch (error) {
			console.error("Failed to generate image", error);
		}
	};

	const handleReadMore = () => {
		navigate(`/read/${message.name}`);
	};

	return (
		<div className="flex flex-col items-center my-10 gap-5">
			<div
				ref={cardRef}
				style={{ backgroundColor: message.color }}
				className={`opacity-0 scale-90 animate-fadeInCard border-[0.5px] md:border-1 dark:border-white relative flex flex-col text-black p-5 rounded-xl w-[300px] h-[320px] md:w-[400px] md:h-[420px] ${message.font}`}
			>
				<div className="flex text-lg md:text-2xl 2xl:text-3xl">
					<div>To:</div>{" "}
					<div className="ml-2 mb-2 font-bold ">{message.name}</div>
				</div>
				<div className="resize w-full h-full rounded-md p-2 focus:outline-none text-base md:text-2xl ">
					<div
						dangerouslySetInnerHTML={{ __html: message.message }}
						className="w-full h-full overflow-hidden"
					/>
				</div>
				<div className="absolute bottom-0 left-3 text-[0.5em] md:text-sm">
					{formattedDate}
				</div>
			</div>

			<div className="flex gap-4">
				<button
					onClick={handleDownload}
					className="border p-2 rounded-lg dark:border-white transition-all duration-300"
				>
					<img
						src="assets/icons/download.svg"
						alt="Download"
						className="size-8 dark:invert transition-all duration-300"
					/>
				</button>

				<button
					onClick={handleReadMore}
					className="border p-2 rounded-lg dark:border-white transition-all duration-300"
				>
					Read More
				</button>
			</div>
		</div>
	);
};

export default Post;
