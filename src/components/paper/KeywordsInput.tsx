
import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface KeywordsInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export const KeywordsInput = ({ keywords, onChange }: KeywordsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (!keywords.includes(newKeyword)) {
        onChange([...keywords, newKeyword]);
      }
      setInputValue("");
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    onChange(keywords.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Type a keyword and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="text-base"
      />
      
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {keyword}
              <button
                onClick={() => removeKeyword(index)}
                className="ml-2 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      <p className="text-sm text-gray-600">
        Add 3-8 relevant keywords. Type each keyword and press Enter.
      </p>
    </div>
  );
};
