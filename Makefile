.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## installs dependencis
	## brew install yarn --without-node
	npm install -g firebase-tools
	cd functions && yarn install
	npm install

.PHONY: start
start: ## starts the dev environment
	@modd -f support/modd.conf

.PHONY: test
test: ## runs JavaScript tests
	@clear && node_modules/.bin/jest

.PHONY: dist
dist: ## creates a release
	@node_modules/.bin/node-sass --output-style compressed --output ./dist/assets/css ./src/css
	@node_modules/.bin/webpack --config support/webpack.prod.config.js
	@cd functions && tsc
	@rsync -avz --exclude 'assets/css' --exclude 'assets/js' public/ dist/

.PHONY: deploy
deploy: ## deploys to firebase
	firebase deploy --public dist

.PHONY: help-closure
help-closure: ## shows closure compiler options
	java -jar  node_modules/google-closure-compiler/compiler.jar --help

.PHONY: tree
tree: ## lists the projects file structure
	tree -I node_modules

.PHONY: clean
clean: ## remove files in dist folder
	rm -rf dist
