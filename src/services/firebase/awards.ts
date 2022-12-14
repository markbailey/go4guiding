import { FirebaseError } from 'firebase/app';
import { ONE_DAY } from '../../common';
import { RootState } from '../../store';
import { getCollection, onRead } from './firebase';
import dbApi from './db';

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

const awards = dbApi
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
          // const callback = () =>
          //   api.dispatch(awards.util.invalidateTags([TARGETS_TAG_TYPE]));
          try {
            const { auth } = api.getState() as RootState;
            const programme = auth.user?.unit.guidingProgramme!;
            const path = `${Slug.AwardTargets}${programme}`;
            const awardTargets = await getCollection<AwardTargets>(path, true);
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
          // const callback = (data: ThemeData[]) =>
          //   api.dispatch(
          //     awards.util.updateQueryData('getThemes', arg, (drafts) => data)
          //   );
          try {
            const { invalidateTags } = awards.util;
            const { getState, dispatch } = api;
            const { auth } = getState() as RootState;
            const programme = auth.user?.unit.guidingProgramme!;
            const path = `${Slug.Themes}${programme}`;
            const themes = await getCollection<ThemeData[]>(path, true);

            onRead(path, () => dispatch(invalidateTags([THEMES_TAG_TYPE])));
            console.log('getThemes!', themes);
            return { data: themes };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        },
        // async onQueryStarted(arg, api) {
        //   const { dispatch } = api;
        //   const { updateQueryData } = awards.util;
        // },
        providesTags: [THEMES_TAG_TYPE],
        keepUnusedDataFor: CacheDuration.Themes
      }),

      getTheme: builder.query<ThemeData, string | undefined>({
        // arg, api, extraOptions, baseQuery
        async queryFn(slug, api) {
          try {
            const { getThemes } = awards.endpoints;
            const getThemesAsync = api.dispatch(getThemes.initiate());
            const { data } = (await getThemesAsync) as ApiResponse<ThemeData[]>;

            return { data: data?.find((theme) => theme.slug === slug) };
          } catch (error) {
            return { error: error as FirebaseError };
          }
        },
        keepUnusedDataFor: 0
      })
    })
  });

// Query actions for use with dispatch
export const getAwardTargets = awards.endpoints.getAwardTargets.initiate;
export const getThemes = awards.endpoints.getThemes.initiate;
export const getTheme = awards.endpoints.getTheme.initiate;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAwardTargetsQuery, useGetThemesQuery, useGetThemeQuery } =
  awards;
export default awards;
