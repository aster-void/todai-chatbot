package main

import (
	"os"
	"regexp"

	// "github.com/aster-void/todai-chatbot/scraper/database"
	"github.com/aster-void/todai-chatbot/scraper/formatter"
	"github.com/aster-void/todai-chatbot/scraper/iohandler"
	"github.com/aster-void/todai-chatbot/scraper/scraper"
)

func main() {
	_ = os.RemoveAll("./result/")

	var utbase = "ut-base"
	var utbase_circles_regexp, err = regexp.Compile(`ut-base.info\/circles\/\d+`)
	FatalErr(err)
	var utbase_circles = scraper.Scrape(
		"ut-base.info",
		"https://ut-base.info/circles/",
		"a.page-link",
		"div.show-page_container",
		func(path string) bool {
			return utbase_circles_regexp.MatchString(path)
		})
	err = iohandler.WriteAll(utbase, "circles", utbase_circles, formatter.UTBASE_CIRCLE)
	FatalErr(err)
}
