export { VideoIcon } from './VideoIcon';
export { PlayIcon } from './PlayIcon';
export { InstagramIcon } from './InstagramIcon';
export { LinkIcon } from './LinkIcon';
export { CheckIcon } from './CheckIcon';
export { StarIcon } from './StarIcon';
export { MenuIcon } from './MenuIcon';
export { CloseIcon } from './CloseIcon';
export { ChevronLeftIcon } from './ChevronLeftIcon';
export { ChevronRightIcon } from './ChevronRightIcon';
export { CameraIcon } from './CameraIcon';
export { FilmIcon } from './FilmIcon';
export { PackageIcon } from './PackageIcon';
export { ClockIcon } from './ClockIcon';
export { CalendarIcon } from './CalendarIcon';
export { MapPinIcon } from './MapPinIcon';
export { MailIcon } from './MailIcon';
export { SendIcon } from './SendIcon';

export type IconName = 'video' | 'play' | 'instagram' | 'link' | 'check' | 'star' | 'menu' | 'close' | 'chevron-left' | 'chevron-right' | 'camera' | 'film' | 'package' | 'clock' | 'calendar' | 'map-pin' | 'mail' | 'send';

import { VideoIcon } from './VideoIcon';
import { PlayIcon } from './PlayIcon';
import { InstagramIcon } from './InstagramIcon';
import { LinkIcon } from './LinkIcon';
import { CameraIcon } from './CameraIcon';
import { FilmIcon } from './FilmIcon';
import { PackageIcon } from './PackageIcon';

/**
 * アイコン名からコンポーネントへのマッピング
 * 各セクションで共通利用
 */
export const iconMap = {
  video: VideoIcon,
  play: PlayIcon,
  instagram: InstagramIcon,
  link: LinkIcon,
  camera: CameraIcon,
  film: FilmIcon,
  package: PackageIcon,
} as const;

export type IconMapKey = keyof typeof iconMap;
