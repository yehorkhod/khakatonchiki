import React from "react";
import './CommentCard.scss';

type Props = {
  author: string;
  avatar: string;
  text: string;
}

export const CommentCard: React.FC<Props> = ({ author, avatar, text}) => {
  return (
    <div className="comment-card">
      <img src={avatar} alt={author} className="comment-avatar" />
      <div className="comment-content">
        <h3 className="comment-username">{author}</h3>
        <p className="comment-text">{text}</p>
      </div>
    </div>
  )
}