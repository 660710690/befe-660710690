import React, { useState, useEffect } from "react";
import { getAllBooks } from "../data/booksData";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // ✅ ใช้ navigate

  // โหลดข้อมูลจาก localStorage + booksData
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const initialBooks = getAllBooks();
    setBooks([...initialBooks, ...storedBooks]);
  }, []);

  // sync localStorage
  useEffect(() => {
    const initialBooks = getAllBooks();
    const userBooks = books.filter(
      (b) => !initialBooks.some((ib) => ib.id === b.id)
    );
    localStorage.setItem("books", JSON.stringify(userBooks));
  }, [books]);

  // ลบหนังสือ
  const handleDeleteBook = (id) => {
    if (window.confirm("คุณต้องการลบหนังสือเล่มนี้ใช่ไหม?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Books</h1>
        {/* ปุ่มเพิ่มหนังสือใหม่ */}
        <button
          onClick={() => navigate("/store-manager/add-book")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ➕ เพิ่มหนังสือใหม่
        </button>
      </div>

      {/* ตารางรายการหนังสือ */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">รายการหนังสือทั้งหมด</h2>
        {books.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีหนังสือ</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ชื่อหนังสือ</th>
                <th className="p-2 border">ผู้แต่ง</th>
                <th className="p-2 border">ISBN</th>
                <th className="p-2 border">ปี</th>
                <th className="p-2 border">ราคา</th>
                <th className="p-2 border">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="p-2 border">{book.title}</td>
                  <td className="p-2 border">{book.author}</td>
                  <td className="p-2 border">{book.isbn}</td>
                  <td className="p-2 border">{book.year}</td>
                  <td className="p-2 border">{book.price}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => alert("TODO: แก้ไข")}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
