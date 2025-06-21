
export interface SubtitleItem {
  id: string;
  text: string;
  fontSize: number;
  fontFamily: string;
}

export interface TitleStyle {
  fontSize: number;
  fontFamily: string;
}

export interface PaperSection {
  id: string;
  name: string;
  key: keyof PaperData;
  maxWords: number | null;
  required: boolean;
  completed: boolean;
}

export interface PaperData {
  title: string;
  titleStyle: TitleStyle;
  subtitles: SubtitleItem[];
  keywords: string[];
  abstract: string;
  introduction: string;
  content: string;
  conclusion: string;
  references: string;
}

export interface SavedPaper {
  id: string;
  title: string;
  data: PaperData;
  lastModified: string;
  status: "draft" | "completed";
  wordCount: number;
}
