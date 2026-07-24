import { FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="mt-8 flex w-full flex-col items-center justify-center gap-3 border-t border-[#8f00ff]/20 bg-black/30 py-6 text-sm text-white/60 sm:flex-row sm:gap-20">
      <p>
        Made with ❤️ by{' '}
        <a
          className="text-[#cc66ff] no-underline transition-colors hover:text-[#e0a3ff] hover:underline"
          href="https://github.com/Timothyb92"
        >
          Tim
        </a>
      </p>
      <p>
        <a
          className="text-[#cc66ff] no-underline transition-colors hover:text-[#e0a3ff] hover:underline"
          href="https://github.com/Timothyb92/TechCheck"
        >
          View the source code on GitHub
        </a>
      </p>
      <p>
        <a
          className="flex flex-row items-center gap-2 text-[#cc66ff] no-underline transition-colors hover:text-[#e0a3ff] hover:underline"
          href="mailto:TechCheck.gg@gmail.com"
        >
          Contact me <FaEnvelope />
        </a>
      </p>
    </footer>
  );
};
