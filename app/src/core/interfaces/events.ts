export interface Clickable {
  onClick(e: PointerEvent): Promise<PointerEvent> | PointerEvent;
}

export interface Changeable {
  onChange(e: Event): Promise<Event> | Event;
}
