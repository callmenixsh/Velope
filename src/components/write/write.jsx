import React, { useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Write = () => {
	const colors = [
		"#FFD5D5", // Red
		"#FFE9DB", // Orange
		"#FEFFD9", // Yellow
		"#E1FFD0", // Green
		"#D0FFEC", // Teal
		"#C8FFFF", // Aqua
		"#D2EEFF", // Cyan
		"#D8DEFF", // Blue
		"#E4D9FF", // Indigo
		"#F8D5FF", // Violet
		"#FFD9ED", // Pink
	];

	const [selectedColor, setSelectedColor] = useState("#FFD5D5");
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);
	const { name } = useParams();

	const today = new Date();
	const formattedDate = today.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const handleSend = async () => {
		if (!message.trim()) return;
		setIsSending(true);

		console.log("Sending message with color:", selectedColor);

		try {
			const res = await fetch(`${apiUrl}/messages/send`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					message,
					color: selectedColor,
					date: today,
				}),
			});

			const data = await res.json();
			console.log(data);
			setMessage("");
			alert("Message sent 💌");
		} catch (err) {
			console.error("Send error:", err);
			alert("Failed to send message.");
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
			<div
				className="border-[0.5px] md:border-1 dark:border-white relative flex flex-col font-Message text-black p-5 rounded-xl w-[300px] h-[320px] md:w-[400px] md:h-[420px]"
				style={{ backgroundColor: selectedColor }}
			>
				<div className="flex text-lg md:text-2xl 2xl:text-3xl select-none">
					<div>To:</div> <div className="ml-2">{name}</div>
				</div>
				<textarea
					placeholder="Write your message..(nicknames, confessions, questions)                  remember to save your privacy!!"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="resize w-full h-full rounded-md p-2 focus:outline-none text-base md:text-2xl"
					maxLength={200}
				/>
				<div className="absolute bottom-0 left-3 text-[0.5em] md:text-sm">
					{formattedDate}
				</div>
				<div
					onClick={handleSend}
					className="cursor-pointer bg-gray-200 border-[0.5px] md:border-1 dark:border-white absolute bottom-0 right-0 rounded-xl"
				>
					<img src="/assets/icons/message.svg" className="p-2 w-16 h-12" />
				</div>
			</div>
			<div className="flex md:flex-col gap-2 ">
				{colors.map((color, index) => (
					<div
						key={index}
						className="w-5 h-5 md:w-7 md:h-7 rounded-full  border-[0.5px] md:border-1 dark:border-white"
						style={{ backgroundColor: color }}
						onClick={() => setSelectedColor(color)}
					></div>
				))}
			</div>
		</div>
	);
};

export default Write;
