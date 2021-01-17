import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  align-items: center;
  background: ${({ theme }) => theme.header};
  border-bottom: 1px solid ${({ theme }) => theme.header};
  border-right: 1px solid ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.secondaryText};
  display: flex;
  justify-content: center;
`;

const Title = styled.h4`
  margin: 0;
`;

interface IDayTitle {
  title: string;
}

export const DayTitle: FC<IDayTitle> = ({ title }) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);
