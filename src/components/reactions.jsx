import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_API_URL;

const Reactions = ({ messageId, currentReactions = {}, className = "", smclassName = "" }) => {

	const [reactions, setReactions] = useState(currentReactions);
	const [userReactions, setUserReactions] = useState([]);

	useEffect(() => {
		const fetchReactions = async () => {
			try {
				const res = await fetch(`${apiUrl}/message/${messageId}`);
				const data = await res.json();
				setReactions(data.reactions || {});
			} catch (error) {
				console.error("Failed to fetch reactions:", error);
			}
		};

		fetchReactions();

		const cookieKey = `reactions_${messageId}`;
		const stored = Cookies.get(cookieKey);
		if (stored) {
			try {
				setUserReactions(JSON.parse(stored));
			} catch (e) {
				setUserReactions([]);
			}
		}
	}, [messageId]);

	const handleReaction = async (emoji) => {
		const cookieKey = `reactions_${messageId}`;
		let updatedUserReactions = [...userReactions];
		const hasReacted = userReactions.includes(emoji);
		const updatedReactions = { ...reactions };

		if (hasReacted) {
			updatedUserReactions = updatedUserReactions.filter((e) => e !== emoji);
			updatedReactions[emoji] = Math.max((updatedReactions[emoji] || 1) - 1, 0);
		} else {
			updatedUserReactions.push(emoji);
			updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
		}

		setUserReactions(updatedUserReactions);
		setReactions(updatedReactions);
		Cookies.set(cookieKey, JSON.stringify(updatedUserReactions), {
			expires: 365,
		});

		try {
			const res = await fetch(`${apiUrl}/message/${messageId}/react`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					emoji,
					action: hasReacted ? "remove" : "add",
				}),
			});

		} catch (error) {
			console.error("❌ Failed to update reaction:", error);
		}
	};

	const sortedReactions = Object.entries(reactions)
    .sort(([emojiA], [emojiB]) => {
      const userReactedA = userReactions.includes(emojiA);
      const userReactedB = userReactions.includes(emojiB);
      if (userReactedA !== userReactedB) {
        return userReactedA ? 1 : -1;
      }
      return reactions[emojiA] - reactions[emojiB];
    })
    .map(([emoji, count]) => ({ emoji, count }));

  return (
    <div className={`flex gap-2 md:gap-4 select-none flex-wrap items-start ${className}`}>
      {sortedReactions.map(({ emoji, count }) => {
        return (
          <button
            key={emoji}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction(emoji);
            }}
            className={`relative transition-all duration-300 cursor-pointer group hover:scale-110 ${
              count === 0 ? "opacity-50" : "opacity-100"
            }`}
            title={`React with ${emoji}`}
          >
            <span className="text-lg sm:text-xl md:text-2xl block">{emoji}</span>
            {count > 0 && (
              <span className="absolute bottom-0 -right-1 bg-white text-black text-xs font-bold rounded-full w-3 h-4 flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Reactions;
