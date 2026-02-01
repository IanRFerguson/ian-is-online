ruff:
	@uv run ruff check --fix .
	@uv run ruff format .


app:
	@docker compose up --build ian-is-online

backend:
	@docker compose up --build backend

frontend:
	@cd application/frontend && npm run start