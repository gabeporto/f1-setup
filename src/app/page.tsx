import '@fontsource-variable/exo-2';
import { FaLinkedin } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white flex-col relative">
      <h1 className="text-5xl font-bold">🏁🏎️💨</h1>
      <h1 className="text-9xl font-bold" style={{ fontFamily: "'Exo 2 Variable', sans-serif" }}>
        F1 SETUP
      </h1>
      <p className="text-lg text-gray-500 mt-2" style={{ fontFamily: "'Exo 2 Variable', sans-serif" }}>
        by Gabriel Porto
      </p>

      <a
        href="https://www.linkedin.com/in/gabeporto"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        <FaLinkedin className="mr-2" />
        LinkedIn
      </a>
    </div>
  );
}
