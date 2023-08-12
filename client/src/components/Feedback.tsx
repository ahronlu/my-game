import React, { useEffect } from "react";
import { MESSAGE_TYPE } from "../const";

interface FeedbackProps {
  feedback: {
    message: string;
    type: string;
  };
  setFeedback: React.Dispatch<
    React.SetStateAction<{
      message: string;
      type: string;
    } | null>
  >;
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback, setFeedback }) => {
  useEffect(() => {
    let timer: any;
    if (feedback.type === MESSAGE_TYPE.success) {
      timer = setTimeout(() => setFeedback(null), 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [feedback, setFeedback]);

  return <p className={feedback.type}>{feedback.message}</p>;
};
