declare type EmptyProps = {};
declare interface DispatchAction<T extends unknown> {
  type: string | number;
  payload?: T;
}

// Support for MediaQueries
declare interface Event {
  matches: boolean;
}
