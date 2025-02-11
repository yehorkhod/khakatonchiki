import { useContext, useEffect, useState } from 'react';
import { UserIdContext } from '../../context/UserIdContext';
import { useNavigate } from 'react-router-dom';

import './MyProfilePage.scss';
// import { getUser } from '../../fetch/getUser';
import { User } from '../../types/User';
import { Quest } from '../../types/quest';
import { getQuestsWithIds } from '../../fetch/getQuests';
import { ProfileQuestCreated } from '../../components/ProfileQuestCreated/ProfileQuestCreated';
import { ProfileQuestCompleted } from '../../components/ProfileQuestCompleted/ProfileQuestCompleted';
import { Loader } from '../../components/Loader/Loader';
import { getMyData } from '../../fetch/getUserData';

export const MyProfilePage = () => {
  const { logout, userId } = useContext(UserIdContext);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [quests, setQuests] = useState<Quest[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const avatars = [
    '/img/avatar1.webp',
    '/img/avatar2.jpeg',
    '/img/avatar3.jpeg',
    '/img/avatar4.jpeg',
    '/img/avatar.jpeg',
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    getMyData()
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));

    getQuestsWithIds()
      .then((data) => setQuests(data))
      .catch(() => setError('cant fetch quests'));
  }, [userId]);

  const handleAvatarSelect = (avatar: string) => {
    setUser((prev) => (prev ? { ...prev, profilePicture: avatar } : null));
    setIsModalOpen(false);
  };

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const onLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Якщо потрібен токен авторизації:
          // 'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Якщо бекенд використовує cookies для сесії
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message); // "Logout successful"
        logout();
        navigate('/');
      } else {
        console.error('Logout error:', responseData.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }

  // const createdQuests = user?.createdQuests
  //   .map((q) => quests.find((quest) => quest.id === q.questId))
  //   .filter(Boolean) as Quest[];

  // console.log(createdQuests, 'created');

  // const completedQuests = user?.completedQuests
  //   .map((q) => quests.find((quest) => quest.id === q.questId))
  //   .filter(Boolean) as Quest[];

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {isLoading ?
        <Loader />
      : <div className="profile-page">
          <h1 className="page-title">Мій профіль</h1>
          <div className="profile__info">
            <img
              src={user?.profilePicture}
              alt="Аватар"
              className="profile__info--picture"
            />
            <h1 className="profile__info--name">{user?.name}</h1>
            <p className="profile__info--email">{user?.email}</p>
            {/* <p className="profile__info--email">{user?.rating || 'rating'}</p> */}
            {/* <button
              className="profile__info--button"
              onClick={() => setIsModalOpen(true)}
            >
              Змінити фото профілю
            </button> */}
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

          <button
            className="exit"
            // onClick={() => {
            //   logout();
            //   navigate('/');
            // }}
            onClick={onLogout}
          >
            Вийти
          </button>
        </div>
      }

      {isModalOpen && (
        <div
          className="modal"
          onClick={handleModalClose}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Оберіть аватар</h3>
            <div className="avatar-options">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Аватар ${index + 1}`}
                  className="avatar-option"
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </>
  );
};
