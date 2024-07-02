export interface ModuleCreation {
  moduleTitle: string;
  section: SectionCreation[];
}

export interface SectionCreation {
  sectionTitle: string;
  information: string;
  uploadContentType: number;
  uploadedContentUrl: string;
  readingTime: {
    hour: number;
    minute: number;
    second: number;
  };
  youtubeUrl: string;
  uploadDocument: string;
  isLive: boolean;
  livesessionDuration: {
    hour: number;
    minute: number;
    second: number;
  };
}

export enum documentType {
  Word = 1,
  Exel = 2,
  Pdf = 3,
  Video = 4,
}
