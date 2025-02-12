import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Quest, QuestInfoType } from '../../types/quest';
import {
  getQuestInfoById,
  getQuestInfoByIdType,
  getQuestsWithIds,
} from '../../fetch/getQuests';

import './PreviewQuestPage.scss';
import { CommentCard } from '../../components/CommentCard/CommentCard';
import { Loader } from '../../components/Loader/Loader';

export const PreviewQuestPage = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState<getQuestInfoByIdType | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //give id here
    if (!id) return;

    getQuestInfoById(id)
      .then((data) => {
        console.log(data);
        setQuest(data || null);
      })
      .catch(() => setError('something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  // console.log(quest, 'quessttt');

  if (error) {
    return (
      <p>Щось пішло не так</p>
    )
  }

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
          <p className="quest-author">Author: {quest?.author}</p>
          <p className="quest-rating">Rating: {quest?.rating}</p>
          <p className="quest-subtitle">{quest?.description}</p>
          <div className="quest-wrapper">
            <p className="quest-info count">
              Число завдань: {quest?.number_of_tasks}
            </p>
            {quest?.duration && (
              <p className="quest-info time">
                Час на проходження: {quest?.duration}
              </p>
            )}
          </div>
          <h2 className="comment-subtitle">Коментарії</h2>
          {quest?.comments.length !== 0 ?
            <div className="comments-container">
              {quest?.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  id={comment.user_id}
                  author={comment.username}
                  text={comment.text}
                  // avatar={'/img/avatar.jpeg'}
                />
              ))}
            </div>
          : <>
              <p>Коментарів ще немає...</p>
              <p>Пройди квест, щоб першим залишити коментар!</p>
            </>
          }
          {/* comments */}
        </>
      }
    </div>
  );
};
