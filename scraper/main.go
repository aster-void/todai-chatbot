package main

import (
	"os"
)

func main() {
	_ = os.RemoveAll("./result/")

	ScrapeUTBASECircles()
}
