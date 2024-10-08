default: start

## Setup
setup: setup-frontend setup-backend setup-root huskey
	echo "auto setup is done. now do:"
	echo "- edit server/.env"
	echo "- edit web/.env"

setup-frontend:
	cd frontend; npm ci

setup-backend:
	cd backend; npm ci
	cd backend; npx prisma generate

setup-root:
	npm ci

huskey: 
	npx husky
	git checkout .husky

test:
	npx tsc backend/test/test.ts || true
	node --env-file=./backend/.env backend/test/test.js

## Static checks

# code style
lint:
	cd backend; npx eslint .
	cd frontend; npm run lint

format:
	npx prettier . --write

format-check:
	npx prettier . --check

# type checks
type-check: type-check-backend type-check-frontend

type-check-backend:
	cd backend; npx tsc --noEmit

type-check-frontend:
	cd frontend; npx tsc --noEmit


## Runner
watch:
		(trap 'kill 0' SIGINT; make watch-frontend & make watch-backend & wait)

watch-frontend:
	cd frontend; npm run dev

watch-backend:
	cd backend; npm run dev

build:build-frontend build-backend 
	cp favicon.ico public/

build-frontend: 
	cd frontend && npm run build

build-backend: 
	cd backend && npm run build

serve:
	node --env-file=backend/.env backend/target/main.js 

start: build serve

scrape:
	cd scraper; go run .
preprocess:
	make scrape
	cp scraper/result backend/data -r
	make transform

transform: build 
		cd backend; node --env-file=.env target/bin/transform-data-and-store-to-db.js
		
	
