
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";
import ReactQuill from 'react-quill';
import { PaperSection, PaperData } from "@/types/paper";
import { getWordCount, getWordCountProgress } from "@/utils/paperUtils";
import { KeywordsInput } from "./KeywordsInput";
import { TitleSubtitleEditor } from "./TitleSubtitleEditor";

interface EditorSectionProps {
  currentSection: PaperSection;
  currentContent: string | string[];
  currentSectionIndex: number;
  totalSections: number;
  onContentChange: (content: string | string[]) => void;
  onPrevSection: () => void;
  onNextSection: () => void;
  onSkipSection: () => void;
  paperData: PaperData;
  onPaperDataChange: (data: PaperData) => void;
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link'],
    [{ 'align': [] }],
    ['clean']
  ],
};

export const EditorSection = ({
  currentSection,
  currentContent,
  currentSectionIndex,
  totalSections,
  onContentChange,
  onPrevSection,
  onNextSection,
  onSkipSection,
  paperData,
  onPaperDataChange
}: EditorSectionProps) => {
  const wordCount = Array.isArray(currentContent) 
    ? currentContent.length 
    : getWordCount(currentContent);
  const isOverLimit = currentSection.maxWords && wordCount > currentSection.maxWords;
  const progressPercentage = currentSection.maxWords ? getWordCountProgress(
    Array.isArray(currentContent) ? currentContent.join(', ') : currentContent, 
    currentSection.maxWords
  ) : 0;

  // Render different sections based on current section
  const renderSectionContent = () => {
    switch (currentSectionIndex) {
      case 0: // Title & Subtitles
        return <TitleSubtitleEditor paperData={paperData} onPaperDataChange={onPaperDataChange} />;
      
      case 1: // Keywords
        return (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Keywords</CardTitle>
              <div className="text-sm text-gray-600">
                {Array.isArray(currentContent) ? currentContent.length : 0} keywords
              </div>
            </CardHeader>
            <CardContent>
              <KeywordsInput
                keywords={Array.isArray(currentContent) ? currentContent : []}
                onChange={(keywords) => onContentChange(keywords)}
              />
            </CardContent>
          </Card>
        );
      
      default: // Regular content sections
        return (
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{currentSection.name}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    {currentSection.maxWords && (
                      <div className="space-y-2">
                        <div className={`text-sm ${isOverLimit ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          {wordCount} / {currentSection.maxWords} words
                          {isOverLimit && ' (Over limit!)'}
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className={`w-40 h-2 ${isOverLimit ? 'bg-red-100' : ''}`}
                        />
                      </div>
                    )}
                    {!currentSection.maxWords && wordCount > 0 && (
                      <div className="text-sm text-gray-600">
                        {wordCount} words
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ReactQuill
                theme="snow"
                value={typeof currentContent == 'string' ? currentContent : ''}
                onChange={(content) => onContentChange(content)}
                modules={quillModules}
                placeholder={`Write your ${currentSection.name.toLowerCase()} here...`}
                style={{ height: '400px' }}
              />
              <div style={{ marginTop: '60px' }}></div>
            </CardContent>
          </Card>
        );
    }
  };

  // For title/subtitle section, don't show navigation in the card
  if (currentSectionIndex == 0) {
    return (
      <div className="space-y-6">
        {renderSectionContent()}
        
        {/* Navigation for title section */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={onPrevSection}
                disabled={currentSectionIndex == 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onSkipSection}
                  disabled={currentSectionIndex == totalSections - 1}
                  className="text-gray-600"
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip for Now
                </Button>
                
                <Button
                  onClick={onNextSection}
                  disabled={currentSectionIndex == totalSections - 1}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // For other sections, show navigation within the card
  return (
    <div className="space-y-6">
      {renderSectionContent()}
      
      {/* Navigation */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onPrevSection}
              disabled={currentSectionIndex == 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={onSkipSection}
                disabled={currentSectionIndex == totalSections - 1}
                className="text-gray-600"
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip for Now
              </Button>
              
              <Button
                onClick={onNextSection}
                disabled={currentSectionIndex == totalSections - 1}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
