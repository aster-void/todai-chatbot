package iohandler

import (
	"os"
	"path/filepath"
	"strings"
)

func WriteAll(group, content string, m map[string]string, formatter func(string) string) error {
	_ = os.MkdirAll(filepath.Join("result", group, content), 0777)
	for k, v := range m {
		k = strings.TrimSuffix(k, "/")
		var keys = strings.Split(k, "/")
		var key = keys[len(keys)-1]
		f, err := os.Create(filepath.Join("result", group, content, key))
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
