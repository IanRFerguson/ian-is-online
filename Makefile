build-react:
	@echo "Building the React frontend..."
	@cd application/frontend && npm run build

build-container:
	@echo "Containerizing the application..."
	@docker compose up --build -d

build-app:
	@make build-react
	@make build-container

build-app-clean:
	@docker compose down
	@make build-app