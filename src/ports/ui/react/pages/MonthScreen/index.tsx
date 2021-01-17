import moment from 'moment';
import { useMemo, FC } from 'react';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import { Day } from './components/Day';
import { Month } from './components/Month';
import { DayTitle } from './components/DayTitle';
import { HeaderContainer } from '../../containers/Header';

// Utils
import { DAYS } from '../../../../../domain/data/monthData';
import { validateDate } from '../../../../../domain/services/monthService';
import { MonthDays, MonthParamsType } from '../../../../../domain/entities/monthEntities';

// Redux
import { ReducerType } from '../../../../redux/utils/redux';
import * as monthActions from '../../../../redux/actions/monthActions';

const Container = styled.section`
  height: calc(100vh - 100px);
  padding: 1rem;
`;

const date = moment();
const titles = DAYS.map((day) => <DayTitle key={day} title={day} />);

interface IMonthComponent {
  loadMonthData: (month: string, year: string, day: string) => void;
  days: MonthDays;
}

const MonthComponent: FC<IMonthComponent> = ({ loadMonthData, days }) => {
  const params = useParams<MonthParamsType>();
  const dates = useMemo(() => Object.keys(days), [days]);

  useLayoutEffect(() => {
    loadMonthData(params.month, params.year, params.day);
  }, [params, loadMonthData]);

  return (
    <>
      <HeaderContainer />
      {dates.length && (
        <Container>
          <Month rows={dates.length / DAYS.length}>
            {titles}
            {dates.map((key) => (
              <Day
                key={key}
                id={days[key].id}
                title={days[key].title}
                reminders={days[key].reminders}
                isInCurrentMonth={days[key].isInCurrentMonth}
              />
            ))}
          </Month>
        </Container>
      )}
      {dates.length === 0 && !validateDate(params.month, params.year, params.day) && (
        <Redirect to={`/month/${date.year()}/${date.month() + 1}/${date.date()}`} />
      )}
    </>
  );
};

const mapStateToProps = ({ month }: ReducerType) => ({
  days: month.days,
});

export const MonthScreen = connect(mapStateToProps, {
  loadMonthData: (month: string, year: string, day: string) => monthActions.loadMonthData(month, year, day),
})(MonthComponent);
