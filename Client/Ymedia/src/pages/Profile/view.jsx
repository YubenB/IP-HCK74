import { useState } from "react";
import {
  Avatar,
  Spinner,
  Button,
  Card,
  Modal,
  Label,
  TextInput,
  Select,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { updateProfile } from "../../utils/api";

export default function ProfilePageView({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.user?.Profile.firstName || "",
    lastName: user.user?.Profile.lastName || "",
    bio: user.user?.bio || "",
    privacy: user.user?.Profile.privacy || "Public",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const fetchUpdate = async (formDataToSend) => {
    setLoading(true);
    try {
      const response = await updateProfile(formDataToSend);
      setIsModalOpen(false);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("privacy", formData.privacy);

    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }

    fetchUpdate(formDataToSend);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-100 relative">
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Loading" size="xl" />
        </div>
      )}
      {/* Cover Photo */}
      <div className="relative bg-blue-500 h-48 md:h-60">
        <div className="absolute bottom-[-50px] left-6">
          <Avatar
            img={user.user?.Profile.profilePicture}
            alt="User Avatar"
            rounded={true}
            size="lg"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-start md:justify-between p-6 bg-white border-b border-gray-200">
        <div className="mt-12 md:mt-0">
          <h1 className="text-2xl mt-6 font-bold">
            {user.user?.Profile.firstName
              ? `${user.user?.Profile.firstName} ${user.user?.Profile.lastName}`
              : user.user?.username}
          </h1>
          <p className="text-sm text-gray-500">@{user.user?.username}</p>
          <p className="mt-2 text-gray-700">{user.user?.Profile.bio}</p>
          <p className="text-sm text-gray-500 mt-2">
            <i className="fas fa-map-marker-alt"></i>{" "}
            {user.location || "No location"}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button color="blue" onClick={() => setIsModalOpen(true)}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Followers & Following */}
      <div className="flex gap-6 p-6 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <p className="font-bold">0</p>
          <span className="text-gray-500">Following</span>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">0</p>
          <span className="text-gray-500">Followers</span>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-4">
        {user.user?.Posts && user.user?.Posts.length > 0 ? (
          user.user?.Posts.map((post) => (
            <Card key={post.id} className="mb-4 shadow-lg">
              <Link to={`/postdetail/${post.id}`}>
                {/* First row: Avatar and username */}
                <div className="flex items-center mb-4">
                  <Avatar
                    img={user.user?.Profile.profilePicture}
                    alt="User Avatar"
                    rounded={true}
                    size="md"
                    className="w-16 h-16 object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold">{user.user.username}</h3>
                  </div>
                </div>

                {/* Second row: Caption and image */}
                <div className="ml-4">
                  <p className="text-gray-500 mb-4">{post.caption}</p>
                  {post.imgUrl && (
                    <img
                      src={post.imgUrl}
                      alt="Post Image"
                      className="rounded-lg mt-4 object-cover max-h-64 w-full"
                    />
                  )}
                </div>
              </Link>
            </Card>
          ))
        ) : (
          <p className="text-gray-600 text-center">No Posts yet</p>
        )}
      </div>

      {/* Modal for editing profile */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" value="First Name" />
                <TextInput
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName" value="Last Name" />
                <TextInput
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="bio" value="Bio" />
                <TextInput
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="privacy" value="Privacy" />
                <Select
                  id="privacy"
                  name="privacy"
                  value={formData.privacy}
                  onChange={handleChange}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="profilePicture" value="Profile Picture" />
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button type="submit" color="blue" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
