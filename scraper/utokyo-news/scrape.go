package utokyo

import (
	"bytes"
	"encoding/base64"
	"errors"
	"fmt"
	"log"
	"net/url"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/aster-void/todai-chatbot/scraper/common"
	"github.com/aster-void/todai-chatbot/scraper/iohandler"
	"github.com/gocolly/colly"
)

func ScrapeNewsAndSave() {
	pages, pdfs := ScrapeNews()
	iohandler.WriteAll("utokyo", "news", pages, pdfs)
}

const year = 365 * 24 * time.Hour

func ScrapeNews() ([]common.Page, []common.PDF) {
	url_page := make(map[string]common.Page)
	url_pdf := make(map[string]common.PDF)

	c := colly.NewCollector(
		colly.AllowedDomains("www.c.u-tokyo.ac.jp"),
		colly.CacheDir("./.colly.cache"),
	)

	// step and open result pages
	c.OnResponse(func(r *colly.Response) {
		doc, err := goquery.NewDocumentFromReader(bytes.NewReader(r.Body))
		if err != nil {
			log.Fatalln(err)
		}
		datestr := doc.Find("dt").Last().Text()
		if datestr == "" {
			return
		}
		date, err := parseDateOnly(datestr)
		if err != nil {
			fmt.Println(datestr, err)
			return
		}
		if time.Since(*date) > year {
			return
		}
		doc.Find("a").Each(func(_ int, anchor *goquery.Selection) {
			href, ok := anchor.Attr("href")
			if !ok {
				return
			}
			if !strings.HasPrefix(href, "https://www.c.u-tokyo.ac.jp/zenki/news") && !strings.HasPrefix(href, "/zenki/news") {
				return
			}
			_ = r.Request.Visit(href)
		})
	})

	c.OnHTML("div#main", func(e *colly.HTMLElement) {
		var url = formatURL(e.Request.URL)
		if !strings.HasPrefix(url, "https://www.c.u-tokyo.ac.jp/") {
			return
		}
		// indexing pages
		if strings.Contains(url, "/index_") {
			return
		}
		if url == "https://www.c.u-tokyo.ac.jp/zenki/news/" {
			return
		}
		_, didVisit := url_page[url]
		if didVisit {
			return
		}

		var doc, err = goquery.NewDocumentFromReader(bytes.NewReader(e.Response.Body))
		if err != nil {
			fmt.Println(err)
			return
		}
		var title = doc.Find("head>title").Text()
		var datestr = doc.Find("#newslist2").ChildrenFiltered("p").First().Text()
		lastUpdate, err := parseDateOnly(datestr)
		// skip old articles
		if err == nil && time.Since(*lastUpdate) > year {
			return
		}

		var content = e.ChildText("*")
		var unix = lastUpdate.Unix()
		url_page[url] = common.Page{
			URL:        url,
			Title:      title,
			LastUpdate: &unix,
			Content:    content,
		}
	})

	c.OnResponse(
		func(r *colly.Response) {
			if r.Headers.Get("Content-Type") != "application/pdf" {
				return
			}
			url := formatURL(r.Request.URL)
			if _, ok := url_pdf[url]; ok {
				return
			}

			b64 := base64.StdEncoding.EncodeToString(r.Body)

			url_pdf[url] = common.PDF{
				URL:     url,
				Content: b64,
			}
		})

	c.OnError(func(r *colly.Response, err error) {
		fmt.Println("Error on visiting URL:", r.Request.URL, "failed with error:", err)
	})

	err := c.Visit("https://www.c.u-tokyo.ac.jp/zenki/news/")
	if err != nil {
		log.Fatalln("Error on visit: ", err)
	}

	var pages []common.Page
	for _, v := range url_page {
		pages = append(pages, v)
	}
	sort.Slice(pages, func(i, j int) bool {
		return pages[i].URL < pages[j].URL
	})
	var pdfs []common.PDF
	for _, v := range url_pdf {
		pdfs = append(pdfs, v)
	}
	sort.Slice(pdfs, func(i, j int) bool {
		return pdfs[i].URL < pdfs[j].URL
	})

	return pages, pdfs
}

func formatURL(u *url.URL) string {
	var domain = "www.c.u-tokyo.ac.jp"
	var url = u.String()
	if strings.HasPrefix(url, "/") {
		url = domain + url
		url += "https://" + url
	}
	if !strings.HasPrefix(url, "https://"+domain) {
		fmt.Println("WARNING: url doesn't match expected shape (which is https://$domain...)\n:", url)
	}
	return url
}

func parseDateOnly(date string) (*time.Time, error) {
	var slice = strings.Split(date, ".")
	if len(slice) != 3 {
		return nil, errors.New("Invalid date: expected 2 dots, but got: " + date)
	}
	var sy, sm, sd = slice[0], slice[1], slice[2]
	y, err := strconv.Atoi(strings.Trim(sy, " 　"))
	if err != nil {
		return nil, errors.New("Invalid formatting of year: " + sy)
	}
	m, err := strconv.Atoi(sm)
	if err != nil {
		return nil, errors.New("Invalid formatting of month: " + sm)
	}
	d, err := strconv.Atoi(strings.Trim(sd, " 　"))
	if err != nil {
		return nil, errors.New("Invalid formatting of date: " + sd)
	}
	var res = time.Date(y, time.Month(m), d, 0, 0, 0, 0, time.UTC)
	return &res, nil
}
