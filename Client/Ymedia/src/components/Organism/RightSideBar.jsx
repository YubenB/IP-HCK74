export default function RightSideBar() {
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
      </div>
    </div>
  );
}
