import React, { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const Comments = ({ postId }) => {
	const [input, setInput] = useState("");
	const [comments, setComments] = useState([]);
	const [isSending, setIsSending] = useState(false);

	const fetchComments = async () => {
		try {
			const res = await fetch(`${apiUrl}/comments/${postId}`);
			const data = await res.json();
			setComments(data);
		} catch (err) {
			console.error("Error fetching comments:", err);
		}
	};

	useEffect(() => {
		fetchComments();
	}, [postId]);

	const handleChange = (e) => {
		if (e.target.value.length <= 100) {
			setInput(e.target.value);
		}
	};

	const handleSend = async () => {
		if (!input.trim()) return;

		if (isSending) return;

		setIsSending(true);

		try {
			const res = await fetch(`${apiUrl}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ comment: input.trim(), messageId: postId }),
			});
			const data = await res.json();
			setInput("");
			fetchComments();
		} catch (err) {
			console.error("Error sending comment:", err);
		} finally {
			setTimeout(() => setIsSending(false), 3000);
		}
	};

	const formatTimeAgo = (timestamp) => {
		const now = new Date();
		const commentDate = new Date(timestamp);
		const diffInSeconds = Math.floor((now - commentDate) / 1000);

		const minutes = Math.floor(diffInSeconds / 60);
		const hours = Math.floor(diffInSeconds / 3600);
		const days = Math.floor(diffInSeconds / 86400);

		if (days > 0) {
			return `${days} day${days > 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		} else {
			return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
		}
	};

	return (
		<div className="w-[80%] xl:w-[60%] 2xl:w-[1000px] mt-30">
			<div className="mb-10 gap-[2em] justify-around">
				<div className="relative">
					<input
						className="relative border-t-1 b-white p-2 transition-all duration-300 text-[.5em] md:text-base 2xl:text-2xl z-10 w-full"
						type="text"
						placeholder="Add a comment.. (only recent 5 are shown)"
						value={input}
						onChange={handleChange}
						maxLength={100}
					/>
					<div className="absolute text-[.4em] md:text-xs 2xl:text-base text-gray-500 right-2 bottom-0">
						{input.length}/100
					</div>
					<button
						onClick={handleSend}
						className="ml-2 size-[2em] md:size-[2.5em] absolute border p-2 rounded-lg dark:border-white transition-all duration-300 right-[-3em] top-1 hover:bg-black/20 dark:hover:bg-white/20"
						disabled={isSending}
					>
						<img
							src="/assets/icons/send.svg"
							alt="Send"
							className="dark:invert transition-all duration-300"
						/>
					</button>
				</div>
			</div>

			<div className="w-full flex justify-end">
				<button
					onClick={fetchComments}
					className="absolute gap-[.5em] border p-[.5em] rounded-[100%] dark:border-white transition-all duration-300 text-[.3em] md:text-xs 2xl:text-sm group hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-300"
				>
					<img
						src="/assets/icons/reload.svg"
						alt="Reload"
						className="size-[1.5em] dark:invert transition-all duration-300 group-hover:animate-spin"
					/>
				</button>
			</div>

			<ul className="flex flex-col text-[.5em] md:text-base 2xl:text-2xl px-[2em] gap-[1em] mt-5">
				{[...comments].reverse().map((comment, index) => (
					<li
						className="border-b-1 border-black/20 dark:border-white/20"
						key={index}
					>
						<p>{comment.comment}</p>
						<span className="text-sm text-gray-500">
							{formatTimeAgo(comment.timestamp)} 
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Comments;
