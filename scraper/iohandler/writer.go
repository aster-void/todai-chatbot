package iohandler

import (
	"encoding/json"
	"os"
	"path/filepath"
)

func WriteAll(group, subgroup string, content any) error {
	_ = os.MkdirAll(filepath.Join("result", group), 0777)
	f, err := os.Create(filepath.Join("result", group, subgroup))
	if err != nil {
		return err
	}
	err = json.NewEncoder(f).Encode(&content)
	if err != nil {
		return err
	}
	return nil
}
