import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { useParams,NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import UserSearchCard from "./UserSearchCard";
import { FiArrowUpLeft } from "react-icons/fi";
import { FaImage, FaVideo } from "react-icons/fa6";
import { logout } from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const { userId } = useParams();
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  const isOnline = onlineUser.includes(user?._id);

  const [allUser, setAllUser] = useState([]);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  const handleLogout = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/logout`;
      const response = await axios.get(URL, { withCredentials: true });

      if (response.data.success) {
        dispatch(logout());
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;
      const response = await axios.post(
        URL,
        { search: searchQuery },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to search users. Please try again.");
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr]">
      <div className="bg-slate-100 w-12 rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          <div
            title="add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <div className="relative w-9 h-9">
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt="Profile"
                className="rounded-full w-full h-full object-cover border border-gray-700"
              />
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
          </button>
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            onClick={handleLogout}
          >
            <span className="-ml-2">
              <BiLogOut size={25} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center justify-around p-1 ">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text cursor-pointer">
            BuzzChat
          </h2>
          <form onSubmit={handleSearch} className="flex items gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users"
              className="py-1 px-2 border border-gray-300 rounded focus:outline-2 focus:ring-1 focus:ring-primary"
            />
          </form>
        </div>

        <div className="bg-slate-500 p-[0.5px]"></div>

        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <UserSearchCard
                key={user._id}
                user={user}
                onClose={() => setSearchResults([])}
              />
            ))
          ) : (
            <>
              {allUser.length === 0 && (
                <div className="mt-12">
                  <div className="flex justify-center items-center my-4 text-slate-500">
                    <FiArrowUpLeft size={50} />
                  </div>
                  <p className="text-lg text-center text-slate-400">
                    Explore users to start a conversation with.
                  </p>
                </div>
              )}

              {allUser.map((conv, index) => (
                // In your NavLink or similar component where long text is displayed
                <NavLink
                  to={`/home/${conv?.userDetails?._id}`}
                  key={conv?._id}
                  className={`flex items-center gap-2 py-3 px-2 border border-transparent rounded cursor-pointer hover:bg-slate-100 ${
                    conv?.userDetails?._id === userId ? "bg-slate-200" : ""
                  }`}
                >
                  <div className="relative w-10 h-10">
                    <img
                      src={
                        conv?.userDetails?.profilePic || "/default-avatar.png"
                      }
                      alt="Profile"
                      className="rounded-full w-full h-full object-cover border border-gray-700"
                    />
                    {onlineUser.includes(conv?.userDetails?._id) && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-ellipsis overflow-hidden whitespace-nowrap">
                      {conv?.userDetails?.name}
                    </h3>
                    <div className="text-slate-600 text-sm flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {conv?.lastMsg?.imageUrl && (
                          <div className="flex items-center gap-1">
                            <span>
                              <FaImage />
                            </span>
                            {!conv?.lastMsg?.text && <span>Image</span>}
                          </div>
                        )}
                        {conv?.lastMsg?.videoUrl && (
                          <div className="flex items-center gap-1">
                            <span>
                              <FaVideo />
                            </span>
                            {!conv?.lastMsg?.text && <span>Video</span>}
                          </div>
                        )}
                      </div>
                      <p className="truncate max-w-[200px]">
                        {conv?.lastMsg?.text}
                      </p>
                    </div>
                  </div>
                  {Boolean(conv?.unseenMsg) && (
                    <p className="text-xs w-4 h-4 flex justify-center items-center ml-auto p-1 bg-green-400 text-white font-semibold rounded-full">
                      {conv?.unseenMsg}
                    </p>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>

      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
