import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Quest } from '../../types/quest';
import { getQuestsWithIds } from '../../fetch/getQuests';

import './PreviewQuestPage.scss';
import { CommentCard } from '../../components/CommentCard/CommentCard';
import { Loader } from '../../components/Loader/Loader';

export const PreviewQuestPage = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //give id here
    getQuestsWithIds()
      .then((data) => {
        console.log(data);
        setQuest(data.find((q) => q.id === id) || null);
      })
      .catch(() => setError('something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(quest);

  return (
    <div className="page container padding">
      {isLoading ?
        <Loader />
      : <>
          <div className="wraper">
            <h1 className="quest-title">{quest?.title}</h1>
            <Link to={`/quest/${id}/task`}>
              <button className="quest-button">Пройти квест</button>
            </Link>
          </div>
          <p className="quest-author">Author: Peter Kavinsky</p>
          <p className="quest-rating">Rating: {quest?.rating}</p>
          <p className="quest-subtitle">{quest?.description}</p>
          <div className="quest-wrapper">
            <p className="quest-info count">
              Число завдань: {quest?.taskCount}
            </p>
            <p className="quest-info time">
              Час на проходження: {quest?.timeLimit}
            </p>
          </div>
          <h2 className="comment-subtitle">Коментарії</h2>
          <div className="comments-container">
            {quest?.feedback.map((comment) => (
              <CommentCard
                id={comment.user}
                author={comment.user}
                text={comment.comment}
                avatar={'/img/avatar.jpeg'}
              />
            ))}
          </div>
          {/* comments */}
        </>
      }
    </div>
  );
};
