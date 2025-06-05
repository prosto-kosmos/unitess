export const EventType = {
  Sport: 'sport',
  Music: 'music',
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];
