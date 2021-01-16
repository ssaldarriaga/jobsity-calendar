import styled from 'styled-components';

// Components
import { Subtitle } from '../../../../components/Subtitle';

const Img = styled.img.attrs({ src: '/calendar-512.webp', alt: 'Jobsity calendar' })`
  height: 45px;
  margin: 0 1rem;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 1rem;
`;

export const Logo = () => (
  <Container>
    <Img />
    <Subtitle>Calendar</Subtitle>
  </Container>
);
