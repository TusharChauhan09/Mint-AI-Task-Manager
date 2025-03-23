import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

const ImageGenerator = () => {
  const [url, setUrl] = useState(null);
  const [imgq, setImgq] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const imgCall = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/imageGen", {
        question: imgq,
      });
      if (res.data.success) {
        setUrl(res.data.data.url);
        setImgq("");
      } else {
        setError(res.data.error);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setError(error.response?.data?.error || "Failed to generate image");
      setUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Image Generator
        </h2>
        <div className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          AI Powered
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={imgq}
            onChange={(e) => setImgq(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     transition-all duration-300 pl-12"
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <Button
          onClick={imgCall}
          disabled={loading || !imgq.trim()}
          loading={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                   text-white rounded-xl font-medium shadow-lg
                   hover:from-blue-600 hover:to-purple-700 
                   focus:ring-4 focus:ring-purple-200 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform transition-all duration-300 hover:-translate-y-1"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Generating...
            </div>
          ) : (
            "Generate Image"
          )}
        </Button>

        <div
          className="relative min-h-[300px] rounded-2xl bg-gray-50 p-6 
                      border-2 border-dashed border-gray-200 
                      transition-all duration-300 hover:border-blue-300"
        >
          {url ? (
            <img
              src={url}
              alt="Generated"
              className="max-w-full max-h-[400px] rounded-xl shadow-lg 
                       transform transition-all duration-500 hover:scale-[1.02]"
            />
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">No image generated yet</p>
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

export default ImageGenerator;
