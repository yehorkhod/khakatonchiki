import React, { useEffect, useState } from "react"
import { User } from "../../types/User";
import { getUser, getUserdata } from "../../fetch/getUser";
import { ProfileQuestCreated } from "../../components/ProfileQuestCreated/ProfileQuestCreated";
import { Quest } from "../../types/quest";
import { getQuestsWithIds } from "../../fetch/getQuests";

type Props = {
  id?: string;
}

export const OtherProfilePage: React.FC<Props> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [quests, setQuests] = useState<Quest[] | []>([]);


  // useEffect(() => {
  //   if (!id) return;
  //   setIsLoading(true);

  //   getUserdata(id)
  //   getUserdata(id)
  //   .then((data) => {
  //     console.log(data);
  //     setUser(data);

  //     // Теперь запрашиваем только те квесты, которые связаны с этим пользователем
  //     const userQuestIds = [
  //       ...data.createdQuests.map((q) => q.questId),
  //       ...data.completedQuests.map((q) => q.questId),
  //     ];

  //     // Запрашиваем квесты по этим ID
  //     return getQuestsWithIds(userQuestIds);
  //   })
  //     .then((questsData) => {
  //     console.log(questsData)
  //     setQuests(questsData);  // Сохраняем только нужные квесты
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     setError('There is no such users or quests');
  //   })
  //     .finally(() => setIsLoading(false));
  // }, [id]);

  // const createdQuests = user?.createdQuests
  //   .map((q) => quests.find((quest) => quest.id === q.questId))
  //   .filter(Boolean) as Quest[];

  // console.log(createdQuests, 'created');

  // const completedQuests = user?.completedQuests
  //   .map((q) => quests.find((quest) => quest.id === q.questId))
  //   .filter(Boolean) as Quest[];
  return (
    <div className="profile-page">
        <h1 className="page-title">{user?.name}</h1>
        <div className="profile__info">
          <img
            src={user?.profilePicture}
            alt="Аватар"
            className="profile__info--picture"
          />
          <h1 className="profile__info--name">{user?.name}</h1>
          <p className="profile__info--email">{user?.email}</p>
          <button
            className="profile__info--button"
          >
            Змінити фото профілю
          </button>
        </div>
        <section className="created-quests">
          <h2 className="quests-list__title">Created Quests</h2>
          <div className="quests-list">
            {!user?.createdQuests || user.createdQuests.length === 0 ?
              <p>Ви ще не створили жодного квесту.</p>
            : createdQuests?.map((quest) => (
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
              completedQuests?.map((quest) => (
                <ProfileQuestCompleted
                  key={quest.id}
                  quest={quest}
                />
              ))
            }
          </div>
        </section>

        <button
          className="exit"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Вийти
        </button>
      </div>
  )
}