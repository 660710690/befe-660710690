import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBookById } from '../data/booksData'; // ✅ import function

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      const bookData = getBookById(id); // ✅ ใช้ getBookById
      setBook(bookData || null);
    }
  }, [id]);

  if (!book) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl mb-4">Book not found</div>
        <Link to="/books" className="text-blue-600 hover:underline">
          Go back to Book List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/books" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Book List
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <div className="space-y-3">
          <p><span className="font-semibold">Author:</span> {book.author}</p>
          <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
          <p><span className="font-semibold">Year:</span> {book.year}</p>
          <p><span className="font-semibold">Price:</span> ฿{book.price}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
