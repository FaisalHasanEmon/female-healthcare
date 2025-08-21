import { useState, useRef, useEffect } from "react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate AI response
  const generateAIResponse = async (userMessage) => {
    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    // Simple response simulation
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective on that:",
      "Great question! Based on what you've shared, I'd suggest:",
      "I can help you with that. Here's what I think:",
      "That's a good point. Let me provide some insights:",
      "I see what you mean. Here's how I'd approach this:",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    // Add some context-aware responses
    if (
      userMessage.toLowerCase().includes("hello") ||
      userMessage.toLowerCase().includes("hi")
    ) {
      return "Hello! How can I help you today?";
    }
    if (userMessage.toLowerCase().includes("help")) {
      return "I'm here to help! What specific question or topic would you like assistance with?";
    }
    if (
      userMessage.toLowerCase().includes("thanks") ||
      userMessage.toLowerCase().includes("thank you")
    ) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    return `${randomResponse}\n\nYou mentioned: "${userMessage}"\n\nThis is a simulated response. In a real implementation, this would be connected to an AI service like OpenAI's GPT API or similar.`;
  };

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    const messageId = Date.now();

    // Add user message
    const newUserMessage = {
      id: messageId,
      text: userMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage);

      // Add AI message
      const newAIMessage = {
        id: messageId + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      // Add error message
      const errorMessage = {
        id: messageId + 1,
        text: "Sorry, I encountered an error while processing your message. Please try again.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const MessageBubble = ({ message: msg }) => {
    const isUser = msg.sender === "user";

    return (
      <div
        className={`flex w-full mb-4 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex max-w-[80%] ${
            isUser ? "flex-row-reverse" : "flex-row"
          } items-end gap-3 `}
        >
          {/* Avatar */}
          {/* <div
            className={`avatar placeholder flex-shrink-0 ${
              isUser ? "ml-2" : "mr-2"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full text-white text-sm font-medium flex items-center justify-center ${
                isUser
                  ? "bg-blue-500"
                  : msg.isError
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {isUser ? "U" : "AI"}
            </div>
          </div> */}

          {/* Message Content */}
          <div
            className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-full word-wrap ${
                isUser
                  ? "bg-brandPrimary/70 text-white font-medium rounded-br-sm"
                  : msg.isError
                  ? "bg-red-100 text-red-800 border border-red-200 rounded-bl-sm"
                  : "bg-brandSecondary/70 text-gray-800 rounded-bl-sm"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.text}
              </p>
            </div>
            {/* <span className="text-xs text-gray-500 mt-1 px-2">
              {msg.timestamp}
            </span> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 flex flex-col bg-gray-50">
      {/* Chat Container */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative">
        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                How can I help you today?
              </h2>
              <p className="text-gray-600 max-w-md">
                Start a conversation by typing a message below. I'm here to help
                with questions, provide information, or just have a chat!
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="avatar placeholder flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white text-sm font-medium flex items-center justify-center">
                        AI
                      </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="px-2 pb-4 pt-2 fixed bottom-0  min-w-full max-w-full  lg:min-w-4xl lg:max-w-4xl">
          {/* <div className="relative"> */}
          <div className="relative">
            {/* Input Field Container */}
            <div className="relative bg-brandPrimary py-2 px-2 flex items-end border border-gray-300 rounded-[14px] shadow-lg hover:shadow-xl transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="How Can Fenyx Help You?"
                className="flex-1 resize-none border-none outline-none bg-transparent px-4 py-3 text-gray-700 placeholder-white text-base leading-6 max-h-48 min-h-12"
                rows={1}
                style={{ height: "auto" }}
                disabled={isLoading}
              />

              {/* Send Button */}
              <div className="flex items-center p-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!message.trim() || isLoading}
                  className={`btn btn-circle btn-sm transition-all duration-200 ${
                    message.trim() && !isLoading
                      ? "btn-secondary hover:btn-primary-focus shadow-md hover:shadow-lg"
                      : "btn-disabled bg-gray-200 border-gray-200"
                  }`}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;
