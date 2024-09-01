package formatter

import (
	"strings"

	"github.com/gocolly/colly"
)

func ExtractText(e *colly.HTMLElement) string {
	return e.ChildText("*")
}

func CommonFormatter(in string) (out string) {
	for _, line := range strings.Split(in, "\n") {
		if len(line) == 0 {
			continue
		}
		out += strings.ReplaceAll(line, " ", "") + "\n"
	}
	return
}
