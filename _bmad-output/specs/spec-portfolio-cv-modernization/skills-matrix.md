# Skills Matrix & Open Source Catalog

## 1. 4-Layer Architectural Skills Taxonomy

### Layer 1: Backend Core & JVM Ecosystem
- **Languages & Runtimes:** Java (8, 11, 17, 21+), Kotlin.
- **Frameworks & Dependency Injection:** Spring Framework (Spring Boot, Spring Data, Spring Security, Spring Batch), Javalite, Google Guice.
- **Execution Engineering:** Concurrency, Multithreading, Thread Pools, Non-blocking I/O, Reactive streams.

### Layer 2: Distributed Systems, Data & Scale
- **Relational Data Engineering:** PostgreSQL (performance index tuning, complex queries, partitioning, lock isolation levels).
- **Asynchronous & Batch Processing:** Spring Batch, Quartz Scheduler, High-volume file streaming (encrypted PDFs/ZIPs), distributed workers.
- **Messaging & Caching:** Redis, RabbitMQ, Apache Kafka, transactional idempotency, resilient webhooks.

### Layer 3: Cloud, DevOps & Security Architecture
- **Cloud Infrastructure (AWS):** AWS S3, AWS Lambda (Serverless), AWS CloudWatch, AWS IAM security policies.
- **Protocols & Transport:** Automated SFTP pipelines, Mission-critical RESTful APIs, RPC protocols.
- **Containers & Tooling:** Docker, Kubernetes core concepts, GitHub Actions CI/CD pipelines, Linux internals.

### Layer 4: AI-Augmented Engineering & Modern SDLC
- **AI Systems & Context:** Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), LLM integration in enterprise workflows.
- **Agentic Orchestration:** Multi-agent architectures, skill and subagent design using the BMAD framework.
- **Modern Development Tooling:** Claude Code, Gemini CLI, Opencode, AI-assisted regression testing, context engineering.

---

## 2. Open Source Ecosystem & Community Catalog

| Project / Repository | Role | Technical Scope & Impact | Verification Link / Proof |
| :--- | :--- | :--- | :--- |
| **MockK (v1.14.0)** | Core Contributor (Merged PR) | Fixed critical test state leak in `confirmVerified`, ensuring hermetic test isolation across Kotlin test suites. | Release v1.14.0 / GitHub PR |
| **dotme** | Creator & Maintainer | Declarative dotfiles CLI tool with pattern filtering, atomic symlink rollbacks, and automated GitHub Actions CI/CD. | Public GitHub Repo |
| **n8n-docs** | Contributor | Documentation enhancements and workflow automation integration recipes for the open-source platform. | Official n8n Repo |
| **microbot** | Creator & Developer | Developer productivity scripts and automation tooling for local environment setup. | Public GitHub Repo |
