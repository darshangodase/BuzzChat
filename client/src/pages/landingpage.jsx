import React, { useState } from 'react';
import { MessageCircle, Zap, Lock, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpeg'
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../components/footer';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
   
  const handleGetStarted = () => {
    navigate('/login-email');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="chat app image" className="h-12 w-12" />
        <span className="text-2xl font-bold text-indigo-600">BuzzChat</span>
        </Link>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="md:flex space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 font-sans text-lg font-semibold ">
              <li><a href="#features" className="text-gray-700 hover:text-indigo-600 transition duration-300">Features</a></li>
              <li><a href="#about" className="text-gray-700 hover:text-indigo-600 transition duration-300">About</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-indigo-600 transition duration-300">Contact</a></li>
              <li>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-indigo-600" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      <div className="bg-white py-8"></div>

      <main className=''>
        <section className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl font-bold mb-6 text-indigo-800">Connect Instantly with BuzzChat</h1>
          <p className="text-xl mb-8 text-gray-700">Experience seamless, secure, and free messaging with friends and family.</p>
          <button onClick={handleGetStarted}className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg">
            Get Started
          </button>
        </section>

        <section id="features" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">Why Choose BuzzChat ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
                <Zap className="h-12 w-12 text-indigo-600 mb-4 mx-auto"/>
                <h3 className="text-xl font-semibold mb-2 text-indigo-800">Lightning Fast</h3>
                <p className=" text-center text-gray-700">Experience real-time messaging with zero lag.</p>
              </div>
              <div className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
                <Lock className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-purple-800">Secure Chats</h3>
                <p className="text-center text-gray-700">Your conversations are protected with end-to-end encryption.</p>
              </div>
              <div className=" flex flex-col items-center bg-gradient-to-br from-pink-50 to-indigo-50 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
                <MessageCircle className="h-12 w-12 text-pink-600 mb-4 "/>
                <h3 className="text-xl font-semibold mb-2 text-pink-800">User-Friendly</h3>
                <p className="text-gray-700 text-center">Intuitive interface for effortless communication.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-14 mb-16 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">About BuzzChat</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0 ">
                <img src={logo} alt="chat app image" className="rounded-lg mx-auto" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <p className="text-lg text-gray-700 mb-6">
                  BuzzChat was born from a simple idea: everyone deserves access to free, secure, and efficient communication. 
                  We've created a platform that brings people together, no matter where they are in the world.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our commitment to privacy and user experience drives everything we do. Join us in making the world a more 
                  connected place, one message at a time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;