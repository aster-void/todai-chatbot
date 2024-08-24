package router

import (
	"github.com/aster-void/openai-go-template/server/env"
	"github.com/labstack/echo/v4"
)

func RegisterAll(e *echo.Echo) {
	if env.DEV_MODE {
		Test(e.Group("/test"))
	}

	Chat(e.Group("/chat"))
}
