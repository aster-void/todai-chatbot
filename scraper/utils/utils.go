package utils

import (
	"fmt"
	"log"
)

func PrintErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}
func FatalErr(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}
