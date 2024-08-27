package router

import (
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func Test(g *echo.Group) {
	g.GET("/delay/:seconds", func(c echo.Context) error {
		param := c.Param("seconds")
		sec, err := strconv.Atoi(param)
		if err != nil {
			return c.String(400, "bad encoding of :seconds : expected int-able, got "+param)
		}
		if sec < 0 {
			return c.String(400, "expected positive :sec, got negative: "+param)
		}
		dur := time.Duration(sec) * time.Second
		time.Sleep(dur)
		return c.String(200, "slept well")
	})
}
