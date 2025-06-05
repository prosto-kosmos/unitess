import { UUID } from 'angular2-uuid';
import {
  IEvent,
  IMusicEvent,
  ISportEvent,
} from '../interfaces/event.interface';

export const EVENTS_MOCK: IEvent[] = [...Array(8).keys()].map((idx) => {
  const id = idx + 1;

  const base = {
    id: UUID.UUID(),
    name: `Some event ${id}`,
    description: `Description for event ${id}`,
    place: `Plece for event ${id}`,
  };

  if (id % 2 === 0) {
    return {
      ...base,
      type: 'sport',
      amount: 3,
    } as ISportEvent;
  } else {
    return {
      ...base,
      type: 'music',
      genre: `Genre for event ${id}`,
    } as IMusicEvent;
  }
});
