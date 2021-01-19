import styled from 'styled-components';
import {
  Modal as RModal,
  ModalHeader as RModalHeader,
  ModalBody as RModalBody,
  ModalFooter as RModalFooter,
} from 'reactstrap';

export const Modal = styled(RModal).attrs({
  keyboard: false,
  backdrop: 'static',
  autoFocus: false,
  returnFocusAfterClose: false,
})`
  font-size: 1rem;
`;

export const ModalHeader = styled(RModalHeader)`
  background: ${({ theme }) => theme.header};
  border: none;
  color: ${({ theme }) => theme.secondaryText};

  & h5 {
    font-size: 1rem;
    font-weight: 600;
  }

  & button {
    color: ${({ theme }) => theme.secondaryText};
  }
`;

export const ModalBody = styled(RModalBody)`
  background: ${({ theme }) => theme.secondaryText};
`;

export const ModalFooter = styled(RModalFooter)`
  background: ${({ theme }) => theme.secondaryText};
`;
