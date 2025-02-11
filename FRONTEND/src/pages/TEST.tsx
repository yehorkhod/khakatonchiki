<div className="profile-page container">
        <div className="profile-header">
          <img
            src={user?.profilePicture}
            alt="Аватар"
            className="profile-picture"
          />
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>

        <section className="quests-section">
          <h2>Мої квести</h2>
          <div className="quests-list">
            {/* {user?.createdQuests.length === 0 ? (
            <p>Ви ще не створили жодного квесту.</p>
          ) : (
            user?.createdQuests.map((quest) => (
              <QuestCard key={quest.questId} questId={quest.questId} />
            ))
          )} */}
          </div>
        </section>

        <section className="completed-quests-section">
          <h2>Пройдені квести</h2>
          <div className="quests-list">
            {user?.completedQuests.length === 0 ?
              <p>Ви ще не пройшли жодного квесту.</p>
            : user?.completedQuests.map((quest) => <p>ert</p>)}
          </div>
        </section>
</div>
      


      import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Media {
  type: string;
  content: string;
}

interface Question {
  question: string;
  type: string;
  media: Media[];
  answers?: string[];
  correctAnswerIndex?: number;
}

interface QuestFormValues {
  title: string;
  description: string;
  taskCount: number;
  timeLimit: number;
  questions: Question[];
}

