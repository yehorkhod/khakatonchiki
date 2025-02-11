import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserIdContext } from '../../context/UserIdContext';
import { MyProfilePage } from '../MyProfilePage/MyProfilePage';
import { OtherProfilePage } from '../OtherProfilePage/OtherProfilePage';

export const ProfilePage = () => {
  const { id } = useParams();
  const { userId } = useContext(UserIdContext);

  // const userIdFromParams = id ? parseInt(id, 10) : null;
  const isMyProfile = userId === id;


  return (
    <div className="page container">
      {isMyProfile ?
        <MyProfilePage />
      : <OtherProfilePage id={id} />}
    </div>
  );
};
