import { Link } from "react-router-dom";
import './Footer.scss';
import Vector from '../../images/Vector.svg';

export const Footer = () => {
  const scrollToTop = () => {
    document.getElementById("root")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__logo">
          <img
              src="/icons/icon.png"
              alt="icon"
              className="footer__logo--img"
            />
          </div>
          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <Link
                  to="https://github.com/yehorkhod/khakatonchiki"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="footer__nav-link"
                >
                  Github
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  to="/contacts"
                  className="footer__nav-link"
                >
                  Наші контакти
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  to="/rights"
                  className="footer__nav-link"
                >
                  Права
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer__button">
            <p className="footer__button-text">Вгору</p>
            <button
              className="button--back-to-top"
              onClick={scrollToTop}
            >
              
              {/* <Vector className="footer__back-to-top--icon" /> */}
              <img
                className="footer__back-to-top--icon"
                src={Vector}
                alt="Vector-Stroke"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}