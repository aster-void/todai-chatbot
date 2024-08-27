default: start

# Setup
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

watch:
		(trap 'kill 0' SIGINT; (cd frontend && npm run dev) && (cd backend && npm run dev) & wait)

build: build-backend build-frontend

build-frontend: 
		cd frontend && npm run build

build-backend: 
		cd backend && npm run build

serve:
	./target/main
