import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-[1000px] mx-auto px-4 text-center">
        <p className="text-sm mb-4">
          Built by{' '}
          <a
            href="https://osd-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Jodi Yirenkyi
          </a>
        </p>
        <div className="flex justify-center space-x-6 text-xl">
          <a
            href="https://github.com/JodiKKY"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/jodiyirenkyi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/JodiKKY"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
