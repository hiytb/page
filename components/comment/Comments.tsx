import { useEffect, useState } from 'react';
import CommentCards from './CommentCards';
import CommentWrite from './CommentWrite';

export interface IComment {
  id: number;
  author: string;
  createAt: string;
  commentBody: string;
  password: string;
}

interface IProps {
  payload: {
    comments: IComment[];
  };
  loading: boolean;
  error: string;
}

export default function Comments({ payload, loading, error }: IProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    if (payload.comments) {
      setComments(payload.comments);
    }
  }, [payload]);
  return (
    <div>
      <CommentWrite setComments={setComments} />
      {comments && <CommentCards comments={comments} setComments={setComments} />}
    </div>
  );
}
