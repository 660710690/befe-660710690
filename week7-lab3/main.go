package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

var db *sql.DB

func initDB() {
	var err error

	host := getEnv("DB_HOST", "")
	name := getEnv("DB_NAME", "")
	user := getEnv("DB_USER", "")
	password := getEnv("DB_PASSWORD", "")
	port := getEnv("DB_PORT", "")

	conStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, name)
	fmt.Println("Connecting with:", conStr) // debug
	db, err = sql.Open("postgres", conStr)
	if err != nil {
		log.Fatal("failed to open database:", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal("failed to connect to database:", err)
	}
	log.Println("successfully connected to database")
}

func main() {
	initDB()
}
