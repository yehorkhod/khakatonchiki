import React from 'react';
import './ProfileQuestCompleted.scss';
import { Quest } from '../../types/quest';
import { Link } from 'react-router-dom';

type Props = {
  quest: Quest;
};

export const ProfileQuestCompleted: React.FC<Props> = ({ quest }) => {
  return (
    <div
      key={quest.id}
      className="quest-card"
    >
      <Link
        to="/"
        // to={`/${product.category}/${product.itemId}`}
        className="card__header--title"
      >
        {quest.title}
      </Link>
      <div className="card__description">{quest.description}</div>
      <div className="card__char">
        <div className="card__char--row">
          <span className="card__char--row--name">Tasks:</span>
          <span className="card__char--row--value">{quest.taskCount}</span>
        </div>
        <div className="card__char--row">
          <span className="card__char--row--name">Rating:</span>
          <span className="card__char--row--value">{quest.rating}</span>
        </div>
        {/* <div className="card__char--row">
          <span className="card__char--row--name">Time to complete:</span>
          <span className="card__char--row--value">{quest.timeLimit} min</span>
        </div> */}
      </div>
      <Link to={`/quest/${quest.id}`}>
        <button className="card__button">Спробувати</button>
      </Link>
    </div>
  );
};
