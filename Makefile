# Bundle the React frontend into static files
react:
	@echo "Building the React frontend..."
	@cd application/frontend-chakra && npm run build

# Run docker locally
container:
	@echo "Containerizing the application..."
	@docker compose down
	@if [ ! -z $(build) ]; then 	\
		docker compose up --build;	\
	else							\
		docker compose up; 			\
	fi

# Wraps the two commands above
app:
	@docker compose down
	@make react
	@make container

# Pushes to the remote branch
# NOTE - This only works on a clean branch with no unstaged changes
push:
	@echo "Checking for unstaged changes..."
	@bash deploy/branch_changes.sh
	@make react
	@echo "Pushing to GitHub..."
	@git add . && git commit -m "compiled react frontend" && git push