import { FirebaseError } from 'firebase/app';
import { ONE_DAY } from '../../common';
import { RootState } from '../../store';
import { getCollection } from './firebase';
import db from './db';

export const THEMES_TAG_TYPE = 'Themes';
export const TARGETS_TAG_TYPE = 'AwardTargets';

enum Slug {
  AwardTargets = '/awardTargets/',
  Themes = '/themes/'
}

enum CacheDuration {
  AwardTargets = ONE_DAY,
  Themes = ONE_DAY
}

// Firebase Queries
const getTargets = (programme: string) =>
  getCollection<AwardTargets>(`${Slug.AwardTargets}${programme}`);
const getThemesByProgramme = (programme: string) =>
  getCollection<ThemeData[]>(`${Slug.Themes}${programme}`);

const awards = db
  .enhanceEndpoints({
    // For RTK Query, tags are just a name that you can give to a specific collection of data to control
    // caching and invalidation behavior for re-fetching purposes.
    // A mutation can invalidate specific cached data based on the tags.
    // Doing so determines which cached data will be either refetched or removed from the cache
    addTagTypes: [THEMES_TAG_TYPE, TARGETS_TAG_TYPE]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAwardTargets: builder.query<AwardTargets, void>({
        // arg, api, extraOptions, baseQuery
        async queryFn(arg, api) {
          const { auth } = api.getState() as RootState;
          const programme = auth.user?.unit.guidingProgramme!;
          // const callback = () =>
          //   api.dispatch(awards.util.invalidateTags([TARGETS_TAG_TYPE]));

          try {
            const awardTargets = await getTargets(programme);
            return { data: awardTargets };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        },
        providesTags: [TARGETS_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.AwardTargets
      }),

      getThemes: builder.query<ThemeData[], void>({
        // arg, api, extraOptions, baseQuery
        async queryFn(arg, api) {
          const { auth } = api.getState() as RootState;
          const programme = auth.user?.unit.guidingProgramme!;
          // const callback = (data: ThemeData[]) =>
          //   api.dispatch(
          //     awards.util.updateQueryData('getThemes', arg, (drafts) => data)
          //   );
          try {
            const themes = await getThemesByProgramme(programme);
            return { data: themes };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        },
        async onQueryStarted(arg, api) {
          const { dispatch } = api;
          const { updateQueryData } = awards.util;
        },
        providesTags: [THEMES_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.Themes
      }),

      getTheme: builder.query<ThemeData, string | undefined>({
        // arg, api, extraOptions, baseQuery
        async queryFn(slug, api) {
          const getThemes = api.dispatch(awards.endpoints.getThemes.initiate());
          const { data } = (await getThemes) as { data: ThemeData[] };
          const name = slug
            ?.split('-')
            .map(
              (value) =>
                value.substring(0, 1).toUpperCase() +
                value.substring(1).toLowerCase()
            )
            .join(' ');
          try {
            return { data: data?.find((theme) => theme.name === name) };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        }
      })
    })
  });

// Query actions for use with dispatch
export const getAwardTargets = awards.endpoints.getAwardTargets.initiate;
export const getThemes = awards.endpoints.getThemes.initiate;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAwardTargetsQuery, useGetThemesQuery, useGetThemeQuery } =
  awards;
export default awards;
