import { SavedPaper, PaperData } from "@/types/paper";
import { getWordCount } from "./paperUtils";

const STORAGE_KEY = 'research-papers';

export const savePaper = (id: string, title: string, data: PaperData): SavedPaper => {
  const papers = getSavedPapers();
  
  // Calculate accurate word count - only count actual content sections
  const contentSections = ['abstract', 'introduction', 'content', 'conclusion', 'references'];
  const totalWords = contentSections.reduce((sum, key) => {
    const content = data[key as keyof PaperData];
    if (typeof content === 'string' && content.trim()) {
      return sum + getWordCount(content);
    }
    return sum;
  }, 0);

  const paper: SavedPaper = {
    id,
    title: title || 'Untitled Paper',
    data,
    lastModified: new Date().toISOString(),
    status: totalWords > 50 ? 'completed' : 'draft',
    wordCount: totalWords
  };

  // Remove any existing paper with same ID to prevent duplicates
  const filteredPapers = papers.filter(p => p.id !== id);
  filteredPapers.push(paper);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPapers));
  return paper;
};

export const getSavedPapers = (): SavedPaper[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getPaper = (id: string): SavedPaper | null => {
  const papers = getSavedPapers();
  return papers.find(p => p.id === id) || null;
};

export const deletePaper = (id: string): void => {
  const papers = getSavedPapers();
  const filtered = papers.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const updatePaperTitle = (id: string, newTitle: string): boolean => {
  const papers = getSavedPapers();
  const paperIndex = papers.findIndex(p => p.id === id);
  
  if (paperIndex >= 0) {
    papers[paperIndex].title = newTitle;
    papers[paperIndex].lastModified = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
    return true;
  }
  
  return false;
};

export const clearAllPapers = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
