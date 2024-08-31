package common

import "time"

type Page struct {
	URL        string     `json:"url"`
	Title      string     `json:"title"`
	LastUpdate *time.Time `json:"last_update"`
	Content    string     `json:"content"`
}

type PDF struct {
	URL       string     `json:"url"`
	Title     string     `json:"title"`
	LastUpdat *time.Time `json:"last_update"`
	Content   string     `json:"content"` // encoded in base64
}
