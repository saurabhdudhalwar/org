export type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DayHours =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;
export interface CellRenderedProps {
  day: Date;
  start: Date;
  end: Date;
  height: number;
  onClick(): void;
}

export interface IUserList {
  username: string;
  givenName: string;
  familyName: string;
  userStatus: string;
  userService: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
  nextLogin: any;
}

interface CalendarEvent {
  event_id: number | string;
  title: string;
  start: Date;
  end: Date;
  disabled?: boolean;
  color?: string;
  editable?: boolean;
  deletable?: boolean;
  draggable?: boolean;
  allDay?: boolean;
}
export type ProcessedEvent = CalendarEvent & Record<string, any>;
export type DefaultRecourse = {
  assignee?: string | number;
  text?: string;
  subtext?: string;
  avatar?: string;
  color?: string;
} & Record<string, any>;
