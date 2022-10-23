import { FirebaseError } from 'firebase/app';
import { ONE_DAY } from '../../common';
import { getCollection } from './firebase';
import db from './db';

export const PROGRESS_TAG_TYPE = 'AwardProgress';
export const UNIT_TAG_TYPE = 'Unit';

enum Slug {
  AwardProgress = '/awardProgress/',
  Unit = '/units/'
}

enum CacheDuration {
  AwardProgress = ONE_DAY,
  Unit = ONE_DAY
}

// Firebase Queries
const getProgress = (uid: string) =>
  getCollection<unknown>(`${Slug.AwardProgress}${uid}`);
const getUnit = (unitId: string) =>
  getCollection<Unit>(`${Slug.Unit}${unitId}`);

const profile = db
  .enhanceEndpoints({
    // For RTK Query, tags are just a name that you can give to a specific collection of data to control
    // caching and invalidation behavior for re-fetching purposes.
    // A mutation can invalidate specific cached data based on the tags.
    // Doing so determines which cached data will be either refetched or removed from the cache
    addTagTypes: [PROGRESS_TAG_TYPE, UNIT_TAG_TYPE]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAwardProgress: builder.query<unknown, string>({
        // arg, api, extraOptions, baseQuery
        async queryFn(uid) {
          try {
            const awardProgress = await getProgress(uid);
            return { data: awardProgress };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        },
        providesTags: [PROGRESS_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.AwardProgress
      }),

      getMyUnit: builder.query<Unit, string>({
        // arg, api, extraOptions, baseQuery
        async queryFn(unitId) {
          try {
            const unit = await getUnit(unitId);
            return { data: unit };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        },
        providesTags: [UNIT_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.Unit
      })
    })
  });

// Query actions for use with dispatch
export const getAwardProgress = profile.endpoints.getAwardProgress.initiate;
export const getMyUnit = profile.endpoints.getMyUnit.initiate;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAwardProgressQuery, useGetMyUnitQuery } = profile;

export default profile;
