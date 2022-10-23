export const ASYNC_TIMEOUT = 6000;
export const ONE_DAY = 1000 * 60 * 60 * 24;

export enum Role {
  Admin = 'admin',
  Leader = 'leader',
  Member = 'member'
}

export enum ThemeName {
  KnowMyself = 'Know Myself',
  ExpressMyself = 'Express Myself',
  BeWell = 'Be Well',
  HaveAdventures = 'Have Adventures',
  takeAction = 'Take Action',
  SkillsForMyFuture = 'Skills For My Future'
}

export enum ThemeProgram {
  InterestBadges = 'Interest Badges',
  SkillsBuilders = 'Skills Builders',
  UnitMeetingActivities = 'Unit Meeting Activities'
}

// export enum StorageKey {
//   SignInAsEmail = 'signInAs.email',
//   SignInAsOrigin = 'signInAs.origin'
// }

export const AdminRoles = [Role.Admin, Role.Leader];
export const MemberRoles = [Role.Leader, Role.Member];
