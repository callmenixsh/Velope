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
			const textarea = document.querySelector("textarea");
			if (textarea) {
				textarea.style.height = "auto";
			}
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
		const diffInSeconds = Math.max(0, Math.floor((now - commentDate) / 1000));

		if (diffInSeconds < 60) {
			return "just now";
		}

		const minutes = Math.floor(diffInSeconds / 60);
		const hours = Math.floor(diffInSeconds / 3600);
		const days = Math.floor(diffInSeconds / 86400);

		if (days > 0) {
			return `${days}d ago`;
		} else if (hours > 0) {
			return `${hours}h ago`;
		} else if (minutes > 0) {
			return `${minutes}m ago`;
		} else {
			return "just now";
		}
	};

		return (
			<div className="w-full max-w-2xl mx-auto px-4 sm:px-6 mt-10 md:mt-16">
				{/* Header */}
				<div className="flex items-center justify-between gap-3 mb-5">
					<h3 className="type-title font-bold text-black dark:text-white">Gossip Corner</h3>
					<button
						onClick={fetchComments}
						className="flex items-center gap-1.5 type-micro text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-300 relative group"
						title="Refresh"
					>
						<img
							src="/assets/icons/reload.svg"
							alt="Reload"
							className="size-3 dark:invert transition-all duration-300 group-hover:animate-spin"
						/>
						<span className="hidden sm:inline">Refresh</span>
					</button>
				</div>

				{/* Input */}
				<div className="flex flex-col gap-2 mb-6">
					<textarea
						className="flex-1 resize-none overflow-hidden w-full bg-white dark:bg-white/5 rounded border border-black/15 dark:border-white/20 focus:border-black dark:focus:border-white text-black dark:text-white type-body p-2.5 focus:outline-none placeholder-black/40 dark:placeholder-white/40 transition-colors duration-300"
						rows={1}
						placeholder="start the gossip.."
						value={input}
						onChange={(e) => {
							if (e.target.value.length <= 100) {
								setInput(e.target.value);
								e.target.style.height = "auto";
								e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
							}
						}}
						maxLength={100}
					/>
					{input.trim() && (
						<div className="flex justify-end">
							<button
								onClick={handleSend}
								className="p-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={isSending}
								title={isSending ? "Sending..." : "Send"}
							>
								<img
									src="/assets/icons/send.svg"
									alt="Send"
									className="size-4 dark:invert transition-all duration-300 hover:scale-110"
								/>
							</button>
						</div>
					)}
				</div>

				{/* Chat Thread */}
				<div className="flex flex-col gap-2">
					{comments.length === 0 ? (
						<div className="text-center py-4">
							<p className="type-meta text-black/50 dark:text-white/50">no gossip yet</p>
						</div>
					) : (
						[...comments].reverse().map((comment, index) => (
							<div
								key={index}
								className="group relative animate-fadeIn"
							>
								<div className="flex gap-0 items-start">
							<div className="flex-1 min-w-0">
										<p className="type-body text-black dark:text-white break-words leading-snug whitespace-pre-wrap">{comment.comment}</p>
										<span className="inline-block type-micro text-black/50 dark:text-white/50 mt-1">
											{formatTimeAgo(comment.timestamp)}
										</span>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		);
};

export default Comments;
