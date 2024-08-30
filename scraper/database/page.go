package database

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Page struct {
	URL          string     `gorm:"url;primaryKey"`
	Title        string     `gorm:"title"`
	Content      string     `gorm:"content"`
	Created      *time.Time `gorm:"created"`
	RelatedWords []string
}

var ErrPageAlreadyExists = errors.New("Page already exists in db!")

func createPage(p *Page) error {
	return db.Create(p).Error
}

func SavePage(p *Page) error {
	_, err := GetPage(p.URL)
	if err == nil {
		return ErrPageAlreadyExists
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}
	// err == gorm.ErrRecordNotFound

	return createPage(p)
}

func GetPage(url string) (*Page, error) {
	var page Page
	if err := db.Find(&page).Error; err != nil {
		return nil, err
	}
	return &page, nil
}
