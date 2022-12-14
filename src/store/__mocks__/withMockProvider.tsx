import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';

function withMockProvider(store: EnhancedStore) {
  return (props: PropsWithChildren<EmptyProps>) => {
    const { children } = props;

    return <Provider store={store}>{children}</Provider>;
  };
}

export default withMockProvider;
