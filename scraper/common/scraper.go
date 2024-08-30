package common

import (
	"fmt"
	"log"
	"net/url"
	"sort"
	"strings"

	"github.com/aster-void/todai-chatbot/scraper/formatter"
	"github.com/go-playground/validator"
	"github.com/gocolly/colly"
)

type Config struct {
	Domain  string `validate:"required"`
	StartAt string `validate:"required"`

	NextPageSelector      string                     `validate:"required"`
	PathsMustSatisfy      func(string) bool          `validate:"required"`
	ResultPageMustSatisfy func(*colly.Response) bool `validate:"required"`

	TitleFormatter func(*colly.Response) string `validate:"required"`

	ResultPageLinkSelector    string              `validate:"required"`
	ResultPageContentSelector string              `validate:"required"`
	ContentFormatter          func(string) string `validate:"required"`
}

type Page struct {
	URL     string `json:"url"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type PDFPage struct {
	URL     string `json:"url"`
	Title   string `json:"title"`
	Content []byte `json:"content"`
}

func Scrape(cf *Config) []Page {
	visited := make(map[string]Page)
	validate := validator.New()
	err := validate.Struct(cf)
	if err != nil {
		log.Fatalln(err)
	}

	c := colly.NewCollector(
		colly.AllowedDomains(cf.Domain),
		colly.CacheDir("./.colly.cache"),
	)

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		href := e.Attr("href")
		if cf.PathsMustSatisfy(href) {
			_ = e.Request.Visit(href)
		}
	})

	// save all requested pages
	convertPage := func(e *colly.HTMLElement) *Page {
		var url = formatURL(e.Request.URL, cf)

		if !cf.ResultPageMustSatisfy(e.Response) {
			return nil
		}
		var text string = formatter.ExtractText(e)
		text = cf.ContentFormatter(text)
		return &Page{
			URL:     url,
			Title:   cf.TitleFormatter(e.Response),
			Content: text,
		}
	}
	c.OnHTML(cf.ResultPageContentSelector, saveHTML(visited, convertPage))

	// next page
	c.OnHTML(cf.NextPageSelector, func(e *colly.HTMLElement) {
		_ = e.Request.Visit(e.Attr("href"))
	})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Println("Error on visiting URL:", r.Request.URL, "failed with error:", err)
	})

	err = c.Visit(cf.StartAt)
	if err != nil {
		log.Fatalln("Error on visit: ", err)
	}

	var pages []Page
	for _, v := range visited {
		pages = append(pages, v)
	}
	sort.Slice(pages, func(i, j int) bool {
		return pages[i].URL < pages[j].URL
	})

	return pages
}

func savePDFifFound(pdfs map[string]PDFPage, config *Config) colly.ResponseCallback {
	return func(e *colly.Response) {
		if e.Headers.Get("Content-Type") != "application/pdf" {
			return
		}
		url := formatURL(e.Request.URL, config)
		pdfs[url] = PDFPage{
			URL: url,
		}
	}
}
func saveHTML(visited map[string]Page, pageConverter func(e *colly.HTMLElement) *Page) colly.HTMLCallback {
	return func(e *colly.HTMLElement) {
		url := e.Request.URL.String()
		_, didVisit := visited[url]
		if didVisit {
			return
		}

		var page = pageConverter(e)
		if page == nil {
			return
		}

		visited[url] = *page
	}
}

func formatURL(u *url.URL, cf *Config) string {
	var url = u.String()
	if strings.HasPrefix(url, "/") {
		url = cf.Domain + url
		url += "https://" + url
	}
	if !strings.HasPrefix(url, "https://"+cf.Domain) {
		fmt.Println("WARNING: url doesn't match expected shape (which is https://$domain...)\n:", url)
	}
	return url
}
