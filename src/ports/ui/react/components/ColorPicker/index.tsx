import { FC, useState } from 'react';
import { Popover } from 'reactstrap';
import styled from 'styled-components';
import { SketchPicker, ColorResult } from 'react-color';
import { FieldInputProps, useFormikContext } from 'formik';

// Components
import { Label } from '../Label';

const Color = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: 3px;
  height: 20px;
  margin-right: 0.5rem;
  width: 20px;
`;

const ColorContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.secondaryText}a0;
  border: 1px solid ${({ theme }) => theme.header}af;
  color: ${({ theme }) => theme.header}af;
  cursor: pointer;
  display: flex;

  &:focus {
    background: ${({ theme }) => theme.secondaryText}a0;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IColorPicker {
  label: string;
  field: FieldInputProps<string>;
}

export const ColorPicker: FC<IColorPicker> = ({ field: { name, value }, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setFieldValue } = useFormikContext();

  const handleColorCange = (value: ColorResult) => {
    setFieldValue(name, value.hex);
    setIsOpen(false);
  };

  return (
    <div className="form-group">
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <ColorContainer className="form-control" id={name} role="button" tabIndex={0} onClick={() => setIsOpen(true)}>
        <Color color={value} /> <span>{value}</span>
      </ColorContainer>
      <Popover isOpen={isOpen} toggle={() => setIsOpen(false)} target={name} placement="bottom">
        <SketchPicker disableAlpha color={'#ffffff'} onChangeComplete={handleColorCange} />
      </Popover>
    </div>
  );
};
