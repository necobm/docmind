import { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`max-w-3xl ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
        } rounded-lg px-4 py-3 shadow-sm`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Sources:
            </div>
            <div className="space-y-2">
              {message.citations.map((citation, idx) => (
                <div
                  key={idx}
                  className="text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {citation.title}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {citation.excerpt}
                  </div>
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 text-xs hover:underline mt-1 inline-block"
                    >
                      View source →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`text-xs mt-2 ${
            isUser ? "text-indigo-200" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
