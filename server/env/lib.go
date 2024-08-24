package env

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func init() {
	if envfile := os.Getenv("ENV_FILE"); envfile != "" {
		err := godotenv.Load(envfile)
		if err != nil {
			log.Fatalln("Failed to load env file:", err)
		}
	}

	OPENAI_API_KEY = os.Getenv("OPENAI_API_KEY")
	if OPENAI_API_KEY == "" {
		log.Fatalln("You must provide an API key!")
	}

	if os.Getenv("DEV_MODE") == "true" {
		DEV_MODE = true
	}

	port := os.Getenv("PORT")
	if port == "" {
		PORT = 0
	} else {
		iport, err := strconv.Atoi(port)
		if err != nil {
			log.Fatalln(err)
		}
		PORT = uint16(iport)
	}
}

var PORT uint16
var OPENAI_API_KEY string = "not initialized"
var DEV_MODE bool
