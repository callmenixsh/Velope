import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

	const fontOptions = [
		"font-Message1",
		"font-Message2",
		"font-Message3",
		"font-Message4",
		"font-Message5",
		"font-Message6",
		"font-Message7",
	];

	const [selectedFont, setSelectedFont] = useState("font-Message3");
	const [selectedColor, setSelectedColor] = useState("#FFD5D5");
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);
	const { name } = useParams();
	const editorRef = useRef(null);
	const navigate = useNavigate();

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
	const [showSentAnimation, setShowSentAnimation] = useState(false);

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
		} else if (messageLength > 222) {
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
			setMessage("");
			setMessageLength(0);
			document.querySelector("[contenteditable]").innerHTML = "";
			setShowSentAnimation(true);
			setTimeout(() => {
				setShowSentAnimation(false);
				navigate(`/read/${name}`);
			}, 2200);
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
		if (plainText.length > 222) {
			newMessage = newMessage.slice(0, 222);
		}
		setMessage(newMessage);
		setMessageLength(plainText.length);
	};

	const [cardDims, setCardDims] = useState(() => {
		const width = window.innerWidth;
		if (width >= 768) return { w: 384, h: 352, p: 40 }; // md: 24rem x 22rem x 2.5rem
		return { w: 256, h: 288, p: 16 }; // base: 16rem x 18rem x 1rem
	});

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width >= 768) setCardDims({ w: 384, h: 352, p: 40 });
			else setCardDims({ w: 256, h: 288, p: 16 });
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className="flex flex-col items-center my-12 md:my-8 px-4">
			<div className="flex flex-col items-center gap-4 md:gap-5 w-full">
				   <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
					   {/* Persist random card shape for the session */}
					   {(() => {
						   const [cardNum] = React.useState(() => Math.floor(Math.random() * 3) + 1);
						   const cardUrl = `/assets/card${cardNum}.png`;
						   const cardStyle = {
							   color: "black",
							   backgroundImage: `linear-gradient(${selectedColor}, ${selectedColor}), url(/assets/paper-texture.png)`,
							   backgroundSize: "100% 100%",
							   backgroundRepeat: "no-repeat",
							   backgroundPosition: "center",
							   backgroundBlendMode: "multiply",
							   WebkitMaskImage: `url(${cardUrl})`,
							   maskImage: `url(${cardUrl})`,
							   WebkitMaskSize: "100% 100%",
							   maskSize: "100% 100%",
							   WebkitMaskRepeat: "no-repeat",
							   maskRepeat: "no-repeat",
							   WebkitMaskPosition: "center",
							   maskPosition: "center",
							   width: "20rem",
							   height: "22.86rem",
							   padding: "2rem",
							   position: "relative",
							   ...(window.innerWidth >= 768 ? {
								   width: "28rem",
								   height: "32rem",
								   padding: "2.8rem"
							   } : {}),
						   };
						   return (
							   <div
								   className={`velope-full-card ${selectedFont} transition-all duration-500 w-64 h-[18rem] md:w-96 md:h-[22rem] xl:w-[28rem] xl:h-[32rem] p-4 md:p-10 xl:p-14`}
								   style={cardStyle}
							   >
								   <div className="flex select-none text-base md:text-2xl ">
									   <div>To:</div> <div className="ml-2">{name}</div>
								   </div>
								   <div
									   ref={editorRef}
									   contentEditable
									   suppressContentEditableWarning={true}
									   onInput={handleInput}
									   onPaste={e => {
										   // Prevent image files from being pasted
										   if (e.clipboardData && e.clipboardData.items) {
											   for (let i = 0; i < e.clipboardData.items.length; i++) {
												   if (e.clipboardData.items[i].type.startsWith('image/')) {
													   e.preventDefault();
													   return;
												   }
											   }
										   }
										   // Prevent pasted HTML images
										   const html = e.clipboardData && e.clipboardData.getData('text/html');
										   if (html && /<img\s/i.test(html)) {
											   e.preventDefault();
											   // Optionally, paste as plain text:
											   const text = e.clipboardData.getData('text/plain');
											   document.execCommand('insertText', false, text);
										   }
									   }}
									   className="w-full h-full rounded-md p-2 focus:outline-none text-sm md:text-xl overflow-y-auto break-words [overflow-wrap:anywhere] [word-break:break-word]"
									   aria-label="Write your message"
									   style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word" }}
								   ></div>
								   {/* Send button inside card, bottom right, with sendbg.png mask */}
								   <button
									   onClick={handleConfirmPopup}
									   className="absolute bottom-6 right-6 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 focus:outline-none"
									   style={{
										   width: '4.5rem',
										   height: '4.5rem',
										   background: 'url(/assets/sendbg.png) center/contain no-repeat',
										   bottom: '1rem',
										   right: '2rem',
										   border: 'none',
										   outline: 'none',
										   padding: 0,
										   cursor: 'pointer',
									   }}
									   aria-label="Send message"
								   >
									   <img src="/assets/icons/message.svg" alt="Send" className="w-8 h-8 pointer-events-none" />
								   </button>
								   <div className="absolute bottom-12 left-10 type-meta">
									   {formattedDate}
								   </div>
								   <div className="absolute bottom-8 left-10 type-micro opacity-70 font-Content">
									   <span
										   style={{
											   color: messageLength > 200 ? "red" : "inherit",
										   }}
									   >
										   {messageLength}/222
									   </span>
								   </div>
							{/* Sent animation overlay */}
							{showSentAnimation && (
								<div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 animate-fadeInCard">
									<div className="relative flex flex-col items-center">
										<div className="w-[10rem] h-[10rem] animate-bounce-sent flex items-center justify-center">
											<img src="/assets/icons/message.svg" alt="Sent" className="w-24 h-24 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 16px #fff8) drop-shadow(0 0 32px #ffb6c1)' }} />
										</div>
										<div className="mt-6 text-3xl font-extrabold text-white drop-shadow-lg animate-fadeInCard">Delivered!</div>
										<div className="mt-2 text-lg font-medium text-white/80 animate-fadeInCard">Your letter is on its way...</div>
									</div>
								</div>
							)}
						</div>
						);
					// Animation keyframes for message delivery
					// Add to your global CSS if not present:
					// @keyframes bounce-sent {
					//   0%, 100% { transform: translateY(0); }
					//   20% { transform: translateY(-18px); }
					//   40% { transform: translateY(-32px) scale(1.08); }
					//   60% { transform: translateY(-12px); }
					//   80% { transform: translateY(-24px) scale(1.04); }
					// }
					// .animate-bounce-sent { animation: bounce-sent 1.2s cubic-bezier(.6,-0.28,.74,.05) 1; }
					   })()}
					   <div className="grid grid-cols-6 md:grid-cols-1 gap-2 mt-1 md:mt-0">
						   {colors.map((color, index) => {
							   const isSelected = selectedColor === color;
							   return (
								   <button
									   type="button"
									   key={index}
									   className={`w-7 h-7 md:w-9 md:h-9 border-[0.5px] md:border-1 dark:border-white cursor-pointer transition-all duration-150 hover:scale-110 ${
										   isSelected ? "ring-2 ring-black/50 dark:ring-white/60 ring-offset-1 ring-offset-neutral-100 dark:ring-offset-neutral-900" : ""
									   }`}
									   style={{
										   backgroundColor: color,
										   WebkitMaskImage: 'url(/assets/colorprev.png)',
										   maskImage: 'url(/assets/colorprev.png)',
										   WebkitMaskSize: '100% 100%',
										   maskSize: '100% 100%',
										   WebkitMaskRepeat: 'no-repeat',
										   maskRepeat: 'no-repeat',
										   WebkitMaskPosition: 'center',
										   maskPosition: 'center',
									   }}
									   onClick={() => setSelectedColor(color)}
									   aria-label={`Select color ${index + 1}`}
								   />
							   );
						   })}
					   </div>
				</div>

				<div className="flex justify-center items-center gap-2 type-body w-full">
					   <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center max-w-[320px] md:max-w-[450px]">
						   {fontOptions.map((fontOption) => (
							   <button
								   type="button"
								   key={fontOption}
								   onClick={() => setSelectedFont(fontOption)}
								   className={`min-w-9 px-1.5 md:px-2 border transition-all duration-150 hover:scale-110 focus:outline-none ${
									   selectedFont === fontOption
										   ? "bg-black text-white dark:bg-white dark:text-black"
										   : ""
								   } ${fontOption}`}
								   style={{
									   WebkitMaskImage: 'url(/assets/textprev.png)',
									   maskImage: 'url(/assets/textprev.png)',
									   WebkitMaskSize: '100% 100%',
									   maskSize: '100% 100%',
									   WebkitMaskRepeat: 'no-repeat',
									   maskRepeat: 'no-repeat',
									   WebkitMaskPosition: 'center',
									   maskPosition: 'center',
									   backgroundColor: selectedFont === fontOption ? 'black' : 'white',
									   color: selectedFont === fontOption ? 'white' : 'black',
								   }}
							   >
								   Abc
							   </button>
						   ))}
					   </div>
				</div>
			</div>

			{showConditionPopup && (
				<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 type-heading opacity-0 animate-fadeInCard scale-110">
					   <div
						   className="text-black font-bold px-3 py-5 md:px-6 md:py-10 w-fit h-fit flex flex-col gap-4 text-center transition-all duration-200"
						   style={{
							   background: 'linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)), url(/assets/paper-texture.png)',
							   backgroundBlendMode: 'multiply',
							   width: '28rem',
							   height: '18rem',
							   WebkitMaskImage: 'url(/assets/popup.png)',
							   maskImage: 'url(/assets/popup.png)',
							   WebkitMaskSize: '100% 100%',
							   maskSize: '100% 100%',
							   WebkitMaskRepeat: 'no-repeat',
							   maskRepeat: 'no-repeat',
							   WebkitMaskPosition: 'center',
							   maskPosition: 'center',
							   position: 'relative',
							   display: 'flex',
							   alignItems: 'center',
							   justifyContent: 'center',
							   padding: '2.5rem',
							   boxSizing: 'border-box',
						   }}
					   >
						<div className="font-Content">{messageStatus}</div>
						<div className="flex justify-center">
							   <button
								   onClick={() => setShowConditionPopup(false)}
								   className="text-white font-bold font-Special transition-all duration-200"
								   style={{
									   width: '15rem',
									   height: '2.7rem',
									   background: 'linear-gradient(rgba(0,0,0,0.60),rgba(0,0,0,0.60)), url(/assets/paper-texture.png)',
									   backgroundBlendMode: 'multiply',
									   WebkitMaskImage: 'url(/assets/longstrip.png)',
									   maskImage: 'url(/assets/longstrip.png)',
									   WebkitMaskSize: '100% 100%',
									   maskSize: '100% 100%',
									   WebkitMaskRepeat: 'no-repeat',
									   maskRepeat: 'no-repeat',
									   WebkitMaskPosition: 'center',
									   maskPosition: 'center',
									   border: 'none',
									   outline: 'none',
									   padding: 0,
									   fontSize: '1.15rem',
									   boxShadow: '0 4px 18px 0 rgba(0,0,0,0.22), 0 1.5px 6px 0 rgba(0,0,0,0.18)',
								   }}
							   >
								   {messageResponse}
							   </button>
						</div>
					</div>
				</div>
			)}

			{showConfirm && (
				<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 type-heading opacity-0 animate-fadeInCard scale-110">
					   <div
						   className="text-black font-bold px-3 py-5 md:px-6 md:py-10 w-fit h-fit flex flex-col gap-4 text-center transition-all duration-200"
						   style={{
							   background: 'linear-gradient(rgba(0,0,0,0.32),rgba(0,0,0,0.32)), url(/assets/paper-texture.png)',
							   backgroundBlendMode: 'multiply',
							   width: '28rem',
							   height: '18rem',
							   WebkitMaskImage: 'url(/assets/popup.png)',
							   maskImage: 'url(/assets/popup.png)',
							   WebkitMaskSize: '100% 100%',
							   maskSize: '100% 100%',
							   WebkitMaskRepeat: 'no-repeat',
							   maskRepeat: 'no-repeat',
							   WebkitMaskPosition: 'center',
							   maskPosition: 'center',
							   position: 'relative',
							   display: 'flex',
							   alignItems: 'center',
							   justifyContent: 'center',
							   padding: '2.5rem',
							   boxSizing: 'border-box',
						   }}
					   >
						<div className="font-Content font-bold text-black">{messageStatus}</div>
						<div className="flex justify-center gap-10">
							   <button
								   onClick={() => setShowConfirm(false)}
								   className="text-black font-bold font-Special transition-all duration-200"
								   style={{
									   width: '8.5rem',
									   height: '2.7rem',
									   background: 'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url(/assets/paper-texture.png)',
									   backgroundBlendMode: 'multiply',
									   WebkitMaskImage: 'url(/assets/longstrip.png)',
									   maskImage: 'url(/assets/longstrip.png)',
									   WebkitMaskSize: '100% 100%',
									   maskSize: '100% 100%',
									   WebkitMaskRepeat: 'no-repeat',
									   maskRepeat: 'no-repeat',
									   WebkitMaskPosition: 'center',
									   maskPosition: 'center',
									   border: 'none',
									   outline: 'none',
									   padding: 0,
									   fontSize: '1.15rem',
								   }}
							   >
								   Wait
							   </button>
							   <button
								   onClick={handleSend}
								   className="text-white font-Special transition-all duration-200"
								   style={{
									   width: '8.5rem',
									   height: '2.7rem',
									   background: 'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url(/assets/paper-texture.png)',
									   backgroundBlendMode: 'multiply',
									   WebkitMaskImage: 'url(/assets/longstrip.png)',
									   maskImage: 'url(/assets/longstrip.png)',
									   WebkitMaskSize: '100% 100%',
									   maskSize: '100% 100%',
									   WebkitMaskRepeat: 'no-repeat',
									   maskRepeat: 'no-repeat',
									   WebkitMaskPosition: 'center',
									   maskPosition: 'center',
									   border: 'none',
									   outline: 'none',
									   padding: 0,
									   fontSize: '1.15rem',
								   }}
							   >
								   Send
							   </button>
						</div>
						<div className="font-Content type-meta opacity-60">
							*Make sure the message doesn’t contain any sensitive information*
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Write;
