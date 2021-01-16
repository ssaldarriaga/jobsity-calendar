import styled, { css } from 'styled-components';

const buttonStyles = css`
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const primaryButtonStyles = css`
  ${buttonStyles}
  background: ${({ theme }) => theme.primaryButton};
  border: 1px solid ${({ theme }) => theme.primaryButton};
  color: ${({ theme }) => theme.primaryText};
  font-size: 1rem;
  font-weight: 500;
  height: 40px;
  padding: 0 1rem;
`;

const PrimaryButton = styled.button`
  ${primaryButtonStyles}
  font-size: 1rem;
  height: 40px;
  padding: 0 1rem;
`;

const PrimarySmallButton = styled.button`
  ${primaryButtonStyles}
  font-size: 0.875rem;
  height: 30px;
  padding: 0 0.5rem;
`;

const ClearButton = styled.button`
  ${buttonStyles}
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1rem;
  font-weight: 500;
  height: 40px;
  min-width: 40px;
  padding: 0 1rem;
`;

export { PrimaryButton, PrimarySmallButton, ClearButton };
