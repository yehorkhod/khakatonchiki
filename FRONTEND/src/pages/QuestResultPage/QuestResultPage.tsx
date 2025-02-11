import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './QuestResultPage.scss';

export const QuestResultPage = () => {
  const { id } = useParams();

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const feedbackData = {
      questId: id,
      rating,
      comment,
    };

    try {
      // const response = await fetch("https://api.example.com/quest-feedback", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(feedbackData),
      // });

      // if (!response.ok) {
      //   throw new Error("Помилка при відправці відгуку");
      // }

      console.log(feedbackData);
      navigate('/quests')
      // setRating(null);
      // setComment("");
    } catch (error) {
      console.error("❌ Не вдалося відправити відгук:", error);
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
              className={`star-btn ${rating === star ? "selected" : ""}`}
              onClick={() => setRating(star)}
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