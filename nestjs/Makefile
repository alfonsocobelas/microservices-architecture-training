.PHONY: commit
# Constants
SEED ?= 12345

# DOCKER
docker-test-cleanup:
	@docker compose -p microservices-nestjs -f ./tests/infrastructure/docker/docker-compose.test.yml down -v
docker-test-start: docker-test-cleanup
	@docker compose -p microservices-nestjs -f ./tests/infrastructure/docker/docker-compose.test.yml up -d
docker-test-restart:
	@docker compose -p microservices-nestjs -f ./tests/infrastructure/docker/docker-compose.test.yml restart
docker-test-stop: docker-test-cleanup

docker-test-cleanup-maintenanceMs:
	@docker compose -p maintenancems-nestjs -f ./apps/maintenance-service/tests/infrastructure/docker/docker-compose.test.yml down -v
docker-test-start-maintenanceMs: docker-test-cleanup-maintenanceMs
	@docker compose -p maintenancems-nestjs -f ./apps/maintenance-service/tests/infrastructure/docker/docker-compose.test.yml up -d
docker-test-restart-maintenanceMs:
	@docker compose -p maintenancems-nestjs -f ./apps/maintenance-service/tests/infrastructure/docker/docker-compose.test.yml restart
docker-test-stop-maintenanceMs: docker-test-cleanup-maintenanceMs

docker-test-cleanup-operationsMs:
	@docker compose -p operationsms-nestjs -f ./apps/operations-service/tests/infrastructure/docker/docker-compose.test.yml down -v
docker-test-start-operationsMs: docker-test-cleanup-operationsMs
	@docker compose -p operationsms-nestjs -f ./apps/operations-service/tests/infrastructure/docker/docker-compose.test.yml up -d
docker-test-restart-operationsMs:
	@docker compose -p operationsms-nestjs -f ./apps/operations-service/tests/infrastructure/docker/docker-compose.test.yml restart
docker-test-stop-operationsMs: docker-test-cleanup-operationsMs

# GIT
commit:
	npm run commit

# TESTING
run-tests:
	@echo "\n================================="
	@echo "🧪  Running unit tests..."
	@echo "=================================\n"
	-@$(MAKE) run-unit-tests
	@echo "\n================================="
	@echo "🧪  Running integration tests..."
	@echo "=================================\n"
	-@$(MAKE) run-integration-tests
	@echo "\n================================="
	@echo "🧪  Running acceptance tests..."
	@echo "=================================\n"
	@$(MAKE) run-acceptance-tests

run-unit-tests:
	@npm run test:unit --silent
run-acceptance-tests:
	@npm run test:acceptance --silent
run-integration-tests:
	@npm run test:integration --silent
run-debug-tests-unit:
	@SEED=$$SEED npm run debug:test:unit
run-debug-tests-integration:
	@SEED=$$SEED npm run debug:test:integration

# TYPEORM MIGRATIONS
migration-generate:
	@read -p "Add the name of the migration: " name; \
	npm run typeorm:migration:generate -- "src/migrations/$$name"
migration-create:
	@read -p "Add the name of the migration: " name; \
	npm run typeorm:migration:create -- src/migrations/$$name
migration-run:
	@npm run typeorm:migration:run
migration-rollback:
	@npm run typeorm:migration:rollback
