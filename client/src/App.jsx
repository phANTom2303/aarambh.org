import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleDashboard from './pages/article dashboard/articleDashboard';
import MemberDashboard from './pages/memberDashboard/memberDashbaord';
import AdminPanel from "./pages/admin-panel/adminPanel";
import Test from './Test';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path='/' element={<Test />} />
                        <Route path='/test' element={<Test />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/admin/articles" element={
                            <ProtectedRoute>
                                <ArticleDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/members" element={
                            <ProtectedRoute>
                                <MemberDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App
