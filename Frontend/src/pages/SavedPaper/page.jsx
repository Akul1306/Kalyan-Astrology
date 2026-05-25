import { SavedPapersDashboard } from "@/components/research/saved-papers-dashboard";
import { savedPapers } from "@/lib/dashboard-data";
export default function SavedPapersPage() {
    return <SavedPapersDashboard documents={savedPapers}/>;
}
