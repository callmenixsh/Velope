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
			className={`relative text-black flex ${fontClass} text-base md:text-lg 2xl:text-2xl p-2 md:p-4 2xl:p-6 w-72 h-68 md:h-74 md:w-82 2xl:h-100 2xl:w-110 rounded-md md:rounded-xl 2xl:rounded-xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300`}
			style={{ backgroundColor: message.color, color:message.textcolor }}
			onClick={handleNavigate}
		>
			<div className="w-full h-full overflow-hidden whitespace-pre-wrap break-words">
				<div
					dangerouslySetInnerHTML={{ __html: message.message }}
					className="w-full h-full overflow-hidden"
				/>
			</div>

			<div className="absolute bottom-1 text-xs md:text-sm 2xl:text-base text-black">
				{formattedDate}
			</div>
			<div className="absolute right-1 bottom-1 flex gap-2  transition-opacity duration-300">
				<Reactions
					messageId={message.messageId}
					currentReactions={message.reactions}
					className="text-xs md:text-sm 2xl:text-base"
					smclassName="text-xs md:text-xs 2xl:text-sm p-1"
				/>
			</div>
		</div>
	);
};

export default Message;
