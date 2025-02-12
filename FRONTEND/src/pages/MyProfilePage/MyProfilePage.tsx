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
import { getMyData, getMyProfile } from '../../fetch/getUserData';
import { logOut } from '../../fetch/login';

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

    getMyProfile()
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

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
      const result = await logOut();

      if (result) {
        console.log('login successfull', result);
        console.log(result.message);
        logout();
        navigate('/');
      }
    } catch (err) {
      console.error('HAHA ERROR', err);
    }
    //   try {
    //     const response = await fetch('http://localhost:8000/api/auth/logout', {
    //       mode: 'no-cors',
    //       method: 'POST',
    //       credentials: "include",
    //     });

    //     const responseData = await response.json();

    //     if (response.ok) {
    //       console.log(responseData.message,'message' ); // "Logout successful"
    //       logout();
    //       navigate('/');
    //     } else {
    //       console.error('Logout error:', responseData.message);
    //     }
    //   } catch (err) {
    //     console.error('Fetch error:', err);
    //   }
  };

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
            {user?.user_image && (
              <div
                dangerouslySetInnerHTML={{ __html: user.user_image }}
                className="profile__info--picture"
              ></div>
            )}
            {/* <img
              src={user?.user_image}
              alt="Аватар"
              className="profile__info--picture"
            /> */}
            <h1 className="profile__info--name">{user?.username}</h1>
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
                !user?.created_quests || user.created_quests.length === 0 ?
                  <p>Ви ще не створили жодного квесту.</p>
                : user.created_quests?.map((quest) => (
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
              {!user?.completed_quests || user?.completed_quests.length === 0 ?
                <p>Ви ще не створили жодного квесту.</p>
              : // <p>{user?.completedQuests[0].title}</p>
                user.completed_quests?.map((quest) => (
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
