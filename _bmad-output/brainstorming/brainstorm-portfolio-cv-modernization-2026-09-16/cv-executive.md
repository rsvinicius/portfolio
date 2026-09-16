# Curriculum Vitae Executivo — Vinicius Rodrigues Silva
**Senior Software Engineer | Backend & Distributed Systems**

---

> **Document Blueprint & ATS Specifications**
> - **Público-alvo:** Posições Senior / Staff Backend & Distributed Systems em Fintechs Globais e Big Techs.
> - **Formato:** Markdown otimizado para renderização limpa e compatibilidade estrita com ATS (*Applicant Tracking Systems* como Greenhouse, Lever, Workday e Taleo).
> - **Estrutura:** Bilíngue Ready — Conteúdo estruturado em Português com terminologia técnica padrão internacional (EN), acompanhado de guia de tradução cirúrgica para aplicações internacionais.

---

## 1. Guia de Exportação para PDF & Regras ATS

Para exportar este currículo para PDF com máximo índice de legibilidade em scanners automáticos (ATS) e avaliação humana de recrutadores executivos, siga as diretrizes abaixo:

### 1.1 Regras de Ouro ATS (Applicant Tracking Systems)
1. **Tipografia Padrão do Sistema:** Utilize fontes sans-serif neutras e amplamente suportadas (ex.: *Inter*, *Roboto*, *Helvetica*, *Arial* ou *Calibri*).
2. **Estrutura Linear de Coluna Única:** Nunca utilize tabelas complexas, caixas de texto flutuantes ou layouts de duas colunas para informações cruciais de experiência. Scanners ATS processam o fluxo textual verticalmente (top-to-bottom).
3. **Cabeçalhos Semânticos Clássicos:** Mantenha títulos de seções padronizados (`Resumo Executivo`, `Experiência Profissional`, `Formação Acadêmica`, `Habilidades Técnicas`).
4. **Sem Gráficos ou Barras de Nível:** Níveis percentuais de habilidades (ex.: "Java 90%") são descartados por parsers e desconsiderados por líderes técnicos. Utilize organização categórica contextualizada.
5. **Datas e Métricas Uniformes:** Utilize formatos de data consistentes (`Mês/Ano – Mês/Ano` ou `Ano – Atual`) e numerais arábicos claros para métricas de impacto (+500M, +10M, 99.99%).

### 1.2 Configuração de Impressão / Print CSS
Se utilizar utilitários como `pandoc`, `wkhtmltopdf`, Markdown-to-PDF no VS Code ou a função de impressão do navegador:

```css
@page {
  size: A4;
  margin: 18mm 16mm 18mm 16mm;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 9.5pt;
  line-height: 1.45;
  color: #1a1a1a;
  background: #ffffff;
}

h1 {
  font-size: 19pt;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2pt;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 11.5pt;
  font-weight: 700;
  color: #0f172a;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 3pt;
  margin-top: 12pt;
  margin-bottom: 6pt;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

h3 {
  font-size: 10.5pt;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1pt;
}

p, ul {
  margin-top: 0;
  margin-bottom: 5pt;
}

ul {
  padding-left: 14pt;
}

li {
  margin-bottom: 2.5pt;
}

a {
  color: #0f172a;
  text-decoration: none;
}

.job-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
```

---

# [CURRÍCULO EXECUTIVO]

