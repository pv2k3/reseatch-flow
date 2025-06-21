
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";
import { PaperSection, PaperData } from "@/types/paper";
import { getWordCount } from "@/utils/paperUtils";

interface SectionNavigationProps {
  sections: PaperSection[];
  currentSection: number;
  paperData: PaperData;
  onSectionChange: (index: number) => void;
}

export const SectionNavigation = ({ 
  sections, 
  currentSection, 
  paperData, 
  onSectionChange 
}: SectionNavigationProps) => {
  const getContentWordCount = (section: PaperSection) => {
    const content = paperData[section.key];
    if (section.key == 'keywords') {
      return Array.isArray(content) ? content.length : 0;
    }
    return getWordCount(content as string);
  };

  const formatWordDisplay = (section: PaperSection) => {
    const count = getContentWordCount(section);
    if (section.key == 'keywords') {
      return `${count} keywords`;
    }
    if (section.maxWords) {
      return `${count} / ${section.maxWords} words`;
    }
    return count > 0 ? `${count} words` : '';
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Paper Sections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(index)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
              currentSection == index
                ? 'bg-blue-100 border-blue-200 border'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {section.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <div className="font-medium text-sm">{section.name}</div>
                <div className="text-xs text-gray-500">
                  {formatWordDisplay(section)}
                </div>
              </div>
            </div>
            {currentSection == index && (
              <Badge variant="secondary" className="text-xs">
                Current
              </Badge>
            )}
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
