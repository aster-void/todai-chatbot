package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	// "github.com/aster-void/todai-chatbot/scraper/database"
	"github.com/gocolly/colly"
)

func main() {
	_ = os.RemoveAll("./result/")

	var utbase_outdir = "ut-base"
	var utbase_circles = Scrape("ut-base.info", "https://ut-base.info/circles/", "/circles/", "div.show-page_container")
	FatalErr(WriteAll(filepath.Join(utbase_outdir, "circles"), utbase_circles, UTBASE_CIRCLE_FormatText))
}

func WriteAll(dirPrefix string, m map[string]string, formatter func(string) string) error {
	_ = os.MkdirAll(filepath.Join("result", dirPrefix), 0777)
	for k, v := range m {
		k = strings.TrimSuffix(k, "/")
		var keys = strings.Split(k, "/")
		var key = keys[len(keys)-1]
		f, err := os.Create(filepath.Join("result", dirPrefix, key))
		if err != nil {
			return err
		}
		_, err = f.WriteString(formatter(v))
		if err != nil {
			return err
		}
	}
	return nil
}

func Scrape(domain, startAt, shouldContain, container_selector string) (visited map[string]string) {
	visited = make(map[string]string)

	c := colly.NewCollector(
		colly.AllowedDomains(domain),
		colly.CacheDir("./.colly.cache"),
	)

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		href := e.Attr("href")
		if strings.Contains(href, shouldContain) {
			_ = e.Request.Visit(href)
		}
	})

	// save all requested pages
	c.OnHTML(container_selector, onHTML(visited, shouldContain))

	// next page
	c.OnHTML("a.page-link", func(e *colly.HTMLElement) {
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

func onHTML(visited map[string]string, shouldContain string) colly.HTMLCallback {
	return func(e *colly.HTMLElement) {
		url := e.Request.URL.String()
		_, didVisit := visited[url]
		if didVisit {
			return
		}

		if !strings.Contains(url, shouldContain) {
			return
		}
		s := e.ChildText("*")
		var text string = CommonFormatText(s)
		visited[url] = text
	}
}
func CommonFormatText(in string) (out string) {
	for _, line := range strings.Split(in, "\n") {
		if len(line) == 0 {
			continue
		}
		out += line + "\n"
	}
	return
}
func UTBASE_CIRCLE_FormatText(in string) (out string) {
	for _, line := range strings.Split(in, "\n") {
		switch {
		case len(line) == 0:
			continue
		case strings.Contains(line, "シェア"):
			continue
		case strings.Contains(line, "LINE"):
			continue
		// suffix
		case line == "最後まで記事を読んでくださりありがとうございました！":
			return
		}
		out += line + "\n"
	}
	return
}

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
