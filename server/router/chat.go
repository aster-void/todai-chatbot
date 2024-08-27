package router

import (
	"encoding/json"
	"fmt"

	"github.com/aster-void/todai-chatbot/domain/chat"
	"github.com/labstack/echo/v4"
)

func Chat(g *echo.Group) {
	g.POST("/", func(c echo.Context) error {
		// リクエストボディを JSON として解釈して request.body に格納する
		// (クライアントから送られてきたデータは無条件で信用しないが、
		// Go 言語には「型」があるのでデータの型は
		// クライアントではなく json パッケージの責任になる)
		var request struct {
			PromptText string `json:"promptText"`
		}
		err := json.NewDecoder(c.Request().Body).Decode(&request)
		if err != nil {
			return c.NoContent(400)
		}

		text, err := chat.Exchange(request.PromptText, c.Request().Context())
		if err != nil {
			fmt.Println(err)
			return c.NoContent(500)
		}
		type response struct {
			Content string `json:"content"`
		}

		return c.JSON(200, response{
			Content: text,
		})
	})

}
