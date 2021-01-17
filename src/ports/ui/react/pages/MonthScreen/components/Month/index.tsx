import { FC } from 'react';
import styled from 'styled-components';

const MonthContainer = styled.section<{ rows: number }>`
  border-left: 1px solid ${({ theme }) => theme.header};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 50px repeat(${({ rows }) => rows}, 1fr);
  height: 100%;
`;

interface IMonth {
  rows: number;
}

export const Month: FC<IMonth> = ({ rows, children }) => <MonthContainer rows={rows}>{children}</MonthContainer>;
