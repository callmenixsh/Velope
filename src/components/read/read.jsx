import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./message";
import { useNavigate } from "react-router-dom";
import Loading from "../loading";

const apiUrl = import.meta.env.VITE_API_URL;

const Read = () => {
	const { name } = useParams();
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`${apiUrl}/messages/${name}`);
				const data = await response.json();
				setMessages(data);
			} catch (error) {
				console.error("Failed to fetch messages:", error);
			} finally {
				setIsLoading(false);
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

	if (isLoading) return <Loading />;

	return (
		<div className="flex flex-col items-center my-4 md:my-6 px-4">
			<div className="flex flex-col items-center text-center gap-1">
				<div className="type-title font-Content md:py-3 text-center">
					Sent To: {name}
				</div>
				<div className="type-meta opacity-80">
					{messages.length} message{messages.length !== 1 ? "s" : ""}
				</div>
			</div>

			{messages.length === 0 ? (
				<div className="flex flex-col items-center p-4 md:p-6 border rounded-md shadow-md mt-6 text-center mx-5 max-w-lg">
					<div className="type-heading font-medium">
						No messages yet.
					</div>
					<div className="type-body mt-2">
						Looks like noone has sent any messages to '{name}' yet. Send them
						one now!
					</div>
					<button
						onClick={handleNavigateToWrite}
						className="cursor-pointer bg-gray-200 border-[0.5px] md:border-1 mt-5 dark:border-white rounded-xl hover:brightness-95 transition-all duration-150"
					>
						<img src="/assets/icons/message.svg" className="p-2 w-12 h-10 md:w-14 md:h-11" />
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 2xl:gap-8 mt-5 w-full max-w-[1380px] place-items-center">
					{messages.map((msg, index) => {
						return (
							<div
								key={index}
								ref={(el) => (messageRefs.current[index] = el)}
								className="opacity-0"
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
