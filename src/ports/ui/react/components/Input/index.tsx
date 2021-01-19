import { FC } from 'react';
import { FieldProps } from 'formik';
import styled from 'styled-components';
import { Input as RInput, FormGroup, InputProps } from 'reactstrap';

// Components
import { Label } from '../Label';
import { ErrorMessage } from '../ErrorMessage';

interface IInputFormGroup {
  label: string;
  id: string;
  list: string;
}

const Em = styled.em`
  font-size: 0.875rem;
`;

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Input = styled(RInput)`
  background: ${({ theme }) => theme.secondaryText}a0;
  border: 1px solid ${({ theme }) => theme.header}af;
  color: ${({ theme }) => theme.header}af;

  &:focus,
  &[readonly] {
    background: ${({ theme }) => theme.secondaryText}a0;
  }

  &,
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const InputFormGroup: FC<IInputFormGroup & InputProps & FieldProps> = ({
  label,
  id,
  list,
  field = { name: '' },
  form: { errors = {} } = {},
  ...rest
}) => (
  <FormGroup>
    <LabelContainer>
      <Label for={id}>{label}</Label>
      {rest.maxLength && (
        <Em>
          {field.value.toString().length}/{rest.maxLength}
        </Em>
      )}
    </LabelContainer>
    <Input id={id} list={list} {...field} {...rest} />
    {Boolean(errors[field?.name]) && <ErrorMessage>{errors[field?.name]}</ErrorMessage>}
  </FormGroup>
);
