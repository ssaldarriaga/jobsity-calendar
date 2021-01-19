import MockDate from 'mockdate';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';

// Component
import { App } from './App';

// Utils
import { THEME } from '../../../domain/styles/theme';
import { cityResponseData } from '../../../testFactories/city';
import { weatherResponseData } from '../../../testFactories/weather';

// Redux
import { store } from '../../redux/store';

global.WEATHER_API_KEY = '';

beforeEach(() => {
  MockDate.set(1611023883000);

  fetchMock.get('begin:http://geodb-free-service.wirefreethought.com', cityResponseData);
  fetchMock.get('begin:https://api.weatherapi.com/v1/history', weatherResponseData);
});

afterEach(() => {
  MockDate.reset();
  fetchMock.reset();

  fetchMock.restore();
});

test('should show the month January with 42 days', () => {
  const { getByText, container } = render(
    <Provider store={store}>
      <ThemeProvider theme={THEME.dark}>
        <App />
      </ThemeProvider>
    </Provider>,
  );

  expect(getByText('January 2021')).not.toBeNull();
  expect(container.querySelectorAll('button')).toHaveLength(42);
});

test('Should validate reminder form and check input error messages and should save a new reminder', async () => {
  const { getByText, getByRole, queryByRole } = render(
    <Provider store={store}>
      <ThemeProvider theme={THEME.dark}>
        <App />
      </ThemeProvider>
    </Provider>,
  );

  // Select the day and wait for the modal
  fireEvent.click(getByText('Feb 1'));
  const modal = await waitFor(() => getByRole('document'));

  // Check input errors
  const utilsModal = within(modal);
  fireEvent.click(utilsModal.getByText('Save'));
  await waitFor(() => utilsModal.getByText(/Description length must be between 1 and 30 characters/));
  expect(utilsModal.getByText(/Pleaty type a valid city/)).not.toBeNull();

  // Fill description input
  fireEvent.change(utilsModal.getByLabelText('Description'), { target: { value: 'This is a fake description' } });
  await waitForElementToBeRemoved(() =>
    utilsModal.queryByText(/Description length must be between 1 and 30 characters/),
  );

  // Check description error with description 31 chars length
  fireEvent.change(utilsModal.getByLabelText('Description'), { target: { value: 'This is a fake description extra' } });
  await waitFor(() => utilsModal.getByText(/Description length must be between 1 and 30 characters/));

  // Fill description input
  fireEvent.change(utilsModal.getByLabelText('Description'), { target: { value: 'This is a fake description' } });
  await waitForElementToBeRemoved(() =>
    utilsModal.queryByText(/Description length must be between 1 and 30 characters/),
  );

  // Fill city input
  fireEvent.change(utilsModal.getByLabelText('City'), { target: { value: 'Abu Dhabi' } });
  await waitForElementToBeRemoved(() => utilsModal.queryByText(/Pleaty type a valid city/));

  // Save reminder
  fireEvent.click(utilsModal.getByText('Save'));
  await waitForElementToBeRemoved(() => queryByRole('document'));

  // Check remider data
  expect(getByText('21:38 - This is a fake description')).not.toBeNull();
  expect(getByText('Abu Dhabi')).not.toBeNull();
  expect(getByText('Sunny')).not.toBeNull();
});
