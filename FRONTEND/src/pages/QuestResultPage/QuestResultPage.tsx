import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './QuestResultPage.scss';
import { leaveReview } from "../../fetch/review";

export const QuestResultPage = () => {
  const { id } = useParams();

  const [rating, setRating] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const feedbackData = {
      questId: id,
      rating,
      comment,
    };

    console.log(feedbackData);

    if (!id) return;
    const result = await leaveReview(id, rating, comment);
    console.log('result', result);
    if (result) {
      console.log(result.message); 
      setRating(null);
      setComment("");
      navigate('/quests');
    } else {
      alert('Помилка під час залишення відгуку.');
    }
  };

  return (
    <div className="page container">
      <h1 className="title">Дякую за те, що пройшов наш квест!</h1>
      <p className="subtitle">Поділись своїми враженнями!</p>
      <div className="feedback-section">
        <label className="rating-label">Оцінка квесту:</label>
        <div className="rating">
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star-btn ${rating === String(star) ? "selected" : ""}`}
              onClick={() => setRating(String(star))}
            >
              {star} ⭐
            </button>
          ))}
        </div>

        <textarea
          className="comment-box"
          placeholder="Напишіть ваш коментар..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button className="submit-btn" onClick={handleSubmit}>
          Відправити відгук
        </button>
      </div>
    </div>
  )
}