import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Postsumm = ({ message }) => {
	const navigate = useNavigate();

	const firstLine = message.message.split(/\r?\n/)[0];
	const preview =
		firstLine.length > 12 ? firstLine.slice(0, 12) + "..." : firstLine;

	const truncatedName =
		message.name.length > 8 ? message.name.slice(0, 6) + "..." : message.name;

	const timeAgo = formatDistanceToNow(new Date(message.date), {
		addSuffix: true,
	});

	const filteredReactions = Object.entries(message.reactions).filter(
		([emoji, count]) => count > 0
	);

	return (
		<div className="flex flex-col group select-none text-black">
			<div
				className="flex flex-col justify-between p-2 md:p-4 2xl:p-6 w-36 h-26 md:h-32 md:w-40 2xl:h-48 2xl:w-60 rounded-sm md:rounded-md 2xl:rounded-xl border-[0.5px] md:border-1 border-black dark:border-white transition-all duration-300 cursor-pointer"
				style={{ backgroundColor: message.color , color:message.textcolor}}
				onClick={() => navigate(`/post/${message.messageId}`)}
			>
				<div
					className={`text-sm md:text-base 2xl:text-2xl ${message.font}`}
				>
					<div className="flex">
						<div>To:</div>
						<div className="ml-1 font-semibold">{truncatedName}</div>
					</div>
					<div className="break-words mt-1">
						<div
							dangerouslySetInnerHTML={{ __html: preview }}
							className="w-full h-full overflow"
						/>
					</div>
				</div>

				<div className="absolute right-[.1rem] -bottom-[.7em] flex gap-[.2rem] opacity-100 ">
					{filteredReactions.length > 0 &&
						filteredReactions.map(([emoji, count]) => (
							<button
								key={emoji}
								disabled
								className="flex items-end bg-white rounded-full px-[.1rem] text-xs md:text-sm 2xl:text-2xl border-[.01rem] md:border-[.5px] border-gray-300 text-shadow-md drop-shadow-md"
							>
								<span>{emoji}</span>
								{count > 0 && (
									<span className="text-[0.5rem] md:text-xs 2xl:text-sm pr-[.3em] text-shadow-md drop-shadow-md">
										{count}
									</span>
								)}
							</button>
						))}
				</div>

				<div className="text-[.6em] md:text-[.8em] 2xl:text-xs">{timeAgo}</div>
			</div>
		</div>
	);
};

export default Postsumm;
