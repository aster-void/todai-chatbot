package common

type Page struct {
	URL        string `json:"url"`
	Title      string `json:"title"`
	LastUpdate *int64 `json:"lastUpdate"` // Unix Timestamp
	Content    string `json:"content"`
}

type PDF struct {
	URL       string `json:"url"`
	Title     string `json:"title"`
	LastUpdat *int64 `json:"lastUpdate"` // Unix Timestamp
	Content   string `json:"content"`    // encoded in base64
}
