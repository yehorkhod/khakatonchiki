import { useContext, useEffect, useState } from 'react';
import { UserIdContext } from '../../context/UserIdContext';
import { Link } from 'react-router-dom';

import './MyProfilePage.scss';

type User = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  createdQuests: string[];
  completedQuests: string[];
};

export const MyProfilePage = () => {
  const { userId } = useContext(UserIdContext);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser(userId: string) {
      try {
        const response = await fetch(`/profile.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to fetch user data');
      }
    }

    if (userId) {
      setIsLoading(true);
      getUser(userId)
        .then((data) => setUser(data))
        .catch(() => setError('something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // const QuestCard = ({ questId }: { questId: string}) => (
  //   <div className="quest-card">
  //     {/* <h3>{title}</h3> */}
  //     <p>Квест ID: {questId}</p>
  //     <Link to={`/quests/${questId}`}>Перейти к квесту</Link>
  //   </div>
  // );

  return (
    <>
      {/* <div className="profile-page container">
      <div className="profile-header">
        <img src={user?.profilePicture} alt="Аватар" className="profile-picture" />
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>

      <section className="quests-section">
        <h2>Мої квести</h2>
        <div className="quests-list">
          {user?.createdQuests.length === 0 ? (
            <p>Ви ще не створили жодного квесту.</p>
          ) : (
            user?.createdQuests.map((quest) => (
              <QuestCard key={quest.questId} questId={quest.questId} />
            ))
          )}
        </div>
      </section>

      <section className="completed-quests-section">
        <h2>Пройдені квести</h2>
        <div className="quests-list">
          {user?.completedQuests.length === 0 ? (
            <p>Ви ще не пройшли жодного квесту.</p>
          ) : (
            user?.completedQuests.map((quest) => (
              <p>ert</p>
            ))
          )}
        </div>
      </section>
    </div> */}
    </>
  );
};
