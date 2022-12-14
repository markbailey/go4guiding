import { PropsWithChildren, ReactNode } from 'react';

type HiddenProps = PropsWithChildren<EmptyProps>;
export interface ShowOptions {
  when: boolean;
  unmountOnHide?: boolean;
}

// Hidden Component
// Wrapper component for visually hiding the nodes.
// @props (HiddenProps)
const Hidden = (props: HiddenProps) => <div {...props} className="hidden" />;

// show function
// Renders the nodes param if the when param is true,
// otherwise returns null.
// @param when - whether the nodes should be visible or not
// @param nodes - the nodes to render
// @param unmountOnHide - whether the nodes should be unmounted when hidden
function show(nodes: ReactNode, options: ShowOptions) {
  const { when, unmountOnHide } = options;
  if (!when) return !unmountOnHide ? <Hidden>{nodes}</Hidden> : null;
  return <>{nodes}</>;
}

// mount function
// Mounts the nodes param if the when param is true.
// @param when - whether the nodes should be visible or not
// @param nodes - the nodes to render
export const mount = (when: boolean, nodes: ReactNode) =>
  show(nodes, { when, unmountOnHide: true });

export default show;
