import moment from 'moment';
import { FC, useMemo } from 'react';
import { FormGroup } from 'reactstrap';
import MomentUtils from '@date-io/moment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { FieldInputProps, useFormikContext } from 'formik';
import { MuiPickersUtilsProvider, DateTimePicker as MuiDateTimePicker } from '@material-ui/pickers';

// Components
import { Label } from '../Label';
import { Input, LabelContainer } from '../Input';

// Utils
import { THEME } from '../../../../../domain/styles/theme';

interface IDateTimePicker {
  label: string;
  field: FieldInputProps<string>;
}

const PickerInput: FC<{ value: string; onClick: (ev: MouseEvent) => void }> = ({ value, onClick }) => (
  <Input readOnly value={value} onClick={onClick} />
);

export const DateTimePicker: FC<IDateTimePicker> = ({ field: { name, value }, label }) => {
  const { setFieldValue } = useFormikContext();
  const materialTheme = useMemo(() => {
    const background = THEME.dark.header;

    return createMuiTheme({
      overrides: {
        MuiSvgIcon: {
          root: {
            fill: THEME.dark.secondaryText,
          },
        },
      },
      palette: {
        primary: {
          main: background,
          contrastText: THEME.dark.secondaryText,
        },
        secondary: {
          main: THEME.dark.secondaryText,
        },
      },
    });
  }, []);

  const handleDateTimeChange = (value: moment.Moment | null) => {
    if (value) {
      setFieldValue(name, +value);
      setFieldValue('time', { date: value.format('MM/DD/YYYY'), time: value.format('HH:mm') });
    }
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <FormGroup>
        <LabelContainer>
          <Label for={name}>{label}</Label>
        </LabelContainer>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <MuiDateTimePicker
            value={value === '' ? null : value}
            onChange={handleDateTimeChange}
            format="MM/DD/YYYY HH:mm"
            // @ts-ignore
            TextFieldComponent={PickerInput}
          />
        </MuiPickersUtilsProvider>
      </FormGroup>
    </ThemeProvider>
  );
};
