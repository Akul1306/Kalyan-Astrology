import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useKundliStore } from './lib/store';

// Import all pages
import HomePage from './pages/page'; // The main / page
import DashboardPage from './pages/dashboard/page';
import ContactPage from './pages/contact/page';
import PrivacyPage from './pages/privacy/page';
import TermsPage from './pages/terms/page';
import StorePage from './pages/store/page';
import ProductDetailsPage from './pages/store/product/ProductDetailsPage';
import ResearchPage from './pages/research/page';
import BlogsPage from './pages/research/blogs/page';
import BlogPage from './pages/research/blogs/BlogPage/page';
import ResearchPapersPage from './pages/research/research-papers/page';
import PaperPage from './pages/research/research-papers/Paper/page';
import AiBlogs from './pages/research/aiblogs/page';
import EducationPage from './pages/education/page';
import EducationBooksPage from './pages/education/Books/page';
import EducationChatPage from './pages/education/chat/page';
import EducationTestPage from './pages/education/test/page';
import EducationRoadmapPage from './pages/education/test/Roadmap/page';
import EducationTopicPage from './pages/education/test/Roadmap/Topic/page';
import MatchMakingPage from './pages/match-making/page';
import MatchMakingReportPage from './pages/match-making/MatchMakingReport/page';

// Auth pages
import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';

// User / Account Pages
import ProfilePage from './pages/profile/page';
import SettingsPage from './pages/settings/page';
import CartPage from './pages/Cart/page';
import SavedPapersPage from './pages/SavedPaper/page';
import TestPage from './pages/EducationTest/page';
import KundliCloudPage from './pages/KundliCloud/page';
import AIChatPage from './pages/ai/chat/page';

// Layout
import RootLayout from './pages/layout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useKundliStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/store/product/:id" element={<ProductDetailsPage />} />
          <Route path="/store/*" element={<StorePage />} />
          
          {/* Research Sub-routing */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/blogs" element={<BlogsPage />} />
          <Route path="/research/blogs/BlogPage" element={<BlogPage />} />
          <Route path="/research/blogs/:id" element={<BlogPage />} />
          <Route path="/research/research-papers" element={<ResearchPapersPage />} />
          <Route path="/research/research-papers/Paper" element={<PaperPage />} />
          <Route path="/research/aiblogs" element={<AiBlogs />} />

          <Route path="/education" element={<EducationPage />} />
          <Route path="/education/books" element={<EducationBooksPage />} />
          <Route path="/education/chat" element={<EducationChatPage />} />
          <Route path="/education/test" element={<EducationTestPage />} />
          <Route path="/education/test/Roadmap" element={<EducationRoadmapPage />} />
          <Route path="/education/test/Roadmap/Topic" element={<EducationTopicPage />} />
          <Route path="/match-making" element={<MatchMakingPage />} />
          <Route path="/match-making/MatchMakingReport" element={<MatchMakingReportPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/Cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/SavedPaper" element={<ProtectedRoute><SavedPapersPage /></ProtectedRoute>} />
          <Route path="/EducationTest" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
          <Route path="/KundliCloud" element={<ProtectedRoute><KundliCloudPage /></ProtectedRoute>} />
          <Route path="/kundli-cloud" element={<ProtectedRoute><KundliCloudPage /></ProtectedRoute>} />
          <Route path="/ai/chat" element={<AIChatPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
