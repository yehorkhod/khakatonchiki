import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Quest } from '../../types/quest';
import { getQuestsWithIds } from '../../fetch/getQuests';
import './DoQuestPage.scss';

export const DoQuestPage = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [progress, setProgress] = useState<{ [key: number]: boolean | null }>({});


  const handleAnswerChange = (index: number, value: string) => {
    setAnswers({ ...answers, [index]: value });
  }

  const submitAnswer = (index: number) => {
    const userAnswer = answers[index];
    const correctAnswer = quest?.questions[index].rightAnswer;

    console.log(quest?.id, index, userAnswer); // send answer to server

    const isCorrect = userAnswer === correctAnswer;
    setProgress({ ...progress, [index]: isCorrect });
  }
 
  useEffect(() => {
    setIsLoading(true);
    getQuestsWithIds()
      .then((data) => {
        setQuest(data.find((q) => q.id === id) || null);
      })
      .catch(() => setError('something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(quest);
  return (
    <div className="page container">
      <h1 className="title">{quest?.title}</h1>
      <p className="description">{quest?.description}</p>
      <div className="question-section">
        {quest?.questions?.map((question, index) => (
          <div
            key={index}
            className="question-block"
          >
            <p className="question">{question.text}</p>
            <>
              {question.type === 'open' ?
                <textarea
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Введіть вашу відповідь"
                  disabled={progress[index] !== undefined}
                ></textarea>
                : (
                  <div className="options">
                    {question.options?.map((option, i) => (
                      <label key={i} className="option-label">
                        <input type="radio"
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
                )}
              <button onClick={() => submitAnswer(index)} className="submit-btn">
              Відправити відповідь
              </button>

              {progress[index] !== undefined && (
              <p className={`progress ${progress[index] ? "correct" : "incorrect"}`}>
                {progress[index] ? "✅ Правильно" : "❌ Неправильно"}
              </p>
            )}
            {progress[index] === false && (
              <p className="correct-answer">✅ Правильна відповідь: {quest.questions[index].rightAnswer}</p>
            )}
            </>
          </div>
        ))}
      </div>
      <Link to={`/quest/${id}/result`}>
        <button className='finish-btn'>Завершити</button>
      </Link>
    </div>
  );
};

{
  /* <div className="media-item">
                {quest.media[index].type === "image" && (
                  <img src={quest.media[index].content} alt="Quest visual" />
                )}
                {quest.media[index].type === "video" && (
                  <video controls>
                    <source src={quest.media[index].content} type="video/mp4" />
                    Ваш браузер не підтримує відео.
                  </video>
                )}
              </div> */
}
