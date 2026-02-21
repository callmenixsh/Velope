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

	// Pick a random card image for each message
	const cardNum = React.useMemo(() => Math.floor(Math.random() * 3) + 1, [message.messageId]);
	const cardUrl = `/assets/card${cardNum}.png`;

	const cardStyle = {
		color: message.textcolor,
		backgroundImage: `linear-gradient(${message.color}, ${message.color}), url(/assets/paper-texture.png)`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundBlendMode: 'multiply',
		WebkitMaskImage: `url(${cardUrl})`,
		maskImage: `url(${cardUrl})`,
		WebkitMaskSize: '100% 100%',
		maskSize: '100% 100%',
		WebkitMaskRepeat: 'no-repeat',
		maskRepeat: 'no-repeat',
		WebkitMaskPosition: 'center',
		maskPosition: 'center',
		overflow: 'visible',
	};

	return (<>
		<div
			className={`velope-full-card ${fontClass} type-body cursor-pointer hover:-translate-y-[1px] w-[20rem] h-[22.86rem] md:w-[28rem] md:h-[32rem] `}
			style={cardStyle}
			onClick={handleNavigate}
		>
			<div className="w-full h-full overflow-hidden whitespace-pre-wrap break-words p-5 md:p-8">
				<div
					dangerouslySetInnerHTML={{ __html: message.message }}
					className="w-full h-full overflow-hidden text-sm md:text-xl leading-[1.6]"
				/>
			</div>
			<div className="absolute left-7 bottom-10 pl-2 md:pl-8 type-meta text-black text-[0.98rem] opacity-80">
				{formattedDate}
			</div>
		</div>
		{/* Reactions positioned bottom right, just outside the card */}
		<div className="w-full flex justify-end relative" style={{height: 0, top: '-2.1rem'}}>
			<div className="flex flex-wrap gap-1 max-w-[70%] bottom-8 md:bottom-10 pr-8 relative " >
				<Reactions
					messageId={message.messageId}
					currentReactions={message.reactions}
					className="type-meta"
					smclassName="type-micro p-1"
					/>
			</div>
		</div>
	</>);
};

export default Message;
