import React from 'react';
import { Quest } from '../../types/quest';
import { Link } from 'react-router-dom';
import './QuestCard.scss';

type Props = {
  quest: Quest;
};

export const QuestCard: React.FC<Props> = ({ quest }) => {
  return (
    <div className="card">
      <div className="card__header">
        <Link
          to="/"
          // to={`/${product.category}/${product.itemId}`}
          className="card__header--title"
        >
          {quest.title}
        </Link>
        <p className="card__header--author">Author: Peter Kavinsky</p>
        {/* <button>Спробувати</button> */}
        {/* <div className="card__header--rating">Rating: {quest.rating}</div> */}
      </div>
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
        <div className="card__char--row">
          <span className="card__char--row--name">Time to complete:</span>
          <span className="card__char--row--value">{quest.timeLimit} min</span>
        </div>
      </div>
      <Link to={`/quest/${quest.id}`}>
        <button className="card__button">Спробувати</button>
      </Link>
    </div>
  );
};
