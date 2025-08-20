package main

import (
	"github.com/gin-gonic/gin"
)

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	r := gin.Default()

	r.GET("/users", func(c *gin.Context) {
		user := []User{{ID: "1", Name: "Kamolnert"}} // Jason ขึ้นตอนการแปลงข้อมูลจากไลบารี่
		// มาเป็นเจสันเพื่อออกข้างนอกคือการทำ มาเชล
		// ทดสอบ api แต่ละเส้นทาง เร้า โดยใช้เครื่องมือที่ชื่อว่า เคอร์

		c.JSON(200, user) // แปลงจากสตรัคให้เป็น เจสัน เป็นฟังก์ชัน รีเทินค่่า httpโค้ด(200) กับ ข้อมูลที่แปลงเป็นเจสัน
	})

	r.Run(":8080")
}
