import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">



      <div className="container   p-5 justify-center flex">



        <div>
          
          <p className="mt-2 flex justify-center p-5">
          {/* Icons with links */}
        <a href="https://github.com/RachitSahu26" target="_blank" rel="noopener noreferrer" className="mr-4      duration-300 ease-in-out transform hover:scale-90 ">
          <FaGithub size={40} />
        </a>
        <a href="https://www.instagram.com/v_rs.26/" target="_blank" rel="noopener noreferrer" className="mr-4   duration-300 ease-in-out transform hover:scale-90 ">
          <FaInstagram size={40} />
        </a>
        <a href="https://www.linkedin.com/in/rachit-sahu-004ba2255/" target="_blank" rel="noopener noreferrer" className="mr-4  duration-300 ease-in-out transform hover:scale-90 ">
          <FaLinkedin size={40} />
        </a>
        <a href="https://twitter.com/Rachit_Saahu" target="_blank" rel="noopener noreferrer" className=' duration-300 ease-in-out transform hover:scale-90 '>
          <FaTwitter size={40} />
        </a>
          </p>
            <h3 className="text-xl font-semibold">Developed by Rachit Sahu</h3>

        </div>

      </div>



    </footer>
  );
};

export default Footer;
