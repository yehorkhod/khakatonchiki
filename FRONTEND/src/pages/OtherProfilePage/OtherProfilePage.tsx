import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { ProfileQuestCreated } from '../../components/ProfileQuestCreated/ProfileQuestCreated';
import { Quest } from '../../types/quest';
import { ProfileQuestCompleted } from '../../components/ProfileQuestCompleted/ProfileQuestCompleted';
import { getUserById } from '../../fetch/getUserData';
import { Loader } from '../../components/Loader/Loader';

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
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    <p>Сталася помилка</p>;
  }

  return (
    <>
      {isLoading ?
        <Loader />
      : <>
          <div className="profile-page">
            <h1 className="page-title">{user?.username}</h1>
            <div className="profile__info">
              <img
                src={user?.user_image}
                alt="Аватар"
                className="profile__info--picture"
              />
              <h1 className="profile__info--name">{user?.username}</h1>
              <p className="profile__info--email">{user?.email}</p>
            </div>
            <section className="created-quests">
              <h2 className="quests-list__title">Створені квести</h2>
              <div className="quests-list">
                {!user?.created_quests || user.created_quests.length === 0 ?
                  <p>Даний користувач ще нестворив жодного квесту.</p>
                : user.created_quests?.map((quest) => (
                    <ProfileQuestCreated
                      key={quest.id}
                      quest={quest}
                    />
                  ))
                }
              </div>
            </section>
            <section className="completed-quests">
              <h2 className="quests-list__title">Пройдені квести</h2>
              <div className="quests-list">
                {(
                  !user?.completed_quests || user?.completed_quests.length === 0
                ) ?
                  <p>Даний користува ще е проходив квести</p>
                : user.completed_quests?.map((quest) => (
                    <ProfileQuestCompleted
                      key={quest.id}
                      quest={quest}
                    />
                  ))
                }
              </div>
            </section>
          </div>
        </>
      }
    </>
  );
};
