import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Postsumm = ({ message }) => {
   const navigate = useNavigate();

   const truncatedName =
	   message.name.length > 14 ? message.name.slice(0, 12) + "..." : message.name;

   const timeAgo = formatDistanceToNow(new Date(message.date), {
	   addSuffix: true,
   });

   const filteredReactions = Object.entries(message.reactions).filter(
	   ([emoji, count]) => count > 0
   );

   // Pick a random strip image for each render
   const stripNum = React.useMemo(() => Math.floor(Math.random() * 6) + 1, [message.messageId]);
   const stripUrl = `/assets/strip${stripNum}.png`;

   return (
	   <div className="flex flex-col group select-none text-black w-full items-center">
		   <div
			   className="relative flex flex-col w-full max-w-[clamp(9.5rem,28vw,14rem)] min-h-[clamp(4.2rem,9vw,6rem)] p-[clamp(0.5rem,1.2vw,0.95rem)] transition-all duration-300 cursor-pointer"
			   style={{
				   color: message.textcolor,
				   backgroundImage: `linear-gradient(${message.color}, ${message.color}), url(/assets/paper-texture.png)`,
				   backgroundSize: '100% 100%',
				   backgroundRepeat: 'no-repeat',
				   backgroundPosition: 'center',
				   backgroundBlendMode: 'multiply',
				   WebkitMaskImage: `url(${stripUrl})`,
				   maskImage: `url(${stripUrl})`,
				   WebkitMaskSize: '100% 100%',
				   maskSize: '100% 100%',
				   WebkitMaskRepeat: 'no-repeat',
				   maskRepeat: 'no-repeat',
				   WebkitMaskPosition: 'center',
				   maskPosition: 'center',
				   overflow: 'visible',
			   }}
			   onClick={() => navigate(`/post/${message.messageId}`)}
		   >
			   <div className={`type-body ${message.font} flex flex-col gap-1.5 relative z-10`}>
				   <div className="flex items-center">
					   <div className="type-meta opacity-70">To:</div>
					   <div className="ml-1.5 font-semibold max-w-[85%] truncate">{truncatedName}</div>
				   </div>

				   <div className="flex items-end justify-between gap-2">
					   <div className="type-micro opacity-75">{timeAgo}</div>
				   </div>
			   </div>
		   </div>
		   {/* Reactions positioned bottom right, just outside the strip */}
		   <div className="w-full flex justify-end relative" style={{height: 0, top: '-1.3rem'}}>
			   <div className="flex flex-wrap gap-1 max-w-[70%]" style={{position: 'relative', right: '2rem'}}>
				   {filteredReactions.length > 0 &&
					   filteredReactions.slice(0, 3).map(([emoji, count]) => (
						   <div
							   key={emoji}
							   className="relative flex items-center justify-center size-[clamp(1.25rem,2.8vw,1.7rem)]"
						   >
							   <span className="text-[clamp(0.85rem,2vw,1.2rem)] leading-none">{emoji}</span>
							   {count > 1 && (
								   <span className="absolute -bottom-1 -right-1 min-w-[0.72rem] h-[0.72rem] px-[2px] flex items-center justify-center rounded-full bg-white border border-gray-300 text-[0.45rem] font-semibold leading-none text-black">
									   {count}
								   </span>
							   )}
						   </div>
					   ))}
			   </div>
		   </div>
	   </div>
   );
};

export default Postsumm;
