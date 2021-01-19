import styled from 'styled-components';
import { MouseEvent, FC } from 'react';
import tinycolor from 'tinycolor2';

// Utils
import { THEME } from '../../../../../../../domain/styles/theme';

const Container = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border-radius: 4px;
  color: ${({ color }) => getContrastColor(color)};
  display: flex;
  flex-direction: row;
  font-weight: 500;
  font-size: 0.875rem;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
  width: 100%;

  & > strong {
    opacity: 0;
    transition: opacity 250ms ease;
  }

  &:hover > strong {
    opacity: 1;
  }
`;

const ReminderText = styled.span`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;

  & div {
    margin: 0;
    display: flex;
    justify-content: space-between;

    & > span {
      flex: 1 1 0;
    }
  }
`;

const getContrastColor = (color: string): string => {
  const newColor = tinycolor(color);
  if (newColor.isDark()) {
    return THEME.dark.secondaryText;
  }

  return THEME.dark.header;
};

interface IReminderButton {
  title: string;
  city: string;
  weather: string;
  color: string;
  onClick: (ev: MouseEvent) => void;
}

export const ReminderButton: FC<IReminderButton> = ({ title, city, weather, color, onClick }) => (
  <Container onClick={onClick} role="button" tabIndex={0} color={color}>
    <ReminderText>
      <div>{title}</div>
      <div>
        <span className="text-truncate">
          <strong>City:</strong> {city}
        </span>
        <span className="text-truncate">
          <strong>Weather:</strong> {weather}
        </span>
      </div>
    </ReminderText>
    <strong className="mr-1">Edit</strong>
  </Container>
);
