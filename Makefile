default: start

start:
	DEV_MODE=true ENV_FILE=.env go run .

build:
	go build . -o target/main

serve:
	./target/main
