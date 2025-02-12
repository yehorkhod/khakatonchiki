import './LoginPage.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserIdContext } from '../../context/UserIdContext';
import { logIn } from '../../fetch/login';

export const LoginPage = () => {
  const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
  const { login } = useContext(UserIdContext);

  const shema = yup.object().shape({
    email: yup
      .string()
      .required('Це обовʼязкове поле')
      .matches(regExpEmail, 'Невірний формат пошти'),
    password: yup
      .string()
      .required('Це обовʼязкове поле')
      .min(4, 'Замало символів')
      .max(20, 'Забагато символів')
      .matches(/(?=.*[A-Z])/, 'Потрібна мінімум одна велика літера')
      .matches(/(?=.*[!@#$%^&*])/, 'Потрібен спеціальний символ'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setError
  } = useForm({
    resolver: yupResolver(shema),
  });

  const navigate = useNavigate();

  type LoginFormData = {
    email: string;
    password: string;
  };

  const onSubmit = async (data: LoginFormData) => {
    console.log({
          email: data.email,
          password: data.password,
    });
    
    try {
      const result = await logIn(data);

      if (result) {
        console.log('login successfull', result);
        console.log(result.user.id);
        login(result.user.id);
        reset();
        navigate(`/profile/${result.user.id}`);
      }
    } catch {

    }

    // await fetch('http://localhost:8000/api/auth/login', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   credentials: "include",
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: data.email,
    //     password: data.password,
    //     remember: true,
    //   }),
    // })
    //   .then((response) => {
    //     console.log(response, 'response')
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   return response.json();
    // }).then((data) => {
    //   console.log(data); 
    // })
  };
  return (
    <div className="login-page container">
      <div className="wrapper">
        <form
          className="login-form form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="form__title">Вхід</h2>

          <label className="form__label">
            Пошта
            <input
              type="text"
              {...register('email')}
              placeholder="Введіть пошту"
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
              placeholder="Введіть пароль"
              className="form__input form__password"
            />
            {errors.password && (
              <p className="form__input--message">{errors.password.message}</p>
            )}
          </label>
          <input
            type="submit"
            value={'Ввійти'}
            className="form__button"
          />
        </form>
      </div>
    </div>
  );
};
