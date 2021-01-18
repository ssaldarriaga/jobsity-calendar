import styled from 'styled-components';
import { FC, ButtonHTMLAttributes, MouseEvent } from 'react';

const DayContainer = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.header};
  border-left: none;
  border-right: 1px solid ${({ theme }) => theme.header};
  border-top: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  outline: none;

  &:hover {
    background: #1d2d500d;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h4<{ isInCurrentMonth: boolean; isHolliday: boolean; isCurrentDay: string }>`
  align-items: center;
  color: ${({ theme }) => theme.header};
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  height: 30px;
  justify-content: center;
  opacity: ${({ isInCurrentMonth, isHolliday, isCurrentDay }) =>
    (isInCurrentMonth && !isHolliday) || isCurrentDay ? 1 : 0.5};
  text-align: center;
  width: 100%;

  & em {
    ${({ isCurrentDay, theme }) =>
      isCurrentDay &&
      `   
        align-items: center;
        background: ${theme.header};
        border-radius: 12px;
        color: ${theme.secondaryText};
        display: flex;
        font-size:0.875rem;
        height: 25px;
        justify-content: center;
        width: 25px;
      `}
  }
`;

interface IDay {
  title: string;
  isInCurrentMonth: boolean;
  isHolliday: boolean;
  isCurrentDay: boolean;
  onClick: (ev: MouseEvent) => void;
}

export const Day: FC<IDay> = ({ title, isInCurrentMonth, onClick, children, isHolliday, isCurrentDay }) => (
  <DayContainer onClick={onClick}>
    <Title isInCurrentMonth={isInCurrentMonth} isHolliday={isHolliday} isCurrentDay={isCurrentDay}>
      <em>{title}</em>
    </Title>
    {children}
  </DayContainer>
);
