default: start

watch:
		(trap 'kill 0' SIGINT; (cd frontend && npm run dev) && (cd backend && npm run dev) & wait)

build: build-server build-frontend

build-frontend: 
		cd frontend 
		npm run build

build-server: 
		cd backend 
		npm run build

start:
	DEV_MODE=true ENV_FILE=.env go run .

build:
	go build -o target/main .

serve:
	./target/main
