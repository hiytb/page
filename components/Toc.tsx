import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useIntersectionObserver } from '../hooks/\bhooks';

interface ITocProps {
  content: string;
}

interface IItemProps {
  depth: number;
  isSelected: boolean;
}

const Container = styled.div`
  position: fixed;
  right: 0;
  border-left: 1px solid white;
  max-width: 24rem;
  margin-right: 2rem;
  ul {
    display: flex;
    flex-direction: column;
  }
`;

const Item = styled.li<IItemProps>`
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.5rem;
  padding-left: ${(props) => `${props.depth}rem`};
  color: ${(props) => (props.isSelected ? '#FAF7FF' : '#BCBCBC')};
  transform: ${(props) => props.isSelected && 'scale(1.05)'};
  transform-origin: left;
  transition: all 0.3s;
`;

export default function Toc({ content }: ITocProps) {
  const [activeId, setActiveId] = useState('');
  useIntersectionObserver(setActiveId, content);
  const titles = content.split('\n').filter((t) => t.startsWith('#'));
  const result = titles.map((item) => {
    const depth = item.match(/#/g)?.length;
    return {
      title: item.substr(item.indexOf(' ')).trim().replace('\\', ''),
      depth,
    };
  });
  return (
    <Container>
      <ul>
        {result.map((item, index) => (
          <Link href={`#${item.title}`} key={item.title + index}>
            <a>
              <Item isSelected={true} depth={item.depth ?? 0}>
                {item.title}
              </Item>
            </a>
          </Link>
        ))}
      </ul>
    </Container>
  );
}