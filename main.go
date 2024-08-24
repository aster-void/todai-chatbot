package main

import (
	"github.com/aster-void/openai-go-template/server/handler"
	"github.com/aster-void/openai-go-template/server/router"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// public ディレクトリ下のファイルに適切なパスでアクセスできるようにする
	e.Static("/", "./public")

	router.RegisterAll(e)

	handler.Start(e)
}
