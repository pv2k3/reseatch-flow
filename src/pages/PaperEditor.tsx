import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Download } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PaperSection, PaperData } from "@/types/paper";
import { getWordCount, generatePaperHTML } from "@/utils/paperUtils";
import { savePaper, getPaper } from "@/utils/storageUtils";
import { SectionNavigation } from "@/components/paper/SectionNavigation";
import { EditorSection } from "@/components/paper/EditorSection";
import { PaperPreview } from "@/components/paper/PaperPreview";
import { UnsavedChangesDialog } from "@/components/paper/UnsavedChangesDialog";
import 'react-quill/dist/quill.snow.css';

const PaperEditor = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Generate paperId only once and persist it in URL params
  const [paperId] = useState(() => {
    const existingId = searchParams.get('id');
    if (existingId) {
      return existingId;
    }
    const newId = `paper-${Date.now()}`;
    // Update URL with the new ID so it persists on refresh
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('id', newId);
      return newParams;
    });
    return newId;
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [paperData, setPaperData] = useState<PaperData>({
    title: searchParams.get('title') || '',
    titleStyle: { fontSize: 18, fontFamily: 'Times New Roman' },
    subtitles: [],
    keywords: [],
    abstract: '',
    introduction: '',
    content: '',
    conclusion: '',
    references: '',
  });
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingSectionChange, setPendingSectionChange] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const paperInitialized = useRef(false);
  const lastSavedDataRef = useRef<string>('');

  // Load existing paper if editing
  useEffect(() => {
    const existingPaper = getPaper(paperId);
    if (existingPaper) {
      // Ensure backward compatibility with old papers
      const updatedData = {
        ...existingPaper.data,
        titleStyle: existingPaper.data.titleStyle || { fontSize: 18, fontFamily: 'Times New Roman' },
        subtitles: existingPaper.data.subtitles || []
      };
      setPaperData(updatedData);
      lastSavedDataRef.current = JSON.stringify(updatedData);
      setLastSaved(new Date(existingPaper.lastModified || existingPaper.createdAt));
    }
    paperInitialized.current = true;
  }, [paperId]);

  const sections: PaperSection[] = [
    { id: 'title-subtitles', name: 'Title & Subtitles', key: 'title', maxWords: null, required: true, completed: false },
    { id: 'keywords', name: 'Keywords', key: 'keywords', maxWords: null, required: true, completed: false },
    { id: 'abstract', name: 'Abstract', key: 'abstract', maxWords: 500, required: true, completed: false },
    { id: 'introduction', name: 'Introduction', key: 'introduction', maxWords: 2000, required: true, completed: false },
    { id: 'content', name: 'Main Content', key: 'content', maxWords: null, required: true, completed: false },
    { id: 'conclusion', name: 'Conclusion', key: 'conclusion', maxWords: 500, required: true, completed: false },
    { id: 'references', name: 'References', key: 'references', maxWords: null, required: true, completed: false },
  ];

  const [sectionsStatus, setSectionsStatus] = useState(sections);

  // Check for unsaved changes when data changes
  useEffect(() => {
    if (!paperInitialized.current) return;
    
    const currentDataString = JSON.stringify(paperData);
    const hasChanges = currentDataString !== lastSavedDataRef.current;
    setHasUnsavedChanges(hasChanges);
  }, [paperData]);

  // Update completion status based on content
  useEffect(() => {
    const updatedSections = sectionsStatus.map(section => {
      switch (section.key) {
        case 'title':
          return { ...section, completed: paperData.title.trim().length > 0 };
        case 'keywords':
          return { ...section, completed: paperData.keywords.length > 0 };
        default:
          return { 
            ...section, 
            completed: getWordCount(paperData[section.key] as string) > 0 
          };
      }
    });
    setSectionsStatus(updatedSections);
  }, [paperData]);

  const currentSectionData = sectionsStatus[currentSection];
  const currentContent = currentSection === 0 ? paperData.title : 
                        currentSection === 1 ? paperData.keywords : 
                        paperData[currentSectionData.key];

  const handleSectionChange = (content: string | string[]) => {
    const currentMax = currentSectionData.maxWords;
    if (currentMax && typeof content === 'string' && getWordCount(content) > currentMax) {
      toast({
        title: "Word Limit Exceeded",
        description: `This section is limited to ${currentMax} words.`,
        variant: "destructive",
      });
      return;
    }
    
    if (currentSection === 0) {
      // Title section is handled by TitleSubtitleEditor component
      return;
    } else if (currentSection === 1) {
      // Keywords section
      setPaperData(prev => ({ ...prev, keywords: content as string[] }));
    } else {
      // Regular content sections
      setPaperData(prev => ({
        ...prev,
        [currentSectionData.key]: content
      }));
    }
  };

  const handleSave = async () => {
    if (isSaving) return; // Prevent multiple saves
    
    setIsSaving(true);
    try {
      const savedPaper = savePaper(paperId, paperData.title, paperData);
      setLastSaved(new Date());
      lastSavedDataRef.current = JSON.stringify(paperData);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Progress Saved",
        description: "Your paper has been saved successfully.",
      });
      
      return savedPaper;
    } catch (error) {
      console.error('Save failed:', error);
      toast({
        title: "Save Error",
        description: "There was an error saving your paper. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompile = async () => {
    try {
      const htmlContent = generatePaperHTML(paperData);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${paperData.title || 'research-paper'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Paper Compiled",
        description: "Your research paper has been downloaded as HTML.",
      });
    } catch (error) {
      console.error('Compilation error:', error);
      toast({
        title: "Compilation Error",
        description: "There was an error compiling your paper. Please try again.",
        variant: "destructive",
      });
    }
  };

  const checkUnsavedChanges = (targetSection: number) => {
    if (hasUnsavedChanges) {
      setPendingSectionChange(targetSection);
      setShowUnsavedDialog(true);
      return false;
    }
    return true;
  };

  const handleSectionNavigation = (targetSection: number) => {
    if (checkUnsavedChanges(targetSection)) {
      setCurrentSection(targetSection);
    }
  };

  const nextSection = () => {
    const targetSection = currentSection + 1;
    if (targetSection < sectionsStatus.length && checkUnsavedChanges(targetSection)) {
      setCurrentSection(targetSection);
    }
  };

  const prevSection = () => {
    const targetSection = currentSection - 1;
    if (targetSection >= 0 && checkUnsavedChanges(targetSection)) {
      setCurrentSection(targetSection);
    }
  };

  const skipSection = () => {
    const targetSection = currentSection + 1;
    if (targetSection < sectionsStatus.length && checkUnsavedChanges(targetSection)) {
      setCurrentSection(targetSection);
      toast({
        title: "Section Skipped",
        description: "You can return to this section later.",
      });
    }
  };

  const handleUnsavedDialogSave = async () => {
    const saved = await handleSave();
    if (saved && pendingSectionChange !== null) {
      setCurrentSection(pendingSectionChange);
      setPendingSectionChange(null);
    }
    setShowUnsavedDialog(false);
  };

  const handleUnsavedDialogDiscard = () => {
    if (pendingSectionChange !== null) {
      setCurrentSection(pendingSectionChange);
      setPendingSectionChange(null);
    }
    setShowUnsavedDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 truncate max-w-md">
                {paperData.title || 'Untitled Paper'}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{sectionsStatus.filter(s => s.completed).length} of {sectionsStatus.length} sections completed</span>
                {hasUnsavedChanges ? (
                  <span className="text-red-600">Unsaved changes</span>
                ) : (
                  <span>Last saved: {lastSaved.toLocaleTimeString('en-US', { hour12: true })}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <PaperPreview paperData={paperData} />
            
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Progress'}
            </Button>
            <Button onClick={handleCompile} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Compile & Download
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar - Section Navigation */}
        <div className="w-80 flex-shrink-0">
          <SectionNavigation
            sections={sectionsStatus}
            currentSection={currentSection}
            paperData={paperData}
            onSectionChange={handleSectionNavigation}
          />
        </div>

        {/* Main Editor */}
        <div className="flex-1">
          <EditorSection
            currentSection={currentSectionData}
            currentContent={currentContent}
            currentSectionIndex={currentSection}
            totalSections={sectionsStatus.length}
            onContentChange={handleSectionChange}
            
            onPrevSection={prevSection}
            onNextSection={nextSection}
            onSkipSection={skipSection}
            paperData={paperData}
            onPaperDataChange={setPaperData}
          />
        </div>
      </div>

      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onSave={handleUnsavedDialogSave}
        onDiscard={handleUnsavedDialogDiscard}
        onCancel={() => setShowUnsavedDialog(false)}
      />
    </div>
  );
};

export default PaperEditor;