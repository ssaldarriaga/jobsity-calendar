export type Reminder = {
  id: string;
  day: string;
  timestamp: number;
  time: { date: string; time: string };
  description: string;
  city: {
    country: string;
    city: string;
  };
  weatherForest: string;
  color: string;
};

export type ReminderAction<T, P = unknown> = {
  type: T;
  payload: P;
};
