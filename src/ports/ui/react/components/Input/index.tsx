import { FC } from 'react';
import { FieldInputProps } from 'formik';
import styled from 'styled-components';
import { Input as RInput, FormGroup, InputProps } from 'reactstrap';

// Components
import { Label } from '../Label';

interface IInputFormGroup {
  label: string;
  id: string;
  name: string;
  field: FieldInputProps<string>;
}

const Em = styled.em`
  font-size: 0.875rem;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Input = styled(RInput)`
  background: ${({ theme }) => theme.secondaryText}a0;
  border: 1px solid ${({ theme }) => theme.header}af;
  color: ${({ theme }) => theme.header}af;

  &:focus {
    background: ${({ theme }) => theme.secondaryText}a0;
  }

  &,
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const InputFormGroup: FC<IInputFormGroup & InputProps> = ({ label, id, name, field, ...rest }) => (
  <FormGroup>
    <LabelContainer>
      <Label for={id}>{label}</Label>
      {rest.maxLength && (
        <Em>
          {field.value.toString().length}/{rest.maxLength}
        </Em>
      )}
    </LabelContainer>
    <Input id={id} {...field} {...rest} />
  </FormGroup>
);
