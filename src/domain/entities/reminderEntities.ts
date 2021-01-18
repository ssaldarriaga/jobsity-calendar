export type Reminder = {
  id: string;
  timestamp: number;
  time: { date: string; time: string };
  description: string;
  city: {
    idCountry: string;
    country: string;
    idCity: string;
    city: string;
  };
  weatherForest: string;
  color: string;
};

export type ReminderAction<T, P = unknown> = {
  type: T;
  payload: P;
};
