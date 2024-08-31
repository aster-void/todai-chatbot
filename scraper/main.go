package main

import (
	"os"

	"github.com/aster-void/todai-chatbot/scraper/utbase"
	"github.com/aster-void/todai-chatbot/scraper/utokyo-news"
)

func main() {
	_ = os.RemoveAll("./result/")

	utbase.ScrapeCircles()
	utokyo.ScrapeNewsAndSave()
}
