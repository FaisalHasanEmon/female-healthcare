import React, { useState } from "react";

const StartNewSession = () => {
  const [promptText, setPromptText] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const handleSubmitPrompt = async (e) => {
    e.preventDefault();
    const userPrompt = promptText;
    setUserPrompt(userPrompt);
    console.log(promptText);
    setPromptText("");
  };
  return (
    <section className="container   px-5 mx-auto border border-red-400 h-full relative">
      <div className="overflow-y-scroll ">
        {/* user text */}
        <div className="w-6/12 flex justify-end items-center">{userPrompt}</div>
        {/* bot text */}
        <div></div>
      </div>
      <form
        onSubmit={handleSubmitPrompt}
        className="w-8/12 mx-auto flex fixed bottom-10  border-2 rounded-xl"
      >
        <input
          type="text"
          placeholder="Enter your prompt here..."
          onChange={(e) => setPromptText(e.target.value)}
          value={promptText}
          className="grow-1 px-2 py-5 border-r bg-base-100 z-45"
        />
        <button className="px-5">Send</button>
      </form>
    </section>
  );
};

export default StartNewSession;
