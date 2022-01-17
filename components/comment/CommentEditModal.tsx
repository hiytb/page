import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import CommentInput from './CommentInput';
import { IComment } from './Comments';

interface IProps {
  commentInfo: IComment;
  isModalOpen: boolean;
  setComments: React.Dispatch<SetStateAction<IComment[]>>;
  toggleModal: () => void;
}
interface IEditComment {
  (commentInfo: { author: string; commentBody: string; password: string }): void;
}

export default function CommentEditModal({ commentInfo, isModalOpen, setComments, toggleModal }: IProps) {
  const { id: commentId, author, commentBody } = commentInfo;
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const url = `http://localhost:4000/posts/${slug}/${commentId}`;

  const editComment: IEditComment = ({ author, commentBody, password }) => {
    // TODO password validation back-end 로 옮길 예정으로 post method 로 백엔드로 password 함께 보내기
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.password)
      .then((correctPassword) => {
        if (correctPassword === password) {
          fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              ...commentInfo,
              commentBody,
              author,
            }),
          }).then((res) => {
            if (res.ok) {
              setComments((oldComments) => {
                const targetIndex = oldComments.findIndex((comment) => comment.id === commentId);
                const newComment = {
                  ...oldComments[targetIndex],
                  author,
                  commentBody,
                };
                return [
                  ...oldComments.slice(0, targetIndex),
                  newComment,
                  ...oldComments.slice(targetIndex + 1),
                ];
              });
            }
          });
        }
      });
    toggleModal();
  };

  const deleteComment = (password: string) => {
    // TODO password validation back-end 로 옮길 예정으로 post method 로 백엔드로 password 함께 보내기
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.password)
      .then((correctPassword) => {
        if (correctPassword === password) {
          fetch(url, { method: 'DELETE' }).then((res) => {
            if (res.ok) {
              setComments((oldComments) => {
                return oldComments.filter((comment) => comment.id !== commentId);
              });
            }
          });
        }
      });
    toggleModal();
  };

  return (
    <Overlay onClick={toggleModal}>
      <Container onClick={(event) => event.stopPropagation()}>
        <CommentInput
          onSubmit={editComment}
          initialBody={commentBody}
          initialName={author}
          isModalOpen={isModalOpen}
          deleteComment={deleteComment}
          toggleModal={toggleModal}
        />
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100rem;
  padding: 3rem;
  background-color: #2e3135;
  border-radius: 1rem;
  z-index: 1;
  overflow: hidden;
  animation: modal-bg-slow 0.3s ease-in-out;
  @keyframes modal-bg-slow {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0rem);
    }
  }
`;
