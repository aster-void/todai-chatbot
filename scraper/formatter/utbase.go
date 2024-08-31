package formatter

import "strings"

func UTBASE_CIRCLE(in string) (out string) {
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
