package main

import (
	"os"

	"github.com/aster-void/todai-chatbot/scraper/utbase"
)

func main() {
	_ = os.RemoveAll("./result/")

	utbase.ScrapeCircles()
}
