import React, { useEffect, useState, useRef } from "react";
import Postsumm from "./postsumm";
const apiUrl = import.meta.env.VITE_API_URL;

const Recents = () => {
	const [messages, setMessages] = useState([]);
	const messageRefs = useRef([]); 

	useEffect(() => {
		const fetchRecentMessages = async () => {
			try {
				const res = await fetch(`${apiUrl}/messages`);
				const data = await res.json();
				setMessages(data);
			} catch (err) {
				console.error("Failed to fetch recent messages:", err);
			}
		};

		fetchRecentMessages();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animate-fadeInCard");
				}
			});
		}, { threshold: 0.5 });

		messageRefs.current.forEach((messageRef) => {
			if (messageRef) {
				observer.observe(messageRef);
			}
		});
	}, [messages]);

	return (
		<div className="flex items-center flex-col">
			<div className="font-Heading pt-8 pb-2 md:pb-4 text-[.5em] md:text-base 2xl:text-2xl">
				Recent Velopes
			</div>
			<div className="flex items-start justify-center mx-10 w-[95%] xl:w-[80%] 2xl:w-[1500px] flex-grow">
				<div className="grid grid-cols-4 gap-2 md:gap-4 2xl:gap-8">
					{messages.map((msg, index) => (
						<div
							key={index}
							ref={(el) => (messageRefs.current[index] = el)} 
							className="opacity-0"
						>
							<Postsumm 
								message={msg} 
								animationClass="opacity-0 scale-90 animate-fadeInCard"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Recents;