import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { dateToTimeFormatter } from '../../utils/utils';
import CommentInput from './CommentInput';
import { IComment } from './Comments';

interface IProps {
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

interface ICreateComment {
  (commentInfo: { author: string; commentBody: string; password: string }): void;
}

export default function CommentWrite({ setComments }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const createComment: ICreateComment = ({ author, commentBody, password }) => {
    if (!isLoading) {
      setIsLoading(true);
      const date = new Date();
      const newId = Date.now();
      fetch(`http://localhost:4000/posts/${slug}/comments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: newId,
          author,
          commentBody,
          createAt: dateToTimeFormatter(date),
          password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setComments((prev) => [
              ...prev,
              {
                id: newId,
                author,
                createAt: dateToTimeFormatter(date),
                commentBody,
                password,
              },
            ]);
            setIsLoading(false);
          } else {
            throw new Error('댓글을 등록하지 못하였습니다 😥');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container>
      <CommentInput onSubmit={createComment} />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10rem;
`;
