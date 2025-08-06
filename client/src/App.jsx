import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleDashboard from './pages/article dashboard/articleDashboard';
import MemberDashboard from './pages/memberDashboard/memberDashbaord';
import AdminPanel from "./pages/admin-panel/adminPanel";
import Test from './Test';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicMemberList from './pages/hamburger/PublicMemberList';
function AdminLayout() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<AdminPanel />} />
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
                    <Route path='/members' element={<PublicMemberList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App
