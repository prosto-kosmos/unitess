import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IEvent } from '../interfaces/event.interface';
import { EVENTS_MOCK } from '../mocks/event.mock';
import { UUID } from 'angular2-uuid';

type EventState = {
  events: IEvent[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: EventState = {
  events: [],
  isLoading: false,
  isError: false,
};

export const EventStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setDefaultState(): void {
      patchState(store, () => ({ events: EVENTS_MOCK }));
    },
    addEvent(event: IEvent): void {
      const events = [...store.events(), { ...event, id: UUID.UUID() }];
      patchState(store, () => ({ events }));
    },
    editEvent(id: string, event: IEvent): void {
      const events = [...store.events()];
      const updatedIdx = events.findIndex((event) => event.id === id);
      if (updatedIdx != -1) {
        events[updatedIdx] = event;
        patchState(store, () => ({ events }));
      }
    },
    deleteEvent(id: string): void {
      const events = [...store.events()];
      const deletedIdx = events.findIndex((event) => event.id === id);
      if (deletedIdx != -1) {
        events.splice(deletedIdx, 1);
        patchState(store, () => ({ events }));
      }
    },
  }))
);