export const CreateQuestPage = () => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<QuestFormValues>();
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    // Загрузка данных из localStorage при монтировании компонента
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const onSubmit = (data: QuestFormValues) => {
    console.log('Form data:', data);
    // Здесь можно отправить данные на сервер или обработать их
  };

  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      { question: '', type: 'open', media: [], answers: [], correctAnswerIndex: undefined }
    ];
    setQuestions(newQuestions);
    // Сохраняем новые вопросы в localStorage
    localStorage.setItem('questions', JSON.stringify(newQuestions));
  };

  const updateQuestion = (index: number, key: string, value: string | number) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
    // Сохраняем новые вопросы в localStorage
    localStorage.setItem('questions', JSON.stringify(newQuestions));
  };

  const addMediaToQuestion = (questionIndex: number, type: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].media.push({ type, content: '' });
    setQuestions(newQuestions);
    // Сохраняем изменения в localStorage
    localStorage.setItem('questions', JSON.stringify(newQuestions));
  };

  const addAnswerToQuestion = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers?.push('');
    setQuestions(newQuestions);
    // Сохраняем изменения в localStorage
    localStorage.setItem('questions', JSON.stringify(newQuestions));
  };

  const updateAnswer = (questionIndex: number, answerIndex: number, content: string) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].answers) {
      newQuestions[questionIndex].answers[answerIndex] = content;
      setQuestions(newQuestions);
      // Сохраняем изменения в localStorage
      localStorage.setItem('questions', JSON.stringify(newQuestions));
    }
  };

  const handleCorrectAnswerChange = (questionIndex: number, correctAnswerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswerIndex = correctAnswerIndex;
    setQuestions(newQuestions);
    // Сохраняем изменения в localStorage
    localStorage.setItem('questions', JSON.stringify(newQuestions));
  };

  return (
    <div className="create-quest-page">
      <h1>Створити новий квест</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Назва квесту:</label>
          <input
            {...register('title', { required: 'Назва квесту обов\'язкова' })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Опис квесту:</label>
          <textarea
            {...register('description', { required: 'Опис квесту обов\'язковий' })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Кількість завдань:</label>
          <input
            type="number"
            {...register('taskCount', { required: 'Кількість завдань обов\'язкова' })}
          />
          {errors.taskCount && <p>{errors.taskCount.message}</p>}
        </div>

        <div>
          <label>Обмеження за часом:</label>
          <input
            type="number"
            {...register('timeLimit', { required: 'Обмеження за часом обов\'язкове' })}
          />
          {errors.timeLimit && <p>{errors.timeLimit.message}</p>}
        </div>

        {/* Додавання запитань */}
        <div>
          <h3>Запитання для квесту:</h3>
          <button type="button" onClick={addQuestion}>Додати запитання</button>

          {questions.map((item, questionIndex) => (
            <div key={questionIndex} className="question">
              <label>Запитання:</label>
              <input
                value={item.question}
                onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                placeholder="Введіть запитання"
              />
              <label>Тип запитання:</label>
              <select
                value={item.type}
                onChange={(e) => updateQuestion(questionIndex, 'type', e.target.value)}
              >
                <option value="open">Відкрите</option>
                <option value="multipleChoice">Тестове</option>
              </select>

              {/* Для тестового питання показываем поля для ответов и правильного ответа */}
              {item.type === 'multipleChoice' && (
                <div>
                  <h4>Варіанти відповідей:</h4>
                  {item.answers?.map((answer, answerIndex) => (
                    <div key={answerIndex}>
                      <label>Відповідь {answerIndex + 1}:</label>
                      <input
                        value={answer}
                        onChange={(e) => updateAnswer(questionIndex, answerIndex, e.target.value)}
                        placeholder="Введіть варіант відповіді"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => addAnswerToQuestion(questionIndex)}>Додати відповідь</button>

                  <label>Правильна відповідь:</label>
                  <select
                    value={item.correctAnswerIndex}
                    onChange={(e) => handleCorrectAnswerChange(questionIndex, Number(e.target.value))}
                  >
                    <option value={undefined}>Виберіть правильну відповідь</option>
                    {item.answers?.map((answer, index) => (
                      <option key={index} value={index}>{answer}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Додавання мультимедійних елементів для кожного запитання */}
              <div>
                <h4>Мультимедійні елементи:</h4>
                <button type="button" onClick={() => addMediaToQuestion(questionIndex, 'text')}>Додати текст</button>
                <button type="button" onClick={() => addMediaToQuestion(questionIndex, 'image')}>Додати зображення</button>
                <button type="button" onClick={() => addMediaToQuestion(questionIndex, 'video')}>Додати відео</button>

                {item.media.map((mediaItem, mediaIndex) => (
                  <div key={mediaIndex}>
                    <label>{mediaItem.type}:</label>
                    <input
                      value={mediaItem.content}
                      onChange={(e) => updateMedia(questionIndex, mediaIndex, e.target.value)}
                      placeholder={`Введіть ${mediaItem.type}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button type="submit">Створити квест</button>
      </form>
    </div>
  );
};





import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useEffect } from "react";

type FormData = {
  name: string;
  email: string;
};

export const CreateQuestPage = () => {
  const savedData = localStorage.getItem("formData");
  const parsedData: FormData = savedData ? JSON.parse(savedData) : { name: "", email: "" };


  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: parsedData
  });

  const formData = watch();

  // useEffect(() => {
  //   // if (formData) {
  //   //   setValue('name', formData.name || '');
  //   //   setValue('email', formData.email || '');
  //   // }
  //   // dispatch(setFormData(formValues));
  //   if (formValues.name !== formData.name || formValues.email !== formData.email) {
  //     dispatch(setFormData(formValues));
  //   }
  // }, [formData, setValue, dispatch]);

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   dispatch(setFormData(data));
  // }
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // При завантаженні сторінки заповнюємо поля
  // useEffect(() => {
  //   const savedData = localStorage.getItem("formData");
  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  //     Object.keys(parsedData).forEach((key) => {
  //       setValue(key as keyof FormData, parsedData[key]);
  //     });
      
  //   }
  // }, [setValue]);
  useEffect(() => {
    Object.keys(parsedData).forEach((key) => {
      setValue(key as keyof FormData, parsedData[key]);
    });
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    localStorage.setItem("formData", JSON.stringify(data));
    console.log(data);
  }
  return (
    <div className="page container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register('name')}/>
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="text" {...register('email')}/>
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
