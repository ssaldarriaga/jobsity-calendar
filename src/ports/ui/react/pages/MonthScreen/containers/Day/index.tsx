import { FC, useState, useMemo, MouseEvent } from 'react';

// Components
import { Day } from '../../components/Day';
import { ReminderButton } from '../../components/Reminder';
import { PrimaryButton, ClearButton } from '../../../../components/Button';
import { ReminderFormContainer } from '../../../../containers/ReminderForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../../components/Modal';

// Domain
import { RemainingLink } from '../../components/RemainingLink';
import { Reminder } from '../../../../../../../domain/entities/reminderEntities';
import { Day as DayData } from '../../../../../../../domain/entities/dayEntities';

// Utils
import { formatDayId } from '../../../../../../../adapters/day';
import { THEME } from '../../../../../../../domain/styles/theme';
import { formatReminderMessage, getNewReminderForDate } from '../../../../../../../domain/services/reminderService';

interface IDayContainer {
  data: DayData;
}

export const DayContainer: FC<IDayContainer> = ({ data }) => {
  const currentDay = useMemo(formatDayId, []);
  const [modalViewRemindersIsOpen, setModalViewRemindersIsOpen] = useState(false);
  const remindersKey = useMemo(() => {
    const sortedReminders = Object.keys(data.reminders)
      .map((key) => data.reminders[key])
      .sort((first, second) => first.timestamp - second.timestamp)
      .map(({ id }) => id);
    return { visible: sortedReminders.slice(0, 3), remaining: sortedReminders.slice(3), all: sortedReminders };
  }, [data.reminders]);
  const [modalReminder, setModalReminder] = useState<{ isOpen: boolean; values?: Reminder | undefined }>({
    isOpen: false,
  });

  const toggleModal = (ev?: MouseEvent, reminder?: Reminder) => {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    setModalReminder((prev) => ({
      isOpen: !prev.isOpen,
      values: reminder,
    }));
  };

  const toggleViewRemindersModal = (ev?: MouseEvent) => {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    setModalViewRemindersIsOpen((prev) => !prev);
  };

  const handleCreateReminder = (ev?: MouseEvent) => {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    const reminder = getNewReminderForDate(data);
    setModalReminder({
      isOpen: true,
      values: reminder,
    });
  };

  return (
    <>
      <Day
        title={data.title}
        onClick={handleCreateReminder}
        isCurrentDay={data.id === currentDay}
        isInCurrentMonth={data.isInCurrentMonth}
        isHolliday={[0, 6].includes(data.dayOfWeek)}
      >
        {remindersKey.visible.map((key: string) => {
          const { color, weatherForest, city } = data.reminders[key];
          const title = formatReminderMessage(data.reminders[key]);

          return (
            <ReminderButton
              key={key}
              title={title}
              color={color}
              city={city.city}
              weather={weatherForest}
              onClick={(ev) => toggleModal(ev, data.reminders[key])}
            />
          );
        })}
        {remindersKey.remaining.length > 0 && (
          <RemainingLink onClick={toggleViewRemindersModal}>{`${remindersKey.remaining.length} more`}</RemainingLink>
        )}
      </Day>

      <Modal isOpen={modalReminder.isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Reminder</ModalHeader>
        <ModalBody>
          {modalReminder.isOpen && (
            <ReminderFormContainer formId="reminder" afterSubmit={toggleModal} initialValues={modalReminder?.values} />
          )}
        </ModalBody>
        <ModalFooter>
          <PrimaryButton type="submit" form="reminder">
            Save
          </PrimaryButton>
          <ClearButton type="button" onClick={toggleModal} color={THEME.dark.header}>
            Cancel
          </ClearButton>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalViewRemindersIsOpen} toggle={toggleViewRemindersModal}>
        <ModalHeader toggle={toggleViewRemindersModal}>Reminders</ModalHeader>
        <ModalBody>
          {remindersKey.all.map((key: string) => {
            const { color, weatherForest, city } = data.reminders[key];
            const title = formatReminderMessage(data.reminders[key]);

            return (
              <ReminderButton
                key={key}
                title={title}
                color={color}
                city={city.city}
                weather={weatherForest}
                onClick={(ev) => {
                  toggleModal(ev, data.reminders[key]);
                  toggleViewRemindersModal();
                }}
              />
            );
          })}
        </ModalBody>
        <ModalFooter>
          <PrimaryButton type="button" onClick={toggleViewRemindersModal}>
            Close
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    </>
  );
};
