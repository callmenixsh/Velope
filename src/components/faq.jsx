import React from "react";

const FAQ = () => (
  <section className="w-full flex justify-center mt-42 md:mt-50">
    <div
      className="w-[95%] xl:w-[80%] 2xl:w-[1500px] max-w-3xl mx-auto p-6 md:p-10 mb-8 relative overflow-hidden min-h-[500px]"
      style={{
        backgroundImage: 'url(/assets/paper.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="font-Heading type-title text-2xl md:text-3xl mb-6 text-center text-yellow-900 drop-shadow-sm">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-7 type-body text-yellow-900">
        <div>
          <strong className="block mb-1 text-base md:text-lg font-semibold">What is Velope?</strong>
          <p>Velope is a quiet place to leave words for anyone. No logins. No names. Just open letters, floating in the web.</p>
        </div>
        <div>
          <strong className="block mb-1 text-base md:text-lg font-semibold">Do I need to create an account?</strong>
          <p>No. Velope is anonymous and does not require any sign up or login.</p>
        </div>
        <div>
          <strong className="block mb-1 text-base md:text-lg font-semibold">Can I send a letter to anyone?</strong>
          <p>Yes! Just enter a name and write your message. Anyone can read or write to any name.</p>
        </div>
        <div>
          <strong className="block mb-1 text-base md:text-lg font-semibold">Are messages private?</strong>
          <p>No, all messages are public and visible to anyone who knows the name.</p>
        </div>
        <div>
          <strong className="block mb-1 text-base md:text-lg font-semibold">Can I delete a message?</strong>
          <p>Currently, messages cannot be deleted. Please write with kindness.</p>
        </div>
        <div>
          <strong className="block mb-1 text-base md:text-lg font-semibold">How do comments (gossips) work?</strong>
          <p>Only the last 5 comments are kept for each letter. When a new comment is added, the oldest one disappears—just like real gossips, the old ones fade away.</p>
        </div>
      </div>
    </div>
  </section>
);

export default FAQ;
