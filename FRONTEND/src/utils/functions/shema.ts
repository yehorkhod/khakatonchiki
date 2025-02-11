import * as yup from 'yup';

const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/);
const nameRegExp = new RegExp(/^[А-ЯІЇЄҐа-яіїєґA-Za-z'’\s]+$/);

export const shema = yup.object().shape({
  name: yup
    .string()
    .required('Це обовʼязкове поле')
    .matches(nameRegExp, 'Ім’я повинно містити тільки літери'),
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
  confirmPassword: yup
    .string()
    .required('Це обовʼязкове поле')
    .oneOf([yup.ref('password')], 'Паролі не співпадають'),
});
