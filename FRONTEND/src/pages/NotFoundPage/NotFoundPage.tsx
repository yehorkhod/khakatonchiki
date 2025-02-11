import { Link } from "react-router-dom";
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="page container">
      <div className="not-found">
        <h1>404 - Сторінку не знайдено</h1>
        <p>Здається, ви потрапили не туди. Але нічого страшного!</p>
        <Link
          to="/"
          className="home-link"
        >
          ⬅ Повернутися на головну
        </Link>
      </div>
    </div>
  );
};
