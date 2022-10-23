import { ONE_DAY } from '../../common';
import api, { getUrlWithVersion } from './api';

export const UNIT_TAG_TYPE = 'UsersByUnit';
export const PATROL_TAG_TYPE = 'UsersByPatrol';

enum Slug {
  UsersByUnit = '/usersByUnit/',
  UsersByPatrol = '/usersByPatrol/'
}

enum CacheDuration {
  UsersByUnit = ONE_DAY,
  UsersByPatrol = ONE_DAY
}

const users = api
  .enhanceEndpoints({
    // For RTK Query, tags are just a name that you can give to a specific collection of data to control
    // caching and invalidation behavior for re-fetching purposes.
    // A mutation can invalidate specific cached data based on the tags.
    // Doing so determines which cached data will be either refetched or removed from the cache
    addTagTypes: [UNIT_TAG_TYPE, PATROL_TAG_TYPE]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsersByUnit: builder.query<AwardTargets, string>({
        query: (unitId: string) => ({
          url: getUrlWithVersion(`${Slug.UsersByUnit}${unitId}`),
          params: {}
        }),
        providesTags: [UNIT_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.UsersByUnit
      }),

      getUsersByPatrol: builder.query<ThemeData[], string>({
        query: (patrolId: string) => ({
          url: getUrlWithVersion(`${Slug.UsersByPatrol}${patrolId}`),
          params: {}
        }),
        providesTags: [PATROL_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.UsersByPatrol
      })
    })
  });

// Query actions for use with dispatch
export const getUsersByUnit = users.endpoints.getUsersByUnit.initiate;
export const getUsersByPatrol = users.endpoints.getUsersByPatrol.initiate;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersByUnitQuery, useGetUsersByPatrolQuery } = users;

export default users;
