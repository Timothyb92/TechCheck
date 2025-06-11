import { FaEnvelope } from 'react-icons/fa';

import './footer.styles.css';

export const Footer = () => {
  return (
    <footer className="footer-text">
      <p>
        Made with ❤️ by <a href="https://github.com/Timothyb92">Tim</a>
      </p>
      <p>
        <a href="https://github.com/Timothyb92/TechCheck">
          View the source code on GitHub
        </a>
      </p>
      <p>
        <a href="mailto:TechCheck.gg@gmail.com">
          Contact me <FaEnvelope />
        </a>
      </p>
    </footer>
  );
};
