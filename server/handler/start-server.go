package handler

import (
	"log"

	"github.com/aster-void/openai-go-template/server/env"
	"github.com/aster-void/openai-go-template/server/lib/server"
	"github.com/labstack/echo/v4"
)

func Start(e *echo.Echo) {

	// 使用するホスティングサービス (Render など) によってはリクエストを受け付けるポートが指定されている場合がある。
	// たいていの場合は PORT という名前の環境変数を通して参照できる。
	var port = env.PORT
	if port == 0 {
		port = 3000 // default port
	}
	err := server.StartWithProperShutdown(e, port)
	if err != nil {
		log.Fatalln(err)
	}
}
