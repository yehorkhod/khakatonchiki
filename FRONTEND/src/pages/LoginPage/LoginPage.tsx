import './LoginPage.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);

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
    console.log(data);
    reset();
    navigate(-2);
    // try {
    //   const response = await axios.post('/api/login', {
    //     email: data.email,
    //     password: data.password,
    //   });
    //   reset();
    //   navigate(-2);
    // } catch (error: any) {
    //   if (error.response?.status === 401) {
    //     setError('password', {
    //       type: 'manual',
    //       message: error.response.data.message,
    //     });
    //   }
    // }
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
