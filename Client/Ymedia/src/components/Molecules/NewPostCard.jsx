import PropTypes from "prop-types";
import { Textarea, Card, Avatar, Button } from "flowbite-react";
import { FaUpload, FaTimes } from "react-icons/fa";

export default function NewPostCard({
  image,
  handleImageChange,
  handleImageRemove,
  username,
  profilePicture,
  caption,
  setCaption,
  onFormSubmit,
}) {
  const renderImagePreview = () => {
    if (!image) return null;

    const imageUrl =
      typeof image === "string" ? image : URL.createObjectURL(image);

    return (
      <div className="relative mb-2">
        <img src={imageUrl} alt="Preview" className="w-12 rounded-lg" />
        <button
          type="button"
          className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:bg-gray-200"
          onClick={handleImageRemove}
        >
          <FaTimes />
        </button>
      </div>
    );
  };

  return (
    <Card className="shadow-lg rounded-lg mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar
          img={profilePicture}
          rounded={true}
          alt={`${username}'s Profile`}
        />
        <h3 className="text-lg font-semibold">{username}</h3>
      </div>
      <form onSubmit={onFormSubmit}>
        <Textarea
          placeholder="What's on your mind?"
          rows={4}
          className="mb-4"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {renderImagePreview()}
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <FaUpload className="mr-2 text-gray-600" />
            <input
              type="file"
              id="file-input"
              className="sr-only"
              onChange={handleImageChange}
            />
            <span className="text-blue-500">Upload Image</span>
          </label>
          <Button disabled={caption.length === 0} type="submit" color="blue">
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
}

NewPostCard.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
  handleImageChange: PropTypes.func,
  handleImageRemove: PropTypes.func,
  username: PropTypes.string,
  profilePicture: PropTypes.string,
  caption: PropTypes.string,
  setCaption: PropTypes.func,
  onFormSubmit: PropTypes.func,
};

NewPostCard.defaultProps = {
  profilePicture: "",
};
