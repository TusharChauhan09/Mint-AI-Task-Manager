import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Button from "./Button";

const TextGenerator = () => {
  const [content, setContent] = useState(null);
  const [textq, setTextq] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const textCall = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/chatGen", {
        question: textq,
      });
      if (res.data.success) {
        setContent(res.data.message);
        setTextq("");
      } else {
        setError(res.data.error);
      }
    } catch (error) {
      console.error("Error fetching text:", error);
      setError(error.response?.data?.error || "Failed to generate text");
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Text Generator
        </h2>
        <div className="ml-auto px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
          Taskly AI
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <textarea
            value={textq}
            onChange={(e) => setTextq(e.target.value)}
            placeholder="Ask me anything about task management..."
            rows="3"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl 
                     focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 
                     transition-all duration-300 pl-12 resize-none"
          />
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>

        <Button
          onClick={textCall}
          disabled={loading || !textq.trim()}
          loading={loading}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 
                   text-white rounded-xl font-medium shadow-lg
                   hover:from-green-600 hover:to-teal-700 
                   focus:ring-4 focus:ring-green-200 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform transition-all duration-300 hover:-translate-y-1"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing...
            </div>
          ) : (
            "Generate Response"
          )}
        </Button>

        <div
          className="rounded-2xl bg-gray-50 p-6 min-h-[300px]
                      border-2 border-dashed border-gray-200 
                      transition-all duration-300 hover:border-green-300"
        >
          {content ? (
            <div className="space-y-4">
              <div className="prose prose-green max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                <div className="text-sm text-gray-500">
                  Generated at: {new Date().toLocaleTimeString()}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(content)}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="text-sm">Ask me anything about task management</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl 
                      flex items-center animate-fadeIn"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
