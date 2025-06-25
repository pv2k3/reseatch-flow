import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, FileText, Calendar, MoreVertical, Trash2, Edit, Edit3, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSavedPapers, deletePaper, updatePaperTitle, clearAllPapers } from "@/utils/storageUtils";
import { SavedPaper } from "@/types/paper";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [papers, setPapers] = useState<SavedPaper[]>([]);
  const [editingPaper, setEditingPaper] = useState<SavedPaper | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = () => {
    const savedPapers = getSavedPapers();
    setPapers(savedPapers);
  };

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaperClick = (paper: SavedPaper) => {
    navigate(`/editor?id=${paper.id}&title=${encodeURIComponent(paper.title)}`);
  };

  const handleDeletePaper = (paperId: string, paperTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deletePaper(paperId);
    loadPapers();
    toast({
      title: "Paper Deleted",
      description: `"${paperTitle}" has been deleted successfully.`,
    });
  };

  const handleEditTitle = (paper: SavedPaper, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingPaper(paper);
    setNewTitle(paper.title);
    setIsEditDialogOpen(true);
  };

  const handleSaveTitle = () => {
    if (editingPaper && newTitle.trim()) {
      const success = updatePaperTitle(editingPaper.id, newTitle.trim());
      if (success) {
        loadPapers();
        toast({
          title: "Title Updated",
          description: "Paper title has been updated successfully.",
        });
      }
    }
    setIsEditDialogOpen(false);
    setEditingPaper(null);
    setNewTitle("");
  };

  const handleClearAllPapers = () => {
    clearAllPapers();
    loadPapers();
    toast({
      title: "All Papers Cleared",
      description: "All papers have been deleted from storage.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Research Papers</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleClearAllPapers}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash className="h-4 w-4 mr-2" />
              Clear All Papers
            </Button>
            <Button onClick={() => navigate("/new-paper")} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Start New Paper
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Papers</h2>
          
          {filteredPapers.length == 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {papers.length == 0 ? "No papers yet" : "No papers found"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Try a different search term" : "Get started by creating your first research paper"}
              </p>
              <Button onClick={() => navigate("/new-paper")} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Start New Paper
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3" onClick={() => handlePaperClick(paper)}>
                    <div className="flex items-start justify-between">
                      <FileText className="h-8 w-8 text-blue-600 mb-2" />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePaperClick(paper)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Paper
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleEditTitle(paper, e)}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Title
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={(e) => handleDeletePaper(paper.id, paper.title, e)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Paper
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">
                      {paper.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent onClick={() => handlePaperClick(paper)}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(paper.lastModified)}
                        </div>
                        <Badge variant={paper.status == "completed" ? "default" : "secondary"}>
                          {paper.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {paper.wordCount.toLocaleString()} words
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Edit Title Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Paper Title</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title..."
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  handleSaveTitle();
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTitle} disabled={!newTitle.trim()}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
