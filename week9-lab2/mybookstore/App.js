import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from '../mybookstore/components/Navbar';
import Footer from '../mybookstore/components/Footer';
import NotFound from '../mybookstore/components/NotFound';

// Pages
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50">
        <header className="bg-white shadow-md rounded p-8">
        <h1 className="text-2xl font-bold">สวัสดี React</h1>
        <p className="mt-4 text-gray-600">ยินดีต้อนรับสู่แอพลิเคชัน React ของคุณ!</p>
        <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600">เริ่มต้น</button>
      </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;