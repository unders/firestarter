.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## installs dependencis
	npm install

.PHONY: start
start: ## starts the dev environment
	@modd -f support/modd.conf

.PHONY: test
test: ## runs JavaScript tests.
	@clear && node_modules/.bin/jest

.PHONY: tree
tree: ## lists the projects file structure
	tree -I node_modules