# VINICIUS RODRIGUES SILVA
**Senior Software Engineer | Distributed Systems & Financial Backend**  
São Paulo, Brasil • Disponível para posições remotas globais e híbridas  
**E-mail:** [vrodrigues.code@gmail.com](mailto:vrodrigues.code@gmail.com) • **LinkedIn:** [linkedin.com/in/rsvinicius](https://www.linkedin.com/in/rsvinicius) • **GitHub:** [github.com/rsvinicius](https://github.com/rsvinicius)

---

## RESUMO EXECUTIVO

Engenheiro de Software Sênior especializado no ecossistema **JVM (Java/Kotlin)** e **Sistemas Distribuídos de Alta Criticidade Financeira**. Experiência sólida em arquitetura de microsserviços de alto throughput e processamento batch massivo, atuando em ecossistemas que movimentam **+500 TPS**, **+$100B em volume de pagamentos** e mais de **500 milhões de requisições/mês** para **+10 milhões de usuários finais**.

Especialista em pipelines de *Billing B2B*, reconciliação financeira automatizada, motores antifraude em tempo real e entrega escalável de relatórios massivos via streaming assíncrono. Contribuidor open-source ativo (incluindo correção de isolamento de estado na biblioteca padrão **MockK v1.14.0** e autor da CLI **dotme**). Forte domínio de modelagem relacional complexa (PostgreSQL), cloud AWS, resiliência arquitetural e adoção prática de IA generativa no ciclo de desenvolvimento moderno (SDLC via MCP, RAG e AI Agents). Mestre em Engenharia de Software (*Lato Sensu* / MBA) pela **USP/Esalq** e Bacharel em Engenharia Elétrica pela **UNESP**.

---

## COMPETÊNCIAS TÉCNICAS (TECHNICAL STACK)

- **Linguagens & Backend Core:** Java (8, 11, 17, 21), Kotlin, Go, Spring Boot, Spring Batch, Javalite, Guice, Hibernate/JPA, Clean Architecture, Domain-Driven Design (DDD), TDD, SOLID.
- **Sistemas Distribuídos & Dados:** Microservices Architecture, Event-Driven Architecture, High Throughput / Low Latency, Batch Processing, PostgreSQL, MySQL, Redis, Apache Kafka, RabbitMQ, Transações Distribuídas, Query Optimization & SQL Tuning.
- **Cloud, DevOps & Infraestrutura:** AWS (S3, Lambda, SQS, SNS, ECS, CloudWatch), Docker, Kubernetes, CI/CD (GitHub Actions, GitLab CI), Linux/Shell Scripting, SFTP seguro, File Streaming de grandes volumes.
- **IA & Modern Engineering (SDLC Aumentado):** Model Context Protocol (MCP), RAG (Retrieval-Augmented Generation), Arquitetura de Agentes Autônomos & Multi-Agent Workflows, Custom Skills, Claude, Gemini, Opencode, Automação de Pipelines de Engenharia.

---

## EXPERIÊNCIA PROFISSIONAL

### **TRUSTLY** | Global Pay-by-Bank & Open Banking Leader
*Líder global em pagamentos conta-a-conta: +500 TPS, +$100B em volume transacionado, 110M+ consumidores e 9.000+ merchants globais em 30+ países.*  
**Senior Software Engineer — Core B2B & Financial Services** | *2025 – Presente*
- **Sistemas de Billing de Alta Criticidade:** Engenharia e manutenção dos motores centrais de faturamento B2B e cobrança de merchants globais, assegurando acurácia contábil estrita e processamento determinístico em conformidade com SLAs de fintechs de primeira linha.
- **Geração e Reconciliação de Relatórios Massivos (Reports Engine):** Arquitetura e otimização de pipelines de processamento assíncrono e batch em larga escala utilizando **Spring Batch** e **Quartz Scheduler** para extração, consolidação e reconciliação contábil de milhões de eventos transacionais diários.
- **Engenharia de Dados e File Streaming Eficiente:** Implementação de mecanismos de streaming de arquivos em memória reduzida para compilação de relatórios massivos em formatos pesados (PDFs, ZIPs e CSVs), integrando **AWS S3**, **AWS Lambda** e despacho automatizado e seguro via **SFTP** para instituições financeiras parceiras.
- **Ecossistema JVM Poliglota & Performance de Banco:** Desenvolvimento em arquiteturas resilientes com Java poliglota de frameworks (**Spring Boot**, **Javalite** e **Google Guice**), com refatoração e *tuning* de consultas complexas em **PostgreSQL**, reduzindo contenção de locks e tempo de execução de rotinas analíticas críticas.

---

### **ALELO BRASIL** | Líder em Benefícios, Gestão de Despesas e Pagamentos Corporativos
*Elo / Bradesco & Banco do Brasil: +500M requisições/mês, +150 mil empresas-clientes e +10 milhões de usuários ativos.*  
**Trajetória Consolidada de Engenharia de Software (Estagiário → Desenvolvedor Jr → Pleno → Sênior)** | *2021 – 2025 (4+ anos)*
- **Escala e Disponibilidade em Larga Escala:** Evolução contínua da malha de microsserviços em Java/Kotlin (Spring Boot), sustentando volumetrias superiores a **500 milhões de requisições/mês** com alta taxa de disponibilidade (**SLA 99.99%**) em operações transacionais de cartões e contas digitais.
- **Arquitetura de Microsserviços e APIs de Missão Crítica:** Concepção e entrega de dezenas de serviços distribuídos desacoplados com **Spring Boot**, mensageria assíncrona (**Kafka/RabbitMQ**) e cache distribuído com **Redis**, mitigando gargalos de throughput em horários de pico comercial.
- **Autenticação, Segurança e Conformidade:** Implementação e endurecimento de fluxos de autenticação/autorização seguros (OAuth2, JWT, RBAC), garantindo estrita integridade transacional contra fraudes de identidade e vazamento de permissões.
- **Otimização de Persistência & Migração Sem Downtime:** Refatoração de modelos de dados relacionais e não-relacionais (PostgreSQL/Oracle/MongoDB), conduzindo migrações graduais de esquemas em tabelas com centenas de milhões de registros sem indisponibilidade de serviços.
- **Liderança Técnica & Cultura de Qualidade:** Condução de code reviews rigorosos, estabelecimento de padrões de arquitetura limpa e mentoria direta de desenvolvedores juniores e estagiários, elevando a cobertura de testes automatizados unitários e integrados em todo o domínio de cartões.

---

## CONTRIBUIÇÕES OPEN SOURCE & PROJETOS DE DESTAQUE

### **MockK** — Biblioteca Padrão de Mocking para Ecossistema Kotlin (v1.14.0)
*Mundialmente utilizada por centenas de milhares de desenvolvedores e corporações no ecossistema Kotlin.*
- **Correção Crítica de Vazamento de Estado (*State Leak Fix*):** Identificou e corrigiu um vazamento de estado interno no mecanismo de `confirmVerified`, onde verificações acumuladas em threads concorrentes contaminavam asserções subsequentes.
- **Impacto:** Restabeleceu o isolamento estrito entre testes unitários assíncronos, prevenindo falsos-positivos/falsos-negativos em suítes de teste de alta escala no release global **v1.14.0**.

### **dotme** — CLI Utilitária para Gerenciamento de Dotfiles e Ambientes de Engenharia
*Ferramenta de automação CLI de alto desempenho para desenvolvedores (Criador e Mantenedor).*
- **Arquitetura de Sincronização Atômica:** Desenvolvida para versionamento e aplicação declarativa de dotfiles com suporte a filtragem inteligente por *pattern matching* (globs), *dry-run* determinístico e rollback automático.
- **Engenharia de Entrega:** Pipeline completo de CI/CD via GitHub Actions com compilação cruzada, automação de releases semânticas e cobertura de testes automatizados de ponta a ponta.

### **Outras Contribuições Comunitárias:**
- **n8n-docs:** Contribuição ativa com correções e aprimoramentos na documentação oficial da plataforma global de orquestração de fluxos e automação low-code/code.
- **microbot:** Desenvolvimento e manutenção de automações utilitárias para infraestrutura de desenvolvimento e monitoramento de rotinas locais.

---

## ESTUDO DE CASO EM ENGENHARIA: SISTEMA ANTIFRAUDE FINANCEIRO

### **Motor Transacional de Análise de Risco & Detecção Heurística em Tempo Real**
- **Calibração Dinâmica com Amortecimento (*Dynamic Damping Calibration*):**
  - Implementou algoritmo de reponderação de limites de risco com média ponderada amortecida (fator de atenuação $0.8 / 0.2$), permitindo ajustes preventivos baseados em comportamento histórico e intervenções *human-in-the-loop* sem oscilações abruptas no motor de decisão.
- **Detecção Espaço-Temporal em Janela Deslizante (*Sliding Window Analysis*):**
  - Desenvolveu motor analítico baseado em janelas deslizantes de 60 minutos para cálculo instantâneo de velocidade transacional e anomalias de dispersão geográfica, identificando e bloqueando automaticamente transações simultâneas em coordenadas fisicamente impossíveis.
- **Governança e Controle de Acesso Baseado em Papéis (RBAC):**
  - Segregação de responsabilidades estrita em três níveis de privilégio (`MERCHANT`, `ADMIN`, `SUPPORT`), isolando a parametrização de regras de detecção de acessos operacionais de auditoria e auditoria financeira.

---

## FORMAÇÃO ACADÊMICA

- **MBA em Engenharia de Software (Pós-Graduação *Lato Sensu*)**  
  **USP/Esalq — Universidade de São Paulo** | *Concluído*  
  *Foco:* Arquitetura de Sistemas Distribuídos, Microsserviços, Design Patterns, Engenharia de Requisitos e Métodos Ágeis de Alta Performance.
- **Bacharelado em Engenharia Elétrica**  
  **UNESP — Universidade Estadual Paulista "Júlio de Mesquita Filho"** | *Concluído*  
  *Foco:* Sistemas de Controle e Automação, Eletrônica de Potência, Programação Aplicada, Modelagem Matemática e Resolução de Problemas Complexos.

---

## IDIOMAS

- **Português:** Nativo
- **Inglês:** Avançado / Fluente para Comunicação Técnica, Negociação e Escrita Executiva (Apto para times distribuídos globais)

---

# 2. Guia de Tradução & Adaptação para Vagas Internacionais (US / Europe / Remote Global)

Ao submeter candidaturas para empresas norte-americanas, europeias ou multinacionais de língua inglesa, utilize as seguintes diretrizes de equivalência semântica:

### 2.1 Mapeamento de Títulos e Cargos
| Cargo Original (BR) | Título Internacional Padronizado (US/EU) | Observação de Mercado |
| :--- | :--- | :--- |
| Engenheiro de Software Sênior | **Senior Software Engineer — Backend & Distributed Systems** | Foco em *Systems / Core Platform / Infrastructure* |
| Trajetória Consolidada (Estágio a Sênior) | **Software Engineer Progression (Intern to Senior)** | Demonstra lealdade, crescimento contínuo e autonomia técnica comprovada |
| Core B2B & Financial Services | **Core Financial Backend & Merchant Billing Infrastructure** | Alinhamento direto com jargão de Fintechs (Stripe, Adyen, Trustly, Plaid) |

### 2.2 Equivalência da Formação Acadêmica
- **USP/Esalq (MBA em Engenharia de Software):**
  - Tradução recomendada: *Master of Business Administration (MBA) in Software Engineering — University of São Paulo (USP)*.
  - Contexto: A USP é consistentemente classificada como a universidade nº 1 da América Latina no ranking global QS World University Rankings.
- **UNESP (Engenharia Elétrica):**
  - Tradução recomendada: *Bachelor of Science (B.S.) in Electrical Engineering — São Paulo State University (UNESP)*.
  - Contexto: Tradução exata do diploma de 5 anos de Engenharia (STEM degree).

### 2.3 English Executive Summary (Drop-in Replacement)
```markdown
## EXECUTIVE SUMMARY
Senior Software Engineer specializing in the JVM ecosystem (Java/Kotlin) and High-Throughput Distributed Financial Systems. Proven track record architecting mission-critical microservices and high-volume batch pipelines for fintech platforms processing +500 TPS, +$100B in transaction volume, and +500M monthly requests across 10M+ active users.

Deep expertise in B2B financial billing, automated transaction reconciliation, real-time anti-fraud engines, and high-performance file streaming (AWS S3, Lambdas, secure SFTP). Active open-source contributor, including state leak isolation fixes for the standard MockK v1.14.0 library and author of the dotme CLI. Strong background in complex relational database tuning (PostgreSQL), resilient cloud architecture (AWS), and production-grade AI-augmented SDLC workflows (MCP, RAG, AI Agents). Holds an MBA in Software Engineering from the University of São Paulo (USP) and a B.S. in Electrical Engineering from UNESP.
```

### 2.4 English Highlight Bullets for Direct Application
- **Trustly:** *"Engineered critical B2B merchant billing and financial settlement pipelines handling +500 TPS and multi-billion-dollar transaction flows with zero-tolerance ledger discrepancy."*
- **Trustly (Reports):** *"Designed high-throughput batch extraction and reconciliation workflows via Spring Batch and Quartz Scheduler, streaming massive compressed audit payloads (ZIP/PDF/CSV) directly to AWS S3 and secure SFTP servers."*
- **Alelo (Scale):** *"Scaled and maintained core card issuance and corporate benefits microservices in Java/Kotlin, serving +500M requests/month across 150k enterprise clients and 10M+ active accounts under a 99.99% availability SLA."*
- **Open Source (MockK):** *"Authored core bug fix in MockK v1.14.0 resolving concurrency state leakage in `confirmVerified`, ensuring isolated assertion integrity across Kotlin testing suites globally."*
- **Engineering Case Study (Antifraud):** *"Architected real-time fraud mitigation engine featuring dynamic damping calibration (0.8/0.2 factor) and 60-minute geo-temporal sliding window anomaly detection with multi-tenant RBAC enforcement."*
