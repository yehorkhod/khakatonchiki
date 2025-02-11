import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserIdContext } from '../../context/UserIdContext';
import './NeedToRegister.scss';

export const NeedToRegister = () => {
  const { userId } = useContext(UserIdContext);
  return (
    <>
      {userId ?
        <Outlet />
      : <>
          <div className="page container center">
            <p className='subtitle'>
              На жаль, Ви не маєте доступу до цієї сторінки без реєстрації.
            </p>
            <Link to={'/register'}>
              <button className='card__button'>Зареєструватися</button>
            </Link>
          </div>
        </>
      }
    </>
  );
};
