import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllBooks } from '../data/booksData';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // ✅ โหลดจาก booksData
      const initialBooks = getAllBooks();

      // ✅ โหลดจาก localStorage
      const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");

      // ✅ รวมกัน
      const combinedBooks = [...initialBooks, ...storedBooks];

      setBooks(combinedBooks);
      setFilteredBooks(combinedBooks);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.category && book.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
    setCurrentPage(1);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    const sorted = [...filteredBooks];
    switch (sortValue) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => b.id - a.id);
    }
    setFilteredBooks(sorted);
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">หนังสือทั้งหมด</h1>
          <p className="text-gray-600">ค้นพบหนังสือที่คุณชื่นชอบจากคอลเล็กชันของเรา</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Category */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              <option value="all">ทุกหมวดหมู่</option>
              <option value="fiction">นิยาย</option>
              <option value="non-fiction">สารคดี</option>
              <option value="science">วิทยาศาสตร์</option>
              <option value="history">ประวัติศาสตร์</option>
              <option value="art">ศิลปะ</option>
              <option value="psychology">จิตวิทยา</option>
              <option value="business">ธุรกิจ</option>
              <option value="technology">เทคโนโลยี</option>
              <option value="cooking">อาหาร</option>
            </select>

            {/* Sort */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="newest">ใหม่ล่าสุด</option>
              <option value="price-low">ราคาต่ำ-สูง</option>
              <option value="price-high">ราคาสูง-ต่ำ</option>
              <option value="popular">ยอดนิยม</option>
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            พบหนังสือ {filteredBooks.length} เล่ม
            {selectedCategory !== 'all' && ` ในหมวด ${selectedCategory}`}
          </div>
        </div>

        {/* Books Grid */}
        {currentBooks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ไม่พบหนังสือที่ค้นหา</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                ก่อนหน้า
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-green-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                ถัดไป
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListPage;
