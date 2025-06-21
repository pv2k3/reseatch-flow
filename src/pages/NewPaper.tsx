
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPaper = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleContinue = () => {
    if (title.trim()) {
      // Navigate to paper editor with title
      navigate(`/editor?title=${encodeURIComponent(title)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your Research Paper</h1>
          <p className="text-gray-600">Begin by giving your paper a compelling title</p>
        </div>

        {/* Title Input Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Paper Title</CardTitle>
            <CardDescription>
              Choose a clear, descriptive title that captures the essence of your research
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Research Paper Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Machine Learning Applications in Climate Science"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg py-3"
                onKeyPress={(e) => e.key == 'Enter' && handleContinue()}
              />
              <p className="text-sm text-gray-500">
                This will appear as the main title of your research paper
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={!title.trim()}
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for a Great Title</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Keep it concise but descriptive (10-15 words ideal)</li>
            <li>• Include key terms your audience would search for</li>
            <li>• Avoid jargon and abbreviations when possible</li>
            <li>• Make it specific to your research focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewPaper;
