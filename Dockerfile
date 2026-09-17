# ============================================================
# LenderX Development Environment
# Multi-stage build for consistent dev environment
# ============================================================
FROM node:26-slim AS base

# System dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    unzip \
    git \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Install AWS CLI v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-$(uname -m).zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

# Install AWS CDK globally
RUN npm install -g aws-cdk typescript

# Set working directory
WORKDIR /app

# ── Dependencies Stage ──
FROM base AS deps
COPY package.json package-lock.json* ./
COPY infra/package.json ./infra/
COPY backend/package.json ./backend/
COPY frontend-lender/package.json ./frontend-lender/
COPY frontend-borrower/package.json ./frontend-borrower/
RUN npm install --workspaces --include-workspace-root

# ── Development Stage ──
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/infra/node_modules ./infra/node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/frontend-lender/node_modules ./frontend-lender/node_modules
COPY --from=deps /app/frontend-borrower/node_modules ./frontend-borrower/node_modules

# Python virtual environment for scripts
RUN python3 -m venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

COPY . .

# Expose dev server ports
EXPOSE 5173 5174 3000

CMD ["bash"]
