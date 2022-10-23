import { SVGProps } from 'react';

import { ReactComponent as Add } from '../assets/svg/icons/add.svg';
import { ReactComponent as ArrowBack } from '../assets/svg/icons/arrow_back.svg';
import { ReactComponent as Awards } from '../assets/svg/icons/awards.svg';
import { ReactComponent as Delete } from '../assets/svg/icons/delete.svg';
import { ReactComponent as Home } from '../assets/svg/icons/home.svg';
import { ReactComponent as Person } from '../assets/svg/icons/person.svg';
import { ReactComponent as Settings } from '../assets/svg/icons/settings.svg';

export type IconProps = SVGProps<SVGSVGElement>;

// UI Icons
export const AddIcon = (props: IconProps) => <Add {...props} />;
export const ArrowBackIcon = (props: IconProps) => <ArrowBack {...props} />;
export const AwardsIcon = (props: IconProps) => <Awards {...props} />;
export const DeleteIcon = (props: IconProps) => <Delete {...props} />;
export const HomeIcon = (props: IconProps) => <Home {...props} />;
export const PersonIcon = (props: IconProps) => <Person {...props} />;
export const SettingsIcon = (props: IconProps) => <Settings {...props} />;
