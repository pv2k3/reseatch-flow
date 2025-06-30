import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, FileText, Calendar, MoreVertical, Edit3, Trash2, Clock, Folder  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSavedPapers, deletePaper, updatePaperTitle } from "@/utils/storageUtils";
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
      description: `\"${paperTitle}\" has been deleted successfully.`,
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
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
  <FileText className="h-6 w-6 text-blue-600" />
  <span>ResearchPaper Writer</span>
</h1>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-72"
              />
            </div>
            <Button onClick={() => navigate("/new-paper")} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Start New Paper
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
  <Clock className="h-4 w-4 text-blue-600" />
  <span>Recent Papers</span>
</h2>


        {filteredPapers.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {papers.length === 0 ? "No papers yet" : "No papers found"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "Try a different search term" : "Get started by creating your first research paper."}
            </p>
            <Button onClick={() => navigate("/new-paper")} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Start New Paper
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filteredPapers.map((paper) => (
              <Card key={paper.id} className="cursor-pointer hover:shadow-md transition" onClick={() => handlePaperClick(paper)}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePaperClick(paper)}>
                          Edit Paper
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleEditTitle(paper, e)}>
                          Edit Title
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={(e) => handleDeletePaper(paper.id, paper.title, e)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 mt-2">
                    {paper.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(paper.lastModified)}
                    </div>
                    <div>
                      {paper.wordCount.toLocaleString()} words
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {papers.length > 0 && (
          <div>
<h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center space-x-2">
  <Folder className="h-4 w-4 text-blue-600" />
  <span>All Papers</span>
</h2>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2 font-medium text-gray-700">Title</th>
                    <th className="px-4 py-2 font-medium text-gray-700">Last Modified</th>
                    <th className="px-4 py-2 font-medium text-gray-700">Word Count</th>
                    <th className="px-4 py-2 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPapers.map((paper) => (
                    <tr key={paper.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 cursor-pointer text-blue-600" onClick={() => handlePaperClick(paper)}>
                        {paper.title}
                      </td>
                      <td className="px-4 py-2">{formatDate(paper.lastModified)}</td>
                      <td className="px-4 py-2">{paper.wordCount.toLocaleString()}</td>
                      <td className="px-4 py-2 flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={(e) => handleEditTitle(paper, e)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={(e) => handleDeletePaper(paper.id, paper.title, e)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
                if (e.key === 'Enter') handleSaveTitle();
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
