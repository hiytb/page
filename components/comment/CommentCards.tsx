import React, { useState } from 'react';
import styled from 'styled-components';
import CommentEditModal from './CommentEditModal';
import CommentHeader from './CommentHeader';
import { IComment } from './Comments';

interface CommentCardsProps {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export default function CommentCards({ comments, setComments }: CommentCardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<IComment>();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <CommentHeader comment={comment} setModalInfo={setModalInfo} setIsModalOpen={setIsModalOpen} />
          <p>{comment.commentBody}</p>
        </Comment>
      ))}
      {isModalOpen && modalInfo && (
        <CommentEditModal
          commentInfo={modalInfo}
          isModalOpen={isModalOpen}
          setComments={setComments}
          toggleModal={toggleModal}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 5rem;
  width: 100%;
`;

const Comment = styled.div`
  padding: 1rem 0rem;
  position: relative;
  &:not(&:last-child) {
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.6rem;
    line-height: 1.8rem;
  }
`;
