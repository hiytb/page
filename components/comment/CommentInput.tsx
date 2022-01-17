import React from 'react';
import styled from 'styled-components';
import media from '../../styles/media';
import { useInput } from './hooks/useInput';

interface CommentInputProps {
  onSubmit: (commentInfo: { author: string; commentBody: string; password: string }) => void;
  initialName?: string;
  initialBody?: string;
  isModalOpen?: boolean;
  deleteComment?: (password: string) => void;
  toggleModal?: () => void;
}

export default function CommentInput({
  onSubmit,
  initialName,
  initialBody,
  isModalOpen,
  deleteComment,
  toggleModal,
}: CommentInputProps) {
  const nameValidator = (value: string) => value.length < 3;
  const passwordValidator = (value: string) => value.length < 6;
  const name = useInput(initialName ?? '', nameValidator);
  const password = useInput('', passwordValidator);
  const commentBody = useInput(initialBody ?? '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.value.length < 3 || password.value.length < 6 || commentBody.value.length < 10) {
      return;
    }
    const commentInfo = {
      author: name.value,
      commentBody: commentBody.value,
      password: password.value,
    };
    onSubmit(commentInfo);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input name='name' {...name} placeholder='이름' type='text' maxLength={15} />
        <Input name='password' {...password} placeholder='비밀번호' type='password' minLength={4} />
      </InputContainer>
      <TextareaWrapper>
        <textarea
          {...commentBody}
          minLength={10}
          placeholder='아직 서버 연결하지 않아서 작동하지 않습니다 😥'
        />
      </TextareaWrapper>
      <ButtonContainer>
        <SubmmitButton>{isModalOpen ? '수정' : '딸깍'}</SubmmitButton>
        {isModalOpen && deleteComment && (
          <>
            <DeleteButton onClick={() => deleteComment(password.value)}>삭제</DeleteButton>
            <CancelButton onClick={toggleModal}>취소</CancelButton>
          </>
        )}
      </ButtonContainer>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: 100%;
`;

const Input = styled.input`
  border: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  outline: none;
  ${media.xsmall} {
    width: 100%;
  }
  ${media.small} {
    min-width: 20rem;
    width: 20%;
  }
`;

const TextareaWrapper = styled.div`
  textarea {
    width: 100%;
    resize: none;
    height: 15rem;
    outline: none;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: white;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in;
  padding: 0.5rem;
  width: 10rem;
  ${media.xsmall} {
    width: 100%;
  }
  ${media.small} {
    min-width: 10rem;
    width: 15%;
  }
`;

const SubmmitButton = styled(Button)`
  &:hover {
    background-color: #0be881;
  }
  &:active {
    background-color: #8efcc9;
  }
`;

const DeleteButton = styled(Button)`
  &:hover {
    background-color: #ff9999;
  }
  &:active {
    background-color: #ffcbcb;
  }
`;

const CancelButton = styled(Button)`
  &:hover {
    background-color: #c9c9c9;
  }
  &:hover {
    background-color: #a9a9a9;
  }
`;
