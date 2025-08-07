import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleDashboard from './pages/article dashboard/articleDashboard';
import MemberDashboard from './pages/memberDashboard/memberDashbaord';
import AdminPanel from "./pages/admin-panel/adminPanel";
import Test from './Test';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicMemberList from './pages/hamburger/PublicMemberList';
import PublicArticleList from './pages/Articles_events/PublicArticleList';
import SingleArticle from './pages/Articles_events/SingleArticle';
function AdminLayout() {
    return (
        <AuthProvider>
            <Routes>
                <Route index element={<AdminPanel />} />
                <Route path="articles" element={
                    <ProtectedRoute>
                        <ArticleDashboard />
                    </ProtectedRoute>
                } />
                <Route path="members" element={
                    <ProtectedRoute>
                        <MemberDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}
function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path='/' element={<Test />} />
                    <Route path='/test' element={<Test />} />
                    <Route path="/admin/*" element={<AdminLayout />} />
                    <Route path='/members' element={<PublicMemberList />} />
                    <Route path='/activities' element={<PublicArticleList />} />
                    <Route path='/activity/:id' element={<SingleArticle />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
