package main

import (
	"fmt"
)

// var email string "poocha_k@su.ac.th"

func main() {
	// var name string = "kamolnert"
	var age int = 21

	email := "poocha_k@su.ac.th"
	gpa := 3.75

	firstname, lastname := "kamolnert", "poocha"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email, gpa)
}
