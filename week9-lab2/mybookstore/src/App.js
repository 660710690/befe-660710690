import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AddBookPage from './pages/AddBookPage';
import AllBooksPage from './pages/AllBooksPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - ไม่มี Navbar/Footer */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/store-manager/all-books" element={<AllBooksPage />} />
        <Route path="/store-manager/add-book" element={<AddBookPage />} />
        {/* ถ้า admin พิมพ์ path ผิด → ส่งกลับไป all-books */}
        <Route path="/store-manager/*" element={<Navigate to="/store-manager/all-books" replace />} />

        {/* Public Routes - มี Navbar/Footer */}
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/home" element={<HomePage />} />
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
          }
        />
      </Routes>
    </Router>
  );
}

export default App;