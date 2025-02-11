import { useEffect, useState } from 'react';
import { getQuests, getQuestsWithIds } from '../../fetch/getQuests';
import { Quest } from '../../types/quest';
import { QuestCard } from '../QuestCard/QuestCard';
import './QuestList.scss';
import { Loader } from '../Loader/Loader';

export const QuestList = () => {
  //fetch quests:

  const [quests, setQuests] = useState<Quest[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getQuestsWithIds() // ---> fetching data from server on a separate function
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
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : (
        quests.map((quest) => (
          <QuestCard key={quest.title} quest={quest} /> 
        ))
      )
      } */}
      {isLoading ?
        <Loader />
        : <div className="list">
          {quests.map((quest) => (
            <div key={quest.title} className="list__card">
            <QuestCard quest={quest} />
          </div>
          ))}
        </div>
      }
    </>
  );
};

// keys for map!!!!! ids for quests!!!
