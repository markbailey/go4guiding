declare type EmptyProps = {};
declare interface DispatchAction<T extends unknown> {
  type: string | number;
  payload?: T;
}

declare type PropsWithIndex<P extends EmptyProps> = P & { index: number };

// Support for MediaQueries
declare interface Event {
  matches: boolean;
}
