import { useEffect, useState } from 'react';
import { getQuests, getQuestsType, TEST } from '../../fetch/getQuests';
import { Quest } from '../../types/quest';
import { QuestCard } from '../QuestCard/QuestCard';
import './QuestList.scss';
import { Loader } from '../Loader/Loader';

export const QuestList = () => {
  const [quests, setQuests] = useState<getQuestsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getQuests()
      .then((data) => {
        setQuests(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    return <p>Sorry... Someting went wrong</p>;
  }

  return (
    <>
      {isLoading ?
        <Loader />
        : <div className="list">
          {quests.map((quest) => (
            <div key={quest.id} className="list__card">
            <QuestCard quest={quest} />
          </div>
          ))}
        </div>
      }
    </>
  );
};

