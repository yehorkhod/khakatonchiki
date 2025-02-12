import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import './CreatePageQuest.scss';
import { useNavigate } from 'react-router-dom';
import { createQuest } from '../../fetch/create-quest';

const question = [
  {
    text: 'title',
    type: 'test',
    options: ['option1', 'option2', 'option3'],
    rightAnswer: 'option2',
    media: {
      video: 'URL',
    },
  },
];

type Media = {
  media: string;
};

type Question = {
  text: string;
  type: string;
  options: string[];
  rightAnswer: string;
  media: string;
};

type FormData = {
  title: string;
  description: string;
  // count: number;
  duration: string;
  // questions: Question[];
};

export const CreateQuestPage = () => {
  const [questions, setQuestions] = useState<Question[] | []>([]);
  const savedData = localStorage.getItem('formData');
  const parsedData: FormData =
    savedData ? JSON.parse(savedData) : { title: '', description: '', duration: '' };

  // const schema = yup.object().shape({
  //   title: yup.string().required('title is required'),
  //   description: yup.string().required('description is required'),
  //   // count: yup.number().required('Task count is required'),
  //   time: yup.number().required('Task time is required'),
  // });

  const schema = yup.object().shape({
    title: yup.string().required('Назва обов’язкова'),
    description: yup.string().required('Опис обов’язковий'),
    duration: yup.string().matches(/^\d+$/, 'Тривалість має бути числом').required('Час обов’язковий'),
    questions: yup.array().of(
      yup.object().shape({
        type: yup.string().oneOf(['open', 'test']).required(),
        text: yup.string().required('Питання обов’язкове'),
        rightAnswer: yup.string().when('type', {
          is: 'test',
          then: () => yup.string().required('Правильна відповідь обов’язкова'),
        }),
        options: yup.array().when('type', {
          is: 'test',
          then: () =>
            yup
              .array()
              .of(yup.string().required())
              .min(2, 'Мінімум 2 варіанти відповіді'),
        }),
      }),
    ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: parsedData,
  });

  const navigate = useNavigate();

  const formData = watch();
  useEffect(() => {
    localStorage.setItem(
      'formData',
      JSON.stringify({
        title: watch('title'),
        description: watch('description'),
        duration: watch('duration'),
        questions,
      }),
    );
    // const updatedData = { ...formData, questions };
    // localStorage.setItem('formData', JSON.stringify(updatedData));
  }, [watch('title'), watch('description'), watch('duration'), questions]);

  useEffect(() => {
    Object.keys(parsedData).forEach((key) => {
      setValue(key as keyof FormData, parsedData[key as keyof typeof parsedData]);
    });
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    console.log('Form data before sending:', data);
    localStorage.setItem('formData', JSON.stringify({ ...data, questions }));

    try {
      const result = await createQuest(data, questions);
      if (result) {
        console.log(result.message, 'messsss');
        console.log(result.quest_id);
        reset();
        setQuestions([]);
        localStorage.removeItem('formData');
        navigate(`/quests/${result.quest_id}`);
      }
    } catch(err) {
      console.error('Error submitting quest:', err);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: 'open', text: '', media: '', options: [], rightAnswer: '' },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: any,
  ) => {
    const updatedQuestions = [...questions];
    (updatedQuestions[index] as any)[field] = value;
    setQuestions(updatedQuestions);
  };

  const clearForm = () => {
    reset({
      title: '',
      description: '',
      duration: '',
    });
    setQuestions([]);
    localStorage.removeItem('formData');
  };


  return (
    <div className="container create-page">
      <div className="form-wrapper">
        <form
          className="quest-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="form-title">Створення квесту</h2>
          <label className="form-label">
            Назва квесту:
            <input
              type="text"
              placeholder='Назва квесту'
              {...register('title')}
              className="form-input"
            />
            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </label>
          <label className="form-label">
            Опис квесту:
            <textarea
              placeholder='Опис квесту'
              className="form-textarea"
              {...register('description')}
            />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
          </label>
          {/* <label>
            Кількість завдань:
            <input
              type="number"
              {...register('count')}
            />
            {errors.count && <span>{errors.count.message}</span>}
          </label> */}
          <label className="form-label">
            Час виконання:
            <input
              className="form-input"
              placeholder='Час виконання'
              type="string"
              {...register('duration')}
            />
            {errors.duration && (
              <span className="error">{errors.duration.message}</span>
            )}
          </label>
          {/* <label>
            {`Питання номер ${count}: `}
            <input
              type="text"
              {...register('time')}
            />
            {errors.time && <span>{errors.time.message}</span>}
          </label> */}
          <h3 className="questions-title">Питання:</h3>
          {questions.map((question, index) => (
            <div
              key={index}
              className="question-block"
            >
              <label className="form-label">
                Текст питання:
                <input
                  placeholder='Задайте питання'
                  className="form-input"
                  type="text"
                  // {...register({...register(`questions[${index}].text`)})}
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(index, 'text', e.target.value)
                  }
                />
              </label>
              <label className="form-label">
                Тип питання:
                <select
                  className="form-select"
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(index, 'type', e.target.value)
                  }
                >
                  <option value="open">Відкрите</option>
                  <option value="test">Тест</option>
                </select>
              </label>

              {question.type === 'test' &&
                <>
                  <label className="form-label">Варіанти відповідей:</label>
                  {[...Array(3)].map((_, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      className="form-input"
                      placeholder={`Варіант ${optionIndex + 1}`}
                      value={question.options?.[optionIndex] || ''}
                      onChange={(e) => {
                        const updatedOptions = [...(question.options || [])];
                        updatedOptions[optionIndex] = e.target.value;
                        handleQuestionChange(index, 'options', updatedOptions);
                      }}
                    />
                  ))}
                  <label className="form-label">Правильна відповідь:</label>
                  {/* <input
                    type="text"
                    className="form-input"
                    value={question.rightAnswer || ''}
                    onChange={(e) =>
                      handleQuestionChange(index, 'rightAnswer', e.target.value)
                    }
                  /> */}
                  <select
                    className="form-select"
                    value={question.rightAnswer || ''}
                    onChange={(e) =>
                      handleQuestionChange(index, 'rightAnswer', e.target.value)
                    }
                  >
                    <option value="" disabled>Виберіть правильну відповідь</option>
                    {question.options?.map((option, optionIndex) => (
                      <option
                        key={optionIndex}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              }

              <label className="form-label">Фото або Відео:</label>
              {/* <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  handleQuestionChange(index, 'media', {
                    ...question.media,
                    video: e.target.files,
                  })
                }
              />
              <p>OR</p> */}
              <input
                className="form-input"
                type="text"
                placeholder='Вставте посилання на відео сюди'
                onChange={(e) =>
                  handleQuestionChange(index, 'media', e.target.value)
                }
              />
            </div>
          ))}

          {/* <button type="button">Додати питання</button> */}
          <button
            type="button"
            onClick={addQuestion}
            className="button add-btn"
          >
            Додати питання
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="button clear-btn"
          >
            Очистити форму
          </button>
          <button
            type="submit"
            className="button submit-btn"
          >
            Зберегти квест
          </button>
        </form>
      </div>
    </div>
  );
};
