package openai

import (
	"context"

	"github.com/aster-void/todai-chatbot/server/env"
	"github.com/sashabaranov/go-openai"
)

var client *openai.Client

func init() {
	client = openai.NewClient(env.OPENAI_API_KEY)
}

func Invoke(s string, ctx context.Context) (string, error) {
	// example copied from: https://github.com/sashabaranov/go-openai
	res, err := client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: s,
				},
			},
		},
	)
	if err != nil {
		return "", err
	}
	return res.Choices[0].Message.Content, nil
}
