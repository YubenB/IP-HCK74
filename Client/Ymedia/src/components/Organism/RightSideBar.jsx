import { useEffect, useState } from "react";
import { getAiResponse } from "../../utils/api";
import { useSelector } from "react-redux";

export default function RightSideBar() {
  const [aiResponse, setAiResponse] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const { isLoggedIn } = useSelector((store) => store.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchAiResponse = async () => {
        try {
          const { data } = await getAiResponse();
          console.log(data, "?????");
          setAiResponse(data.result);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAiResponse();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (aiResponse) {
      const typewriterInterval = setInterval(() => {
        setDisplayedText((prev) => prev + aiResponse[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 30);

      if (index >= aiResponse.length) {
        clearInterval(typewriterInterval);
      }

      return () => clearInterval(typewriterInterval);
    }
  }, [aiResponse, index]);

  return (
    <div className="w-1/4 bg-white p-4 border-l">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <h2 className="text-xl font-bold mb-4">People You May Know</h2>
      <div className="border-b border-gray-200 mb-6"></div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Person 1"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">Person 1</h3>
            <button
              className="text-blue-500 text-sm hover:underline"
              type="button"
            >
              Add Friend
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Person 2"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">Person 2</h3>
            <button
              className="text-blue-500 text-sm hover:underline"
              type="button"
            >
              Add Friend
            </button>
          </div>
        </div>
        <div className="border-b border-gray-200 mb-6"></div>
        {isLoggedIn && <p className="whitespace-pre-wrap">{displayedText}</p>}
      </div>
    </div>
  );
}
