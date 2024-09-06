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

ssh:
	@gcloud compute ssh --project=${GCP_PROJECT} --zone=${GCP_ZONE} ${GCP_VM_NAME}

scp:
	@bash deploy/copy_files_to_vm.sh

clean-vm:
	@bash deploy/install_docker_on_vm.sh
	@sudo apt-get install npm