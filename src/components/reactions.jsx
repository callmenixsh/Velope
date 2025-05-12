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
			console.log(`🗑 Removing reaction: ${emoji}`);
		} else {
			updatedUserReactions.push(emoji);
			updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
			console.log(`➕ Adding reaction: ${emoji}`);
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

			const result = await res.json();
			console.log("📬 Reaction update sent:", {
				emoji,
				action: hasReacted ? "remove" : "add",
				status: res.status,
				response: result,
			});
		} catch (error) {
			console.error("❌ Failed to update reaction:", error);
		}
	};

	const sortedReactions = Object.entries(reactions)
		.sort(([, a], [, b]) => a - b)
		.map(([emoji, count]) => ({ emoji, count }));

	return (
  <div className={`flex gap-[.2rem] select-none ${className}`}>
    {sortedReactions.map(({ emoji, count }) => (
      <button
        key={emoji}
        onClick={(e) => {
          e.stopPropagation();
          handleReaction(emoji);
        }}
        className={`flex items-center bg-white/80 rounded-full px-[.2rem] transition-all hover:opacity-80
          ${userReactions.includes(emoji) ? "font-bold" : ""}
          ${count > 0 ? "opacity-100" : "opacity-50"}
        `}
      >
        <span>{emoji}</span>
        {count > 0 && <span className={`${smclassName}`}>{count}</span>}
      </button>
    ))}
  </div>
);

};

export default Reactions;
