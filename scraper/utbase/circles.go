package utbase

import (
	"regexp"

	// "github.com/aster-void/todai-chatbot/scraper/database"
	"github.com/aster-void/todai-chatbot/scraper/common"
	"github.com/aster-void/todai-chatbot/scraper/formatter"
	"github.com/aster-void/todai-chatbot/scraper/iohandler"
	"github.com/aster-void/todai-chatbot/scraper/utils"
	"github.com/gocolly/colly"
)

func ScrapeCircles() {
	utbase_circles_regexp, err := regexp.Compile(`(https://ut-base.info)?\/circles.+`)
	utils.FatalErr(err)
	result_page_regexp, err := regexp.Compile(`(https://ut-base.info)?\/circles\/\d+`)
	utils.FatalErr(err)
	var utbase_circles = common.Scrape(&common.Config{
		Domain:                    "ut-base.info",
		StartAt:                   "https://ut-base.info/circles/",
		NextPageSelector:          "a.page-link",
		ResultPageLinkSelector:    "a[href]",
		ResultPageContentSelector: "div.show-page_container",
		PathsMustSatisfy: func(path string) bool {
			ok := utbase_circles_regexp.MatchString(path)
			return ok
		},
		ResultPageMustSatisfy: func(r *colly.Response) bool {
			return result_page_regexp.MatchString(r.Request.URL.String())
		},
		TitleFormatter: func(r *colly.Response) string {
			return "title"
		},
		ContentFormatter: formatter.UTBASE_CIRCLE,
	})
	err = iohandler.WriteAll("ut-base", "circles.json", utbase_circles)
	utils.FatalErr(err)
}
