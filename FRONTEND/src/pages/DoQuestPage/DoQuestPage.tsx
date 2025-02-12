import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  finishQuest,
  getTasks,
  getTasksType,
} from '../../fetch/getQuests';
import './DoQuestPage.scss';
import { Loader } from '../../components/Loader/Loader';

export const DoQuestPage = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState<getTasksType | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [progress, setProgress] = useState<{ [key: number]: boolean | null }>(
    {},
  );

  const navigate = useNavigate();

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers({ ...answers, [index]: value });
  };

  const submitAnswer = (index: number) => {
    const userAnswer = answers[index];
    const correctAnswer = quest?.tasks[index].content.rightAnswer;

    console.log(quest?.quest_id, index, userAnswer);

    const isCorrect = userAnswer === correctAnswer;
    setProgress({ ...progress, [index]: isCorrect });
  };

  const handleFinish = async () => {
    if (!id) return;
    const result = await finishQuest(id);
    console.log(result, 'resultiki');
    if (result) {
      console.log(result.message); // "Session created successfully"
      console.log('questId----', id);
      navigate(`/quest/${id}/result`);
    } else {
      alert('Сталася помилка при завершенні квесту.');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!id) return;

    getTasks(id)
      .then((data) => {
        console.log('dataa', data);
        setQuest(data);
      })
      .catch(() => setError('something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(quest, 'quesseeertrttt');

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {isLoading ?
        <Loader />
      : <>
          <div className="page container">
            {/* <h1 className="title">{quest?.title}</h1> */}
            <div className="page-header">
              <h1 className="title">{quest?.title}</h1>
              <div className="progress-indicator">
                {Object.values(progress).filter((p) => p !== undefined).length}/
                {quest?.tasks?.length}
              </div>
            </div>
            {/* <p className="description">{quest?.description}</p> */}

            <div className="question-section">
              {quest?.tasks?.map((question, index) => (
                <div
                  key={index}
                  className="question-block"
                >
                  <p className="question">{question.content.text}</p>
                  {question.content.media && (
                    <p className="description">
                      Пропрацюй цей ресурс, це тобі допоможе:{' '}
                      {question.content.media}
                    </p>
                  )}
                  <>
                    {question.content.type === 'open' ?
                      <textarea
                        value={answers[index] || ''}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                        placeholder="Введіть вашу відповідь"
                        disabled={progress[index] !== undefined}
                      ></textarea>
                    : <div className="options">
                        {question.content.options?.map((option, i) => (
                          <label
                            key={i}
                            className="option-label"
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              checked={answers[index] === option}
                              onChange={() => handleAnswerChange(index, option)}
                              disabled={progress[index] !== undefined}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    }
                    <button
                      onClick={() => submitAnswer(index)}
                      className="submit-btn"
                    >
                      Відправити відповідь
                    </button>

                    {question.content.type !== 'open' && (
                      <>
                        {progress[index] !== undefined && (
                          <p
                            className={`progress ${progress[index] ? 'correct' : 'incorrect'}`}
                          >
                            {progress[index] ?
                              '✅ Правильно'
                            : '❌ Неправильно'}
                          </p>
                        )}
                        {progress[index] === false && (
                          <p className="correct-answer">
                            ✅ Правильна відповідь:{' '}
                            {quest.tasks[index].content.rightAnswer}
                          </p>
                        )}
                      </>
                    )}
                  </>
                </div>
              ))}
            </div>
            {/* <Link to={`/quest/${id}/result`}> */}
            <button
              className="finish-btn"
              onClick={handleFinish}
            >
              Завершити
            </button>
            {/* </Link> */}
          </div>
        </>
      }
    </>
  );
};

{
  /* <div className="page container">
                <h1 className="title">В квесті {quest?.title} поки немає питань</h1>
                <div className="wrapper-button">
                <Link to={'/quests'} className="home-link center">
                  Перейти до всіх квестів
                </Link>
                </div> */
}
// </div>
