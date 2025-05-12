import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import Filter from "bad-words-es";

const Write = () => {
	const filter = new Filter();
	filter.addWords("bitch", "slut", "dumbass", "jerkface", "idiothead");

	const colors = [
		"#FFD5D5",
		"#FFE9DB",
		"#FEFFD9",
		"#E1FFD0",
		"#D0FFEC",
		"#C8FFFF",
		"#D2EEFF",
		"#D8DEFF",
		"#E4D9FF",
		"#F8D5FF",
		"#FFD9ED",
		"#ffffff"
	];

	const [selectedFont, setSelectedFont] = useState("font-Message5");
	const [selectedColor, setSelectedColor] = useState("#FFD5D5");
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);
	const { name } = useParams();
	const editorRef = useRef(null);

	const today = new Date();
	const formattedDate = today.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const [showConfirm, setShowConfirm] = useState(false);
	const [messageLength, setMessageLength] = useState(0);
	const [messageStatus, setMessageStatus] = useState("");
	const [messageResponse, setMessageResponse] = useState("");
	const [showConditionPopup, setShowConditionPopup] = useState(false);

	const handleConfirmPopup = () => {
		const plainText = message.replace(/<[^>]+>/g, "");

		if (filter.isProfane(plainText)) {
			setMessageStatus("Umm... let's keep things civil, okay?");
			setMessageResponse("Uh I'm Sorry..!");
			setShowConditionPopup(true);
			setShowConfirm(false);
		} else if (messageLength < 10) {
			setMessageStatus("All letters have some meaning, but this? Really?");
			setMessageResponse("Okay lemme write some");
			setShowConditionPopup(true);
			setShowConfirm(false);
		} else if (messageLength > 200) {
			setMessageStatus("You can only write so much in a letter!");
			setMessageResponse("Okay lemme delete some");
			setShowConditionPopup(true);
			setShowConfirm(false);
		} else {
			setMessageStatus("Ready to send!");
			setShowConditionPopup(false);
			setShowConfirm(true);
		}
	};

	const handleSend = async () => {
		setIsSending(true);
		setShowConfirm(false);
		const plainTextMessage = editorRef.current.innerHTML;

		try {
			const res = await fetch(`${apiUrl}/messages/send`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name,
					message: plainTextMessage,
					color: selectedColor,
					font: selectedFont,
					date: today,
				}),
			});

			const data = await res.json();
			console.log(data);
			setMessage("");
			setMessageLength(0);
			alert("Message sent 💌");
			document.querySelector("[contenteditable]").innerHTML = "";
		} catch (err) {
			console.error("Send error:", err);
			alert("Failed to send message.");
		} finally {
			setIsSending(false);
		}
	};

	const handleInput = (e) => {
		e.preventDefault();
		let newMessage = e.target.innerHTML;
		const plainText = newMessage.replace(/<[^>]+>/g, "");
		if (plainText.length > 200) {
			newMessage = newMessage.slice(0, 200);
		}
		setMessage(newMessage);
		setMessageLength(plainText.length);
	};

	useEffect(() => {
		const editor = editorRef.current;
		const handlePaste = (e) => {
			setTimeout(() => {
				const plainText = editor.innerText.replace(/<[^>]+>/g, "");
				setMessageLength(plainText.length);
			}, 0);
		};

		editor.addEventListener("paste", handlePaste);
		return () => {
			editor.removeEventListener("paste", handlePaste);
		};
	}, []);

	return (
		<div className="flex flex-col md:flex-row gap-5 justify-center items-center md:items-start my-10">
			<div className="flex flex-col items-center gap-5">
				<div
					className={`border-[0.5px] md:border-1 dark:border-white relative flex flex-col ${selectedFont} text-black p-5 rounded-xl w-[300px] h-[320px] md:w-[400px] md:h-[420px] transition-all duration-500`}
					style={{ backgroundColor: selectedColor }}
				>
					<div className="flex text-lg md:text-2xl 2xl:text-3xl select-none">
						<div>To:</div> <div className="ml-2">{name}</div>
					</div>

					<div
						ref={editorRef}
						contentEditable
						suppressContentEditableWarning={true}
						onInput={handleInput}
						className="resize w-full h-full rounded-md p-2 focus:outline-none text-base md:text-2xl overflow-y-auto"
						style={{ whiteSpace: "pre-wrap" }}
					></div>

					<div
						onClick={handleConfirmPopup}
						className="cursor-pointer bg-gray-200 border-[0.5px] md:border-1 dark:border-white absolute bottom-0 right-0 rounded-xl"
					>
						<img src="/assets/icons/message.svg" className="p-2 w-12 md:w-16" />
					</div>

					<div className="absolute bottom-1 left-3 text-xs md:text-sm">
						{formattedDate}
					</div>

					<div className="absolute bottom-6 left-3 text-[0.5em] md:text-xs 2xl:text-sm opacity-70 font-Content">
						<span
							style={{
								color: messageLength > 180 ? "red" : "inherit",
							}}
						>
							{messageLength}/200
						</span>
					</div>
				</div>

				<div className="flex justify-center items-center gap-2 text-sm md:text-sm 2xl:text-lg">
					<div className="flex gap-2">
						<button
							onClick={() => setSelectedFont("font-Message1")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message1"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message1`}
						>
							Abc
						</button>
						<button
							onClick={() => setSelectedFont("font-Message2")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message2"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message2`}
						>
							Abc
						</button>
						<button
							onClick={() => setSelectedFont("font-Message3")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message3"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message3`}
						>
							Abc
						</button>
						<button
							onClick={() => setSelectedFont("font-Message4")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message4"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message4`}
						>
							Abc
						</button>
						<button
							onClick={() => setSelectedFont("font-Message5")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message5"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message5`}
						>
							Abc
						</button>
						<button
							onClick={() => setSelectedFont("font-Message6")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message6"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message6`}
						>
							Abc
						</button>
						<button
							onClick={() => setSelectedFont("font-Message7")}
							className={`px-2 border rounded ${
								selectedFont === "font-Message7"
									? "bg-black text-white dark:bg-white dark:text-black"
									: ""
							} font-Message7`}
						>
							Abc
						</button>
					</div>
				</div>
			</div>

			<div className="flex md:flex-col gap-2">
				{colors.map((color, index) => (
					<div
						key={index}
						className="w-5 h-5 md:w-7 md:h-7 rounded-full border-[0.5px] md:border-1 dark:border-white"
						style={{ backgroundColor: color }}
						onClick={() => setSelectedColor(color)}
					></div>
				))}
			</div>

			{showConditionPopup && (
				<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 text-sm md:text-base 2xl:text-2xl opacity-0 animate-fadeInCard scale-110">
					<div className="bg-neutral-300 dark:bg-neutral-950 border border-black dark:border-white text-black dark:text-white px-3 py-5 md:px-6 md:py-10 rounded-xl w-fit h-fit shadow-lg flex flex-col gap-4 text-center transition-all duration-200">
						<div className="font-Content">{messageStatus}</div>
						<div className="flex justify-center">
							<button
								onClick={() => setShowConditionPopup(false)}
								className="bg-black text-white border border-white px-2 py-1 md:px-4 md:py-2 rounded-xl hover:invert font-Special transition-all duration-200"
							>
								{messageResponse}
							</button>
						</div>
					</div>
				</div>
			)}

			{showConfirm && (
				<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 text-sm md:text-base 2xl:text-2xl opacity-0 animate-fadeInCard scale-110">
					<div className="bg-neutral-300 dark:bg-neutral-950 border border-black dark:border-white text-black dark:text-white px-3 py-5 md:px-6 md:py-10 rounded-xl w-fit h-fit shadow-lg flex flex-col gap-4 text-center transition-all duration-200">
						<div className="font-Content">{messageStatus}</div>
						<div className="flex justify-center gap-10">
							<button
								onClick={() => setShowConfirm(false)}
								className="bg-black text-white border border-white px-2 py-1 md:px-4 md:py-2 rounded-xl hover:invert font-Special transition-all duration-200"
							>
								Wait
							</button>
							<button
								onClick={handleSend}
								className="bg-white text-black border border-black px-2 py-1 md:px-4 md:py-2 rounded-xl hover:invert font-Special transition-all duration-200"
							>
								Send
							</button>
						</div>
						<div className="font-Content text-[.7em] md:text-xs 2xl:text-sm opacity-60">
							*Make sure the message doesn’t contain any sensitive information*
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Write;
