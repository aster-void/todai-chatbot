package scraper

import (
	"fmt"
	"log"

	"github.com/aster-void/todai-chatbot/scraper/formatter"
	"github.com/gocolly/colly"
)

func Scrape(domain, startAt, nextPageSelector, resultingPageSelector string, pathsMustSatisfy func(string) bool) (visited map[string]string) {
	visited = make(map[string]string)

	c := colly.NewCollector(
		colly.AllowedDomains(domain),
		colly.CacheDir("./.colly.cache"),
	)

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		href := e.Attr("href")
		if pathsMustSatisfy(href) {
			_ = e.Request.Visit(href)
		}
	})

	// save all requested pages
	c.OnHTML(resultingPageSelector, onHTML(visited, pathsMustSatisfy))

	// next page
	c.OnHTML(nextPageSelector, func(e *colly.HTMLElement) {
		_ = e.Request.Visit(e.Attr("href"))
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Println("Error on visiting URL:", r.Request.URL, "failed with error:", err)
	})

	err := c.Visit(startAt)
	if err != nil {
		log.Fatalln("Error on visit: ", err)
	}
	return
}

func onHTML(visited map[string]string, must func(string) bool) colly.HTMLCallback {
	return func(e *colly.HTMLElement) {
		url := e.Request.URL.String()
		_, didVisit := visited[url]
		if didVisit {
			return
		}

		if !must(url) {
			return
		}
		var text string = formatter.ExtractText(e)
		visited[url] = text
	}
}
