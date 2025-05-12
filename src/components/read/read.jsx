import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./message";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Read = () => {
	const { name } = useParams();
	const [messages, setMessages] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch(`${apiUrl}/messages/${name}`);
				const data = await response.json();
				setMessages(data);
			} catch (error) {
				console.error("Failed to fetch messages:", error);
			}
		};

		fetchMessages();
	}, [name]);

	const handleNavigateToWrite = () => {
		if (name) {
			navigate(`/write/${encodeURIComponent(name)}`);
		} else {
			alert("Please enter a valid name to send a message.");
		}
	};

	const messageRefs = useRef([]);

	const observeMessages = () => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fadeInCard");
					}
				});
			},
			{ threshold: 0.15 }
		);

		messageRefs.current.forEach((messageRef) => {
			if (messageRef) {
				observer.observe(messageRef);
			}
		});
	};

	useEffect(() => {
		if (messages.length > 0) {
			observeMessages();
		}
	}, [messages]);

	return (
		<div className="flex flex-col items-center my-5">
			<div className="flex flex-col items-center">
				<div className="text-base md:text-2xl 2xl:text-3xl font-Content md:py-4">
					Sent To: {name}
				</div>
				<div className="text-[.8em] md:text-xs 2xl:text-sm">
					{messages.length} message{messages.length !== 1 ? "s" : ""}
				</div>
			</div>

			{messages.length === 0 ? (
				<div className="flex flex-col items-center p-4 border rounded-md shadow-md mt-6 text-center mx-5">
					<div className="text-sm md:text-base 2xl:text-2xl font-medium">
						No messages yet.
					</div>
					<div className="text-[.8em] md:text-base 2xl:text-2xl mt-2">
						Looks like noone has sent any messages to '{name}' yet. Send them
						one now!
					</div>
					<button
						onClick={handleNavigateToWrite}
						className="cursor-pointer bg-gray-200 border-[0.5px] md:border-1 mt-5 dark:border-white rounded-xl"
					>
						<img src="/assets/icons/message.svg" className="p-2 w-16 h-12" />
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 2xl:gap-10 mt-2">
					{messages.map((msg, index) => {
						return (
							<div
								key={index}
								ref={(el) => (messageRefs.current[index] = el)}
								className={`opacity-0 ${msg.font}`}
							>
								<Message key={index} message={msg} fontClass={msg.font} />{" "}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Read;
