import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleDashboard from './pages/article dashboard/articleDashboard';
import MemberDashboard from './pages/memberDashboard/memberDashbaord';
import AdminPanel from "./pages/admin-panel/adminPanel";
import Test from './Test';
function App() {
    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path='/' element={< Test />} />
                        <Route path='/test' element={<Test />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/admin/articles" element={<ArticleDashboard />} />
                        <Route path="/admin/members" element={<MemberDashboard />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App
