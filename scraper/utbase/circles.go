package utbase

import (
	"regexp"

	// "github.com/aster-void/todai-chatbot/scraper/database"
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
	var utbase_circles = Scrape(&Config{
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
		TitleFormatter: func(e *colly.HTMLElement) string {
			return e.ChildText("h1.js-toc-ignore")
		},
		ContentFormatter: formatter.UTBASE_CIRCLE,
	})
	iohandler.WriteAll("ut-base", "circles", utbase_circles, nil)
}
