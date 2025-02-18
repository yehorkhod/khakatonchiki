import React from 'react';
import { Quest } from '../../types/quest';
import './ProfileQuestCreated.scss';
import { Link } from 'react-router-dom';

type Props = {
  quest: Quest;
};

export const ProfileQuestCreated: React.FC<Props> = (props) => {
  const { quest } = props;
  return (
    <>
      {/* {quests.map((quest) => ( */}
        <div key={quest.id} className="quest-card">
          <Link
            to={`/quest/${quest.id}`}
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
          </div>
        </div>
      {/* ))} */}
    </>
  );
};
