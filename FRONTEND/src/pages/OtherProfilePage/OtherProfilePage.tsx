import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { ProfileQuestCreated } from '../../components/ProfileQuestCreated/ProfileQuestCreated';
import { Quest } from '../../types/quest';
import { getQuestsWithIds } from '../../fetch/getQuests';
import { ProfileQuestCompleted } from '../../components/ProfileQuestCompleted/ProfileQuestCompleted';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../fetch/getUserData';

type Props = {
  id?: string;
};

export const OtherProfilePage: React.FC<Props> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [quests, setQuests] = useState<Quest[] | []>([]);


  useEffect(() => {
    setIsLoading(true);
    if (!id) return;
  
    getUserById(id)
    .then((data) => setUser(data))
    .catch(() => setError('something went wrong'))
    .finally(() => setIsLoading(false))
  }, []);

  return (
    <div className="profile-page">
      <h1 className="page-title">{user?.name}</h1>
      <div className="profile__info">
        <img
          src={user?.profilePicture}
          alt="Аватар"
          className="profile__info--picture"
        />
        <h1 className="profile__info--name">{user?.name || 'name'}</h1>
        <p className="profile__info--email">{user?.email || 'email'}</p>
      </div>
      <section className="created-quests">
        <h2 className="quests-list__title">Created Quests</h2>
        <div className="quests-list">
          {
            !user?.createdQuests || user.createdQuests.length === 0 ?
              <p>Ви ще не створили жодного квесту.</p>
            : user.createdQuests?.map((quest) => (
                <ProfileQuestCreated
                  key={quest.id}
                  quest={quest}
                />
              ))

            // <div className="quest-card">
            // <ProfileQuestCreated quests={createdQuests} />
            // </div>
          }
        </div>
      </section>
      <section className="completed-quests">
        <h2 className="quests-list__title">Completed Quests</h2>
        <div className="quests-list">
          {!user?.completedQuests || user?.completedQuests.length === 0 ?
            <p>Ви ще не створили жодного квесту.</p>
          : // <p>{user?.completedQuests[0].title}</p>
            user.completedQuests?.map((quest) => (
              <ProfileQuestCompleted
                key={quest.id}
                quest={quest}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};
