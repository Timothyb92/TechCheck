import { FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="mt-8 flex w-full flex-col items-center justify-center gap-3 border-t border-[#334155] bg-[#0f172a] py-6 text-sm text-[#d1d5db] sm:flex-row sm:gap-20">
      <p>
        Made with ❤️ by{' '}
        <a
          className="text-[#60a5fa] no-underline hover:underline"
          href="https://github.com/Timothyb92"
        >
          Tim
        </a>
      </p>
      <p>
        <a
          className="text-[#60a5fa] no-underline hover:underline"
          href="https://github.com/Timothyb92/TechCheck"
        >
          View the source code on GitHub
        </a>
      </p>
      <p>
        <a
          className="flex flex-row gap-2 text-[#60a5fa] no-underline hover:underline"
          href="mailto:TechCheck.gg@gmail.com"
        >
          Contact me <FaEnvelope />
        </a>
      </p>
    </footer>
  );
};
