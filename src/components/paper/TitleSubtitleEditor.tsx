
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Type } from "lucide-react";
import { PaperData, SubtitleItem, TitleStyle } from "@/types/paper";

interface TitleSubtitleEditorProps {
  paperData: PaperData;
  onPaperDataChange: (data: PaperData) => void;
}

const fontOptions = [
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Palatino', label: 'Palatino' }
];

const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export const TitleSubtitleEditor = ({ paperData, onPaperDataChange }: TitleSubtitleEditorProps) => {
  const [showStyleControls, setShowStyleControls] = useState(false);

  const handleTitleChange = (title: string) => {
    onPaperDataChange({ ...paperData, title });
  };

  const handleTitleStyleChange = (style: Partial<TitleStyle>) => {
    onPaperDataChange({
      ...paperData,
      titleStyle: { ...paperData.titleStyle, ...style }
    });
  };

  const addSubtitle = () => {
    const newSubtitle: SubtitleItem = {
      id: `subtitle-${Date.now()}`,
      text: '',
      fontSize: 14,
      fontFamily: 'Times New Roman'
    };
    onPaperDataChange({
      ...paperData,
      subtitles: [...paperData.subtitles, newSubtitle]
    });
  };

  const removeSubtitle = (id: string) => {
    onPaperDataChange({
      ...paperData,
      subtitles: paperData.subtitles.filter(s => s.id !== id)
    });
  };

  const updateSubtitle = (id: string, updates: Partial<SubtitleItem>) => {
    onPaperDataChange({
      ...paperData,
      subtitles: paperData.subtitles.map(s => 
        s.id === id ? { ...s, ...updates } : s
      )
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Title & Subtitles</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStyleControls(!showStyleControls)}
          >
            <Type className="h-4 w-4 mr-2" />
            Style Controls
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Title Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Paper Title</label>
            <Input
              value={paperData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter your paper title..."
              className="text-lg font-semibold text-center"
              style={{
                fontSize: `${paperData.titleStyle.fontSize}px`,
                fontFamily: paperData.titleStyle.fontFamily
              }}
            />
          </div>

          {/* Title Style Controls */}
          {showStyleControls && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title Font Size</label>
                <Select
                  value={paperData.titleStyle.fontSize.toString()}
                  onValueChange={(value) => handleTitleStyleChange({ fontSize: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizes.map(size => (
                      <SelectItem key={size} value={size.toString()}>{size}px</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title Font Family</label>
                <Select
                  value={paperData.titleStyle.fontFamily}
                  onValueChange={(value) => handleTitleStyleChange({ fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map(font => (
                      <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Subtitles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Subtitles (Optional)</label>
            <Button
              variant="outline"
              size="sm"
              onClick={addSubtitle}
              className="w-fit"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Subtitle
            </Button>
          </div>

          {paperData.subtitles.map((subtitle, index) => (
            <div key={subtitle.id} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtitle {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubtitle(subtitle.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                value={subtitle.text}
                onChange={(e) => updateSubtitle(subtitle.id, { text: e.target.value })}
                placeholder="Enter subtitle text (e.g., Author Name, Roll No., University)..."
                className="text-center"
                style={{
                  fontSize: `${subtitle.fontSize}px`,
                  fontFamily: subtitle.fontFamily
                }}
              />

              {showStyleControls && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">Font Size</label>
                    <Select
                      value={subtitle.fontSize.toString()}
                      onValueChange={(value) => updateSubtitle(subtitle.id, { fontSize: parseInt(value) })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizes.map(size => (
                          <SelectItem key={size} value={size.toString()}>{size}px</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">Font Family</label>
                    <Select
                      value={subtitle.fontFamily}
                      onValueChange={(value) => updateSubtitle(subtitle.id, { fontFamily: value })}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map(font => (
                          <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
