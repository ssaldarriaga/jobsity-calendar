import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 60px;
  background: ${({ theme }) => theme.header};
  box-shadow: 0px 3px 5px 0px ${({ theme }) => theme.shadow};
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 1rem;
`;

export const Header: React.FC = ({ children }) => (
  <StyledHeader>
    <Container>{children}</Container>
  </StyledHeader>
);
