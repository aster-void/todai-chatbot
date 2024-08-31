package iohandler

import (
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/aster-void/todai-chatbot/scraper/common"
)

func WriteAll(group, content string, pages []common.Page) error {
	_ = os.MkdirAll(filepath.Join("result", group), 0777)
	f, err := os.Create(filepath.Join("result", group, content))
	if err != nil {
		return err
	}
	err = json.NewEncoder(f).Encode(&pages)
	if err != nil {
		return err
	}
	return nil
}
