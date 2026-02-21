import React, { useEffect, useState, useRef } from "react";
import Postsumm from "./postsumm";
import Loading from "../loading";
const apiUrl = import.meta.env.VITE_API_URL;

const Recents = () => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const messageRefs = useRef([]);

	useEffect(() => {
		const fetchRecentMessages = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${apiUrl}/messages`);
				const data = await res.json();
				setMessages(data);
			} catch (err) {
				console.error("Failed to fetch recent messages:", err);
			} finally {
				setIsLoading(false);
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

		return () => observer.disconnect();
	}, [messages]);

	if (isLoading) return <Loading />;

	return (
		<div className="flex items-center flex-col pb-2 md:pb-8">
			<div className="font-Heading pt-3 md:pt-9 pb-2 md:pb-5 type-heading text-center">
				Recent Velopes
			</div>
			<div className="flex items-start justify-center px-2 md:px-8 w-full xl:w-[90%] 2xl:w-[1500px] flex-grow">
				<div className="grid [grid-template-columns:repeat(auto-fit,minmax(clamp(9.5rem,28vw,14rem),1fr))] gap-3 md:gap-5 justify-items-center w-full max-w-[1120px] mx-auto">
					{messages.map((msg, index) => (
						<div
							key={index}
							ref={(el) => (messageRefs.current[index] = el)}
							className="opacity-0 w-full flex justify-center"
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