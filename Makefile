.PHONY: run
run:
	docker compose -f docker-compose.yml run --rm app npx ts-node src/$(file).ts
