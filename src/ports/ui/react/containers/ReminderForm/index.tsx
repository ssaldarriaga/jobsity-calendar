import { connect } from 'react-redux';
import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col, Alert } from 'reactstrap';

// Components
import { CityInput } from '../../components/CityInput';
import { InputFormGroup } from '../../components/Input';
import { ColorPicker } from '../../components/ColorPicker';
import { DateTimePicker } from '../../components/DateTimePicker';
import { Reminder } from '../../../../../domain/entities/reminderEntities';
import { validateReminder } from '../../../../../domain/services/reminderService';

// Utils
import { REMINDER_MODEL_DATA } from '../../../../../domain/data/reminderData';

// Redux
import * as reminderActions from '../../../../redux/actions/reminderActions';

interface IReminderFormContainer {
  initialValues?: Reminder;
  formId: string;
  manageReminder?: (reminder: Reminder) => void;
  afterSubmit?: () => void;
}

const ReminderForm: FC<IReminderFormContainer> = ({
  manageReminder = () => {},
  initialValues = REMINDER_MODEL_DATA,
  formId,
  afterSubmit = () => {},
}) => {
  const handleSubmit = async (reminder: Reminder) => {
    await manageReminder(reminder);
    afterSubmit();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateReminder}>
      <Form id={formId}>
        <Row>
          <Col>
            <Field
              key="description"
              label="Description"
              id="description"
              name="description"
              maxLength={30}
              component={InputFormGroup}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Field label="Date (MM/DD/YYYY HH:mm)" id="timestamp" name="timestamp" component={DateTimePicker} />
          </Col>
          <Col>
            <Field label="Color" id="color" name="color" component={ColorPicker} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Field label="City" id="city" name="city" component={CityInput} />
          </Col>
        </Row>
        {Boolean(initialValues.weatherForest) && (
          <Row>
            <Col>
              <Field
                readOnly
                id="weatherForest"
                name="weatherForest"
                label="Weather forest"
                component={InputFormGroup}
              />
            </Col>
          </Row>
        )}
      </Form>
    </Formik>
  );
};

export const ReminderFormContainer = connect(null, {
  manageReminder: (reminder: Reminder) => reminderActions.manageReminder(reminder),
})(ReminderForm);
