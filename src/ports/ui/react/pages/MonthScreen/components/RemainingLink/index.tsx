import { FC, MouseEvent } from 'react';
import styled from 'styled-components';

const Link = styled.div`
  width: 100%;
  height: 25px;
  color: ${({ theme }) => theme.header};
  text-decoration: underline;
`;

interface IRemainingLink {
  onClick: (ev: MouseEvent) => void;
}

export const RemainingLink: FC<IRemainingLink> = ({ children, onClick }) => (
  <Link role="button" tabIndex={0} onClick={onClick}>
    {children}
  </Link>
);
