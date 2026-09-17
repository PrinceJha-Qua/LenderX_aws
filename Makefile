# ============================================================
# LenderX Makefile
# Common commands for the development workflow
# ============================================================

.PHONY: help setup deploy test clean

# Default target
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ── Setup ──
setup: ## First-time setup: install deps, create .env, setup Python venv
	@echo "📦 Installing Node dependencies..."
	npm install
	@echo "🐍 Creating Python virtual environment..."
	python3 -m venv .venv
	. .venv/bin/activate && pip install -r scripts/requirements.txt
	@echo "📋 Creating .env from template..."
	@[ -f .env ] || cp .env.example .env
	@echo "✅ Setup complete. Edit .env with your AWS credentials."

# ── Build ──
build: ## Build all workspaces
	npm run build

build-backend: ## Build backend only
	cd backend && npm run build

build-infra: ## Synthesize CDK
	npm run infra:synth

# ── Deploy ──
deploy: preflight ## Deploy everything to AWS (runs preflight first)
	npm run infra:deploy
	@echo "✅ Infrastructure deployed."
	@echo "⚠️  Update .env with the CDK outputs, then deploy frontends."

deploy-frontends: ## Deploy both frontends to Amplify
	@echo "🚀 Deploying Lender Dashboard..."
	cd frontend-lender && npm run build && npm run deploy
	@echo "🚀 Deploying Borrower Interface..."
	cd frontend-borrower && npm run build && npm run deploy

# ── Testing ──
test: ## Run all tests (unit + integration)
	npm test

test-unit: ## Run unit tests only
	npm run test:unit

test-integration: ## Run integration tests only
	npm run test:integration

test-e2e: ## Run end-to-end tests
	npm run test:e2e

test-coverage: ## Run tests with coverage report
	npm run test:coverage

preflight: ## Run lint + format check + unit tests (before deploy)
	npm run preflight

# ── Development ──
dev: ## Start both frontend dev servers
	npm run dev:all

dev-lender: ## Start lender frontend only
	npm run dev:lender

dev-borrower: ## Start borrower frontend only
	npm run dev:borrower

seed: ## Seed demo data into DynamoDB
	npm run seed

# ── Docker ──
docker-up: ## Start Docker dev environment (DynamoDB Local)
	npm run docker:up

docker-down: ## Stop Docker dev environment
	npm run docker:down

docker-shell: ## Open shell in Docker dev container
	npm run docker:shell

# ── Cleanup ──
clean: ## Remove build artifacts, deps, coverage
	npm run clean
	rm -rf .venv coverage test-results

nuke: clean ## Full reset: clean + destroy AWS resources
	npm run infra:destroy
	@echo "💥 Everything destroyed."
