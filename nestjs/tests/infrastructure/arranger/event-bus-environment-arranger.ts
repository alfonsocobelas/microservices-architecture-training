export abstract class EventBusEnvironmentArranger {
  abstract arrange(): Promise<void>
  abstract close(): Promise<void>
}
