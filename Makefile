build-react:
	@echo "Building the React frontend..."
	@cd application/frontend && npm run build

build-container:
	@echo "Containerizing the application..."
	@docker compose down
	@docker compose up --build -d

build-app:
	@docker compose down
	@make build-react
	@make build-container

push:
	@echo "Checking for unstaged changes..."
	@bash deploy/branch_changes.sh
	@make build-react
	@echo "Pushing to GitHub..."
	@git add . && git commit -m "compile react" && git push