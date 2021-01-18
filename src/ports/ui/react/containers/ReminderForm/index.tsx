import { connect } from 'react-redux';
import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col, Alert } from 'reactstrap';

// Components
import { InputFormGroup } from '../../components/Input';
import { Reminder } from '../../../../../domain/entities/reminderEntities';

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
  const handleSubmit = (reminder: Reminder) => {
    manageReminder(reminder);
    afterSubmit();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
          <Col>
            <Field label="Date (MM/DD/YYYY)" id="time.date" name="time.date" component={InputFormGroup} />
          </Col>
          <Col>
            <Field label="Time (HH::MM)" id="time.time" name="time.time" component={InputFormGroup} />
          </Col>
          <Col>
            <Field label="Color" id="color" name="color" component={InputFormGroup} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Field label="City" id="city.city" name="city.city" component={InputFormGroup} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Field readOnly id="weatherForest" name="weatherForest" label="Weather forest" component={InputFormGroup} />
          </Col>
        </Row>
        <Alert color="danger">Hello</Alert>
      </Form>
    </Formik>
  );
};

export const ReminderFormContainer = connect(null, {
  manageReminder: (reminder: Reminder) => reminderActions.manageReminder(reminder),
})(ReminderForm);
