import './RegisterPage.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shema } from '../../utils/functions/shema';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserIdContext } from '../../context/UserIdContext';
// import { Register } from '../../fetch/getQuests';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(shema),
  });

  const navigate = useNavigate();

  const { login, userId } = useContext(UserIdContext);

  // console.log(userId);

  const onSubmit = async (data: RegisterFormData) => {
    console.log({
      username: data.name,
      email: data.email,
      password: data.password,
    });

    fetch('http://localhost:8000/api/auth/register', {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        console.log(response, 'response')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then((data) => {
        // console.log(data, data.user.id); 
        login(data.user.id);
        reset();
        navigate('/login');
      });

    // try {
    //   const response = await fetch('http://localhost:8000/api/auth/register', {
    //     mode: 'no-cors',
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: data.name,
    //       email: data.email,
    //       password: data.password,
    //     }),
    //   });
    
    //   const responseData = await response.json();
    //   console.log(responseData);
    
    //   if (response.ok && responseData.userId) {
    //     login(responseData.userId); // Зберігаємо userId у контексті
    //   } else {
    //     console.error('Error:', responseData);
    //   }
    
    //   reset();
    //   navigate(-1);
    // } catch (err) {
    //   console.error('Fetch error:', err);
    // }
    
  };
  return (
    <div className="register-page container">
      <div className="wrapper">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="form__title">Регістрація</h2>

          <label className="form__label">
            Ім'я
            <input
              type="text"
              {...register('name')}
              placeholder="Введіть ваше ім'я"
              className="form__input form__name"
            />
            {errors.name && (
              <p className="form__input--message">{errors.name.message}</p>
            )}
          </label>
          <label className="form__label">
            Пошта
            <input
              type="text"
              {...register('email')}
              placeholder="Введіть вашу пошту"
              className="form__input form__email"
            />
            {errors.email && (
              <p className="form__input--message">{errors.email.message}</p>
            )}
          </label>

          <label className="form__label">
            Пароль
            <input
              type="password"
              {...register('password')}
              placeholder="Придумай пароль"
              className="form__input form__password"
            />
            {errors.password && (
              <p className="form__input--message">{errors.password.message}</p>
            )}
          </label>
          <label className="form__label">
            Підтвердити пароль
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Підтвердити пароль"
              className="form__input form__confirm"
            />
            {errors.confirmPassword && (
              <p className="form__input--message">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
          <input
            type="submit"
            value={'Зареєструватися'}
            className="form__button"
          />
          <div className="login__wrapper">
            <label className="form__label">Вже маєш аккаунт?</label>
            <NavLink to={'/login'}>
              <input
                type="submit"
                value={'Ввійти'}
                className="form__button"
              />
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
