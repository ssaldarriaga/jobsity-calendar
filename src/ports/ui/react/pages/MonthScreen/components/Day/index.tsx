import { FC } from 'react';
import styled from 'styled-components';

const DayContainer = styled.button`
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.header};
  border-left: none;
  border-right: 1px solid ${({ theme }) => theme.header};
  border-top: none;
  cursor: pointer;
  display: flex;
  outline: none;

  &:hover {
    background: #1d2d500d;
  }
`;

const Title = styled.h4<{ isInCurrentMonth: boolean }>`
  align-items: center;
  color: ${({ theme }) => theme.header};
  display: flex;
  margin: 0;
  height: 30px;
  justify-content: center;
  opacity: ${({ isInCurrentMonth }) => (isInCurrentMonth ? 1 : 0.5)};
  text-align: center;
  width: 100%;
`;

interface IDay {
  title: string;
  isInCurrentMonth: boolean;
}

export const Day: FC<IDay> = ({ title, isInCurrentMonth }) => (
  <DayContainer>
    <Title isInCurrentMonth={isInCurrentMonth}>{title}</Title>
  </DayContainer>
);
