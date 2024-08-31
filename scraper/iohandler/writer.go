package iohandler

import (
	"encoding/json"
	"log"
	"os"
	"path/filepath"

	"github.com/aster-void/todai-chatbot/scraper/common"
)

type Content struct {
	Pages []common.Page `json:"pages"`
	PDFs  []common.PDF  `json:"pdfs"`
}

func WriteAll(group, subgroup string, pages []common.Page, pdfs []common.PDF) {
	_ = os.MkdirAll(filepath.Join("result", group), 0777)
	f, err := os.Create(filepath.Join("result", group, subgroup+".json"))
	if err != nil {
		log.Fatalln(err)
	}
	var content = Content{
		Pages: pages,
		PDFs:  pdfs,
	}
	err = json.NewEncoder(f).Encode(&content)
	if err != nil {
		log.Fatalln(err)
	}
}
