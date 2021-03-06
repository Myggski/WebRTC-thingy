export interface Clickable {
  onClick(e: PointerEvent): Promise<PointerEvent> | PointerEvent;
}
