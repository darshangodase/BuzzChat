import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft, FaPlus, FaImage, FaVideo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import moment from "moment";
import { ProgressBar } from 'react-loader-spinner';
import uploadFile from "../helpers/uploadFile";
import backgroundImage from "../assets/wallapaper.jpeg";

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector((state) => state?.user);
  const messageIds = useRef(new Set());
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profilePic: "",
    online: false,
    _id: "",
  });
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [allMessages,params.userId]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.emit("seen", params.userId);

      socketConnection.on("message-user", (data) => setDataUser(data));

      const handleMessage = (data) => {
        data.forEach((msg) => {
          const isConversationMessage =
            (msg.msgByUserId === params.userId &&
              msg.receiverId === user?._id) ||
            (msg.msgByUserId === user?._id && msg.receiverId === params.userId);

          // Only add messages if they are part of the current conversation
          if (isConversationMessage && !messageIds.current.has(msg._id)) {
            messageIds.current.add(msg._id); // Track the message to prevent duplicate
            setAllMessages((prevMessages) => [...prevMessages, msg]);
          }
        });
      };

      socketConnection.on("message", handleMessage);

      return () => {
        setAllMessages([]);
        messageIds.current.clear();
        socketConnection.off("message", handleMessage);
        socketConnection.off("message-user");
      };
    }
  }, [socketConnection, params.userId, user]);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    setLoading(true);

    try {
      const uploadResult = await uploadFile(file);
      setMessage((prev) => ({
        ...prev,
        [`${type}Url`]: uploadResult.url,
      }));
      setOpenImageVideoUpload(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => ({
      ...prev,
      videoUrl: "",
    }));
  };

  const handleClearUploadImage = () => {
    setMessage((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setMessage((prev) => ({ ...prev, text: value }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
        setMessage({ text: "", imageUrl: "", videoUrl: "" });
      }
    }
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
  };

  const handleCloseModal = () => {
    setModalContent(null);
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover"
    >
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/home"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div className="relative w-10 h-10">
            <img
              src={dataUser?.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="rounded-full w-full h-full object-cover border border-gray-700"
            />
            {dataUser.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg my-1">{dataUser?.name}</h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

      </header>

      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/**all message show here */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMessage}>
          {allMessages.map((msg, index) => {
            return (
              <div
                key={index}
                className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                  user._id === msg?.msgByUserId
                    ? "ml-auto bg-teal-100"
                    : "bg-white"
                }`}
              >
                <div className="w-full relative">
                  {msg?.imageUrl && (
                    <img
                      src={msg?.imageUrl}
                      className="w-full h-full object-scale-down cursor-pointer"
                      onClick={() => handleOpenModal(<img src={msg.imageUrl} alt="uploaded content" className="w-full h-full object-scale-down" />)}
                    />
                  )}
                  {msg?.videoUrl && (
                    <video
                      src={msg.videoUrl}
                      className="w-full h-full object-scale-down cursor-pointer"
                      controls
                      onClick={() => handleOpenModal(<video src={msg.videoUrl} controls className="w-full h-full object-scale-down" />)}
                    />
                  )}
                </div>
                <p className="px-2 break-words">{msg.text}</p>
                <p className="text-xs ml-auto w-fit">
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
        </div>

        {/**upload Image display */}
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadImage}
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}

        {/**upload video display */}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadVideo}
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
            <ProgressBar
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </section>

      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button
            onClick={handleUploadImageVideoOpen}
            className="flex justify-center items-center w-11 h-11 rounded-full"
          >
            <FaPlus size={20} />
          </button>

          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <label
                htmlFor="uploadImage"
                className="flex items-center p-2 cursor-pointer"
              >
                <FaImage size={18} className="text-primary" />
                <span className="ml-2">Image</span>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center p-2 cursor-pointer"
              >
                <FaVideo size={18} className="text-purple-500" />
                <span className="ml-2">Video</span>
              </label>
              <input
                type="file"
                id="uploadImage"
                onChange={(e) => handleUpload(e, "image")}
                className="hidden"
              />
              <input
                type="file"
                id="uploadVideo"
                onChange={(e) => handleUpload(e, "video")}
                className="hidden"
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex w-full h-full gap-2">
          <input
            type="text"
            placeholder="Type here message..."
            className="py-1 px-4 outline-none w-full"
            value={message.text}
            onChange={handleOnChange}
          />
          <button type="submit" className="text-primary hover:text-secondary">
            <IoMdSend size={28} />
          </button>
        </form>
      </section>

      {modalContent && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
     <button
        className="absolute top-2 right-2 text-white "
        onClick={handleCloseModal}
      >
        <IoClose size={30}  />
      </button>
    <div className="relative p-4 rounded max-w-full max-h-full overflow-auto">
      
      <div className="flex justify-center items-center max-w-screen max-h-screen">
        {React.cloneElement(modalContent, {
          className: "w-full h-full max-w-screen-sm max-h-[80vh] object-contain",
        })}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MessagePage;