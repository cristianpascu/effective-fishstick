import { useParams } from 'react-router-dom';
import { rootReducer } from '../store/rootReducer';
import type { Slice } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';
import type { SubAppDescriptor } from '../sub-apps/types';

type AnySubAppDescriptor = SubAppDescriptor<Slice | undefined>;
type DescriptorLoader = () => Promise<AnySubAppDescriptor>;

export const makeCachedLoader = (load: DescriptorLoader): DescriptorLoader => {
  let cached: Promise<AnySubAppDescriptor> | undefined;
  return () => {
    if (!cached) cached = load();
    return cached;
  };
};

const EmptyComponent = () => null;

const resolveIndexComponent = (descriptor: AnySubAppDescriptor) => {
  const indexRoute = descriptor.routes?.find((route) => route.index === true);
  return indexRoute?.Component ?? EmptyComponent;
};

const createWildcardComponent = (descriptor: AnySubAppDescriptor) => {
  const WildcardComponent = () => {
    const { '*': childPath } = useParams();
    const childRoute = descriptor.routes?.find(
      (route) => route.path === childPath,
    );
    const Component = childRoute?.Component ?? EmptyComponent;
    return <Component />;
  };

  return WildcardComponent;
};

export const createSubAppRoute = ({
  path,
  descriptor,
}: {
  path?: string;
  descriptor: DescriptorLoader;
}): RouteObject => ({
  ...(path !== undefined ? { path } : {}),
  async loader() {
    const desc = await descriptor();
    if (desc.slice) rootReducer.inject(desc.slice);
    return null;
  },
  async lazy() {
    const desc = await descriptor();
    return { Component: desc.RootComponent };
  },
  children: [
    {
      index: true,
      async lazy() {
        const desc = await descriptor();
        return { Component: resolveIndexComponent(desc) };
      },
    },
    {
      path: '*',
      async lazy() {
        const desc = await descriptor();
        return { Component: createWildcardComponent(desc) };
      },
    },
  ],
});
