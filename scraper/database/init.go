package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	var err error
	err = godotenv.Load("../.env")
	if err != nil {
		log.Fatalln("godotenv: Failed to load .env: ", err)
	}
	url := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(url), &gorm.Config{
		SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Fatalln("GORM: Failed to open database: ", err)
	}

	if err := db.AutoMigrate(&Page{}); err != nil {
		log.Fatalln(err)
	}
}
