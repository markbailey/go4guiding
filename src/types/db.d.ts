// Theme Awards
declare type ThemeAwardProgram =
  | 'Interest Badges'
  | 'Skills Builders'
  | 'Unit Meeting Activities';

interface Activity {
  name: string;
  duration: number;
}

interface InterestBadge {
  name: string;
  activities: string[];
}

interface SkillsBuilder {
  name: string;
  stage: number;
  activities: Activity[];
}

interface ThemeData {
  name: string;
  description: string;
  slug: string;
  interestBadges: InterestBadge[];
  skillsBuilders: SkillsBuilder[];
  unitMeetingActivities: Activity[];
}

// Awards Targets
declare interface AwardTargets {
  interestBadges: number[];
  skillsBuilders: number[];
  unitMeetingActivities: number;
}

// Units
declare type GuidingProgramme = 'brownies' | 'rainbows' | 'guides' | 'rangers';
declare interface Unit {
  uid: string;
  guidingProgramme: GuidingProgramme;
  displayName: string;
  patrols: record<string, string>;
}
