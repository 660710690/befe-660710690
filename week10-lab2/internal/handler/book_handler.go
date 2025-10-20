package handler

import "github.com/gin-gonic/gin"

type Book struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

// @Summary Get book by ID
// @Description Get details of a book by ID
// @Tags book
// @Produce  json
// @Param   id   path      int     true  "book ID"
// @Success 200  {object}  Book
// @Failure 404  {object}  ErrorResponse
// @Router  /books/{id} [get]
func GetBookByID(c *gin.Context) {
	id := c.Param("id")
	c.JSON(200, gin.H{"id": id, "title": "Mastering golang"})
}

// คืนรายการหนังสือทั้งหมด
func GetBooks(c *gin.Context) {
	books := []Book{
		{ID: 1, Title: "Mastering golang"},
		{ID: 2, Title: "Learn Gin Framework"},
		{ID: 3, Title: "Database with GORM"},
	}
	c.JSON(200, books)
}
