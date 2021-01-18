import styled from 'styled-components';
import { Label as RLabel } from 'reactstrap';

export const Label = styled(RLabel)`
  color: ${({ theme }) => theme.header};
  font-size: 0.875rem;
  font-weight: 600;
`;
