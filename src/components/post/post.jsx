import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import Notfound from "../notfound/notfound";
import CommentSection from "./comments";
import Reactions from "../reactions";
import Loading from "../loading";
const apiUrl = import.meta.env.VITE_API_URL;

const Post = () => {
	const cardRef = useRef(null);
	const navigate = useNavigate();
	const { messageId } = useParams();

	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!messageId) {
			setError("Message ID is missing.");
			setLoading(false);
			return;
		}

		const fetchMessage = async () => {
			try {
				const res = await fetch(`${apiUrl}/message/${messageId}`);
				if (!res.ok) throw new Error("Message not found.");
				const data = await res.json();
				setMessage(data);
			} catch (error) {
				console.error(error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMessage();
	}, [messageId]);

	if (loading) return <Loading />;
	if (error || !message) return <Notfound />;

	const formattedDate = new Date(message.date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	// Pick a random card image for each post
	const cardNum = Math.floor(Math.random() * 3) + 1;
	const cardUrl = `/assets/card${cardNum}.png`;

	const cardStyle = {
		color: message.textcolor,
		backgroundImage: `linear-gradient(${message.color}, ${message.color}), url(/assets/paper-texture.png)`,
		backgroundSize: "100% 100%",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundBlendMode: "multiply",
		WebkitMaskImage: `url(${cardUrl})`,
		maskImage: `url(${cardUrl})`,
		WebkitMaskSize: "100% 100%",
		maskSize: "100% 100%",
		WebkitMaskRepeat: "no-repeat",
		maskRepeat: "no-repeat",
		WebkitMaskPosition: "center",
		maskPosition: "center",
		position: "relative",
	};

	const handleDownload = async () => {
		if (!cardRef.current) return;
		try {
			const dataUrl = await toPng(cardRef.current);
			const link = document.createElement("a");
			link.download = `${message.name}'s velope.png`;
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
		<div className="flex flex-col items-center mt-8 md:mt-12 gap-8 px-4">
			<div
				ref={cardRef}
				style={cardStyle}
				className={`opacity-0 animate-fadeInCard shadow-lg ${message.font} w-[20rem] h-[22.86rem] md:w-[28rem] md:h-[32rem] p-9 md:p-13 `}
			>
				<div className="flex select-none text-base md:text-2xl ">
					<div>To:</div>
					<div className="ml-2 mb-2">{message.name}</div>
				</div>
				<div className="resize w-full h-full rounded-md focus:outline-none type-body">
					<div className="w-full h-full overflow-hidden whitespace-pre-wrap break-words">
						<div
							dangerouslySetInnerHTML={{ __html: message.message }}
							className="w-full h-full overflow-hidden text-sm md:text-xl leading-[1.6]"
						/>
					</div>
				</div>
				<div className="absolute left-7 bottom-8 pl-6 type-meta text-black text-[0.98rem] opacity-80">
					{formattedDate}
				</div>
			</div>
			   {/* Reactions positioned directly below the card, right-aligned with card edge */}
			   <div className="w-full flex justify-end" style={{ maxWidth: '28rem', margin: '0 auto' }}>
				   <div className="flex flex-wrap md:gap-1 max-w-[70%] pr-25 md:pr-14 -mt-23 md:-mt-24">
					   <Reactions
						   messageId={messageId}
						   currentReactions={message.reactions}
						   className="type-meta"
						   smclassName="type-micro p-1"
					   />
				   </div>
			   </div>

			<div className="flex gap-6 md:gap-8 items-center mt-4">
				<button
					onClick={handleDownload}
					className="flex items-center gap-2 type-body font-medium text-black/80 dark:text-white/80 relative group transition-colors duration-300 hover:text-black dark:hover:text-white"
					title="Download card"
				>
					<img
						src="/assets/icons/download.svg"
						alt="Download"
						className="size-5 dark:invert transition-all duration-300"
					/>
					<span className="hidden md:inline">Download</span>
					<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300"></div>
				</button>

				<button
					onClick={handleReadMore}
					className="flex items-center gap-2 type-body font-medium text-black/80 dark:text-white/80 relative group transition-colors duration-300 hover:text-black dark:hover:text-white"
				>
					Read More
					<span className="text-sm group-hover:translate-x-1 transition-transform duration-300">→</span>
					<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300"></div>
				</button>
			</div>
			<CommentSection postId={messageId} />
		</div>
	);
};

export default Post;
