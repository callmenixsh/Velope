import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; 

const Postsumm = ({ message }) => {
	const navigate = useNavigate();

	const preview =
		message.message.length > 20
			? message.message.slice(0, 20) + "..."
			: message.message;

	const timeAgo = formatDistanceToNow(new Date(message.date), { addSuffix: true });

	return (
		<div className="flex flex-col group select-none text-black">
			<div
				className="flex flex-col justify-between p-2 md:p-4 2xl:p-6 w-20 h-16 md:h-32 md:w-40 2xl:h-48 2xl:w-60 rounded-sm md:rounded-md 2xl:rounded-xl border-[0.5px] md:border-1 dark:border-white transition-all duration-300 cursor-pointer"
				style={{ backgroundColor: message.color }}
				onClick={() => navigate("/post", { state: { message } })}
			>
				<div className={`text-[.5em] md:text-base 2xl:text-2xl ${message.font}`}>
					<div className="flex">
						<div>To:</div>
						<div className="ml-1 font-semibold">{message.name}</div>
					</div>
					<div>			<div
				dangerouslySetInnerHTML={{ __html: preview }}
				className="w-full h-full overflow-hidden"
			/></div>
				</div>
				<div className="text-[.3em] md:text-[.6em] 2xl:text-xs">
					{timeAgo}
				</div>
			</div>
		</div>
	);
};

export default Postsumm;
