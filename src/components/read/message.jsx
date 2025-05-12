import React from "react";
import { useNavigate } from "react-router-dom";
import Reactions from "../reactions";

const Message = ({ message, fontClass }) => {
	const navigate = useNavigate();

	const formattedDate = new Date(message.date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const handleNavigate = () => {
		navigate(`/post/${message.messageId}`);
	};

	return (
		<div
			className={`relative text-black flex ${fontClass} text-[.5em] md:text-base 2xl:text-2xl p-2 md:p-4 2xl:p-6 w-36 h-32 md:h-66 md:w-72 2xl:h-95 2xl:w-110 rounded-sm md:rounded-md 2xl:rounded-xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300`}
			style={{ backgroundColor: message.color }}
			onClick={handleNavigate}
		>
			<div className="w-full h-full overflow-hidden whitespace-pre-wrap break-words">
				<div
					dangerouslySetInnerHTML={{ __html: message.message }}
					className="w-full h-full overflow-hidden"
				/>
			</div>

			<div className="absolute bottom-1 text-[.5em] md:text-xs 2xl:text-sm text-black">
				{formattedDate}
			</div>
			<div className="absolute right-1 bottom-1 flex gap-2  transition-opacity duration-300">
				<Reactions
					messageId={message.messageId}
					currentReactions={message.reactions}
					className="text-[0.4rem] md:text-sm 2xl:text-base"
					smclassName="text-[0.3rem] md:text-xs 2xl:text-sm"
				/>
			</div>
		</div>
	);
};

export default Message;
