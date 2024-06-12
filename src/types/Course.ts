export interface Course {
  id: number;
  bannerImage: string;
  courses?: Course[];
  avatars: string[];
  page: number;
  time: number;
  duration: string;
  description: string;
  isOnline: string;
  institute: string;
}
