package chat

import (
	"context"

	"github.com/aster-void/todai-chatbot/domain/openai"
)

func Exchange(text string, ctx context.Context) (string, error) {
	res, err := openai.Invoke(text, ctx)
	if err != nil {
		return "", err
	}
	return res, nil
}
