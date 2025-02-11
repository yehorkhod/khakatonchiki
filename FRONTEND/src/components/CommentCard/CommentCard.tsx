import React from "react";
import './CommentCard.scss';
import { Link } from "react-router-dom";

type Props = {
  id: string;
  author: string;
  avatar: string;
  text: string;
}

export const CommentCard: React.FC<Props> = ({ id, author, avatar, text}) => {
  return (
    <div className="comment-card">
      <img src={avatar} alt={author} className="comment-avatar" />
      <div className="comment-content">
        <Link to={`/profile/${id}`}>
          <h3 className="comment-username">{author}</h3>
        </Link>
        <p className="comment-text">{text}</p>
      </div>
    </div>
  )
}