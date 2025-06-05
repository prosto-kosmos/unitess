import { EventType } from '../constants/event-type.contant';

export type IEvent = ISportEvent | IMusicEvent;

export interface IEventBase {
  id: string;
  name: string;
  type: EventType;
  description: string;
  place: string;
}

export interface ISportEvent extends IEventBase {
  type: 'sport';
  amount: number;
}

export interface IMusicEvent extends IEventBase {
  type: 'music';
  genre: string;
}
