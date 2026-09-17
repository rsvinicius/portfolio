const translations = {
    en: {
        // Navigation
        about: "About",
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
        opensource: "Open Source",
        education: "Education",
        contact: "Contact",
        
        // Hero Section
        availabilityBeacon: "Open to remote opportunities",
        heroRole: "Software Engineer • Backend",
        heroDesc: "Software Engineer specializing in JVM architectures, distributed systems, and financial backends.",
        role: "Software Engineer • Backend",
        specialization: "Software Engineer specializing in JVM architectures, distributed systems, and financial backends.",
        getInTouch: "Initiate Direct Contact",
        viewProjects: "View Projects",
        downloadCv: "Download ATS CV (PDF)",
        downloadCvShort: "ATS CV (PDF)",
        contactEmail: "Contact via Email",
        sendDirectEmail: "Send Direct Email",
        copyEmail: "Copy Email",
        emailCopied: "Email copied to clipboard",
        contactSectionIndex: "07. CONTACT",
        resumeLabel: "Resume",
        contactConnect: "Connect",
        contactInspect: "Inspect Code",

        // Metric Stat Cards
        metric1Num: "+500M",
        metric1Label: "B2C Scale Throughput",
        metric1Sub: "Microservices scale across 10M+ users",
        metric2Num: "+$100B",
        metric2Label: "B2B Financial Volume",
        metric2Sub: "Global processed volume & reconciliation",
        metric3Num: "+500 TPS",
        metric3Label: "Peak Processing Rate",
        metric3Sub: "High-scale transaction volume & streaming",

        // Contact Pre-filled Email Strings
        contactEmailSubject: "Software Engineering Opportunity - Vinicius R. Silva",
        contactEmailBody: "Hi Vinicius,\n\nI reviewed your portfolio and would like to discuss a Software Engineer role at...",
        contactText: "Direct outreach for software engineering opportunities, backend development, and high-throughput systems.",
        
        // About Section
        aboutMe: "About Me",
        aboutText1: "I am a passionate software developer with expertise in Java, Kotlin, Spring and Microservices Architecture. With a strong foundation in software engineering principles, I specialize in building robust, scalable applications that solve real-world problems.",
        aboutText2: "My experience spans across developing REST APIs, implementing authentication systems, creating microservices architectures, and working with various databases. I am driven by clean code practices and continuously strive to improve my skills and stay updated with the latest technologies.",
        aboutText3: "When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.",
        
        // Projects Section (03. PROJECTS)
        projectsSectionIndex: "03. PROJECTS",
        featuredProjects: "Interactive Engineering Showcases",
        projectsSubtitle: "Interactive showcases and developer tooling demonstrating backend systems architecture, real-time risk heuristics, and command-line automation.",
        viewAllProjects: "View All Repositories on GitHub",
        viewOnGitHub: "View on GitHub",

        // Antifraud Sandbox Widget
        antifraudTitle: "Antifraud Financial Security Engine • Real-Time Sandbox",
        antifraudSubtitle: "Spring Boot REST API • Real-time visual sandbox of transaction risk heuristics & adaptive feedback",
        antifraudArchitectureNote: "<strong class=\"text-[#0F172A] dark:text-[#F9FAFB]\">Architecture Context:</strong> The underlying project is an enterprise Spring Boot REST API featuring a 4-tier RBAC role model (Anonymous, Merchant, Admin, Support), IP/stolen card blocklists, regional correlation rules, and a dynamic feedback loop that tunes fraud limits (0.8 × limit ± 0.2 × amount). The widget below provides a real-time visual demonstration of the core heuristic risk evaluation.",
        antifraudAmountLabel: "Transaction Amount",
        antifraudDeltaLabel: "Time Delta Since Previous",
        antifraudDistanceLabel: "Physical Distance Jump",
        antifraudRiskIndex: "Calibrated Risk Index",
        antifraudStatusApproved: "APPROVED",
        antifraudStatusFlagged: "FLAGGED / REVIEW",
        antifraudStatusRejected: "REJECTED",
        antifraudTravelVelocity: "Travel Velocity",
        antifraudVelocityPenalty: "Velocity Penalty (P_vel)",
        antifraudGeoPenalty: "Geo-Jump Penalty (P_geo)",
        antifraudAmountPenalty: "Amount Penalty (P_amount)",
        antifraudDampingRatio: "Damping Ratio Applied",
        antifraudDampingVal: "0.8 Heuristics + 0.2 Base",
        antifraudSupersonicAlert: "Supersonic Geo-Jump",
        antifraudImpossibleSpeedAlert: "High Speed Geo-Jump",
        antifraudNormalSpeed: "Normal Transit",
        antifraudRepoLink: "View Repository",

        // dotme CLI Project Card
        dotmeTitle: "dotme • Git-Based Dotfiles Manager CLI",
        dotmeSubtitle: "Autonomous Typewriter Loop • Pattern-Based Dotfile Distribution",
        dotmeSrSummary: "Demonstration of dotme CLI: an autonomous terminal session executing git clone, pattern-based filtering with include and exclude rules, and dotfile distribution with summary metrics.",

        // Open Source Section
        opensourceSectionIndex: "04. OPEN SOURCE",
        opensourceTitle: "Open Source & Community Ecosystem",
        opensourceSubtitle: "Verified contributions to global open-source libraries, developer productivity CLI tools, and automation frameworks.",
        mockkRole: "Contributor",
        mockkCategory: "Testing Library",
        mockkDesc: "Core unit testing and mocking library for Kotlin. Fixed state leak in verification mechanisms ensuring hermetic test isolation.",
        mockkLinkText: "View Repository",
        dotmeRole: "Creator & Maintainer",
        dotmeCategory: "CLI Tool",
        dotmeDesc: "Declarative dotfiles management CLI tool featuring atomic symlink reconciliation, pattern filtering, and syntax validation.",
        dotmeLinkText: "View Repository",
        n8nDocsRole: "Contributor",
        n8nDocsCategory: "Docs / Ecosystem",
        n8nDocsDesc: "Workflow automation documentation and technical integrations for the open-source n8n workflow platform.",
        n8nDocsLinkText: "View Repository",

        // Skills Section (4-Layer Architectural Taxonomy)
        skillsSectionIndex: "05. SKILLS",
        technicalSkills: "Architectural Competencies & Technical Skills",
        skillsSubtitle: "Categorized engineering competencies structured across 4 architectural layers of modern software systems.",
        
        // Layer 1
        layer1Badge: "LAYER 01",
        layer1Scope: "JVM Ecosystem",
        backendCore: "Backend Core & JVM Ecosystem",
        backendCoreDesc: "High-concurrency JVM runtimes, reactive streams, enterprise dependency injection, and polyglot framework design.",
        backendCoreLangs: "Languages & Runtimes",
        backendCoreFrameworks: "Frameworks & Dependency Injection",
        backendCoreExecution: "Execution Engineering",

        // Layer 2
        layer2Badge: "LAYER 02",
        layer2Scope: "Data & Scale",
        distributedSystems: "Distributed Systems, Data & Scale",
        distributedSystemsDesc: "Microservices architecture, distributed data persistence, asynchronous messaging, and high-volume batch processing.",
        distributedSystemsArch: "Architecture & Patterns",
        distributedSystemsDb: "Databases & Storage",
        distributedSystemsMsg: "Messaging & Processing",

        // Layer 3
        layer3Badge: "LAYER 03",
        layer3Scope: "Cloud & Infra",
        cloudDevOps: "Cloud, DevOps & Infrastructure Architecture",
        cloudDevOpsDesc: "Cloud infrastructure orchestration, low-overhead containerization, CI/CD automation, and secure transport protocols.",
        cloudDevOpsCloud: "Cloud Infrastructure (AWS)",
        cloudDevOpsProtocols: "Protocols & Pipelines",
        cloudDevOpsContainers: "Containers & CI/CD",

        // Layer 4
        layer4Badge: "LAYER 04",
        layer4Scope: "Modern SDLC",
        aiAugmented: "AI-Augmented Engineering & Modern SDLC",
        aiAugmentedDesc: "Agentic orchestration, retrieval context systems, generative developer tooling, and AI-assisted regression testing.",
        aiAugmentedContext: "AI Systems & Context",
        aiAugmentedAgentic: "Agentic Orchestration",
        aiAugmentedTooling: "Modern Development Tooling",

        // Legacy compatibility
        backendDev: "Backend Development",
        databases: "Databases",
        devOpsTools: "DevOps & Tools",
        frontend: "Frontend",
        integration: "Integration",
        softSkills: "Soft Skills",
        softSkills1: "Problem Solving",
        softSkills2: "Team Collaboration",
        softSkills3: "Agile Methodologies",
        softSkills4: "Time Management",
        softSkills5: "Continuous Learning",
        
        // Experience Section
        experienceSectionIndex: "02. EXPERIENCE",
        workExperience: "Career Narrative & Enterprise Impact",
        experienceSubtitle: "High-throughput JVM architectures, financial settlement pipelines, and large-scale distributed systems.",
        
        // Trustly Experience
        trustlyRole: "Software Engineer",
        trustlyCompany: "Trustly",
        trustlySector: "• Global Pay-by-Bank & Open Banking Leader",
        trustlyPeriod: "Jan 2026 – Present",
        trustlyDesc: "Architecting mission-critical B2B billing engines and mass financial reporting systems processing +$100B volume and +500 TPS with zero ledger discrepancy.",
        trustlyBullet1: "Architected and maintained high-criticality B2B merchant billing and financial settlement pipelines handling <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+500 TPS</strong> and multi-billion-dollar transaction volume with zero ledger discrepancy.",
        trustlyBullet2: "Designed mass reports and reconciliation pipelines using <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong> and <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Quartz Scheduler</strong>, extracting and consolidating millions of daily transaction records.",
        trustlyBullet3: "Engineered low-memory file streaming mechanisms for massive report payloads (PDF, ZIP, CSV), integrating <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS S3</strong>, <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS Lambda</strong>, and automated secure delivery via <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">SFTP</strong> to partner financial institutions.",
        trustlyBullet4: "Developed across resilient polyglot JVM frameworks (Spring Boot, Javalite, Google Guice) and optimized complex <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">PostgreSQL</strong> queries and table locking, significantly reducing analytical execution times.",

        // Alelo Consolidated Experience
        aleloRole: "Software Engineer Progression (Intern to Mid-Level)",
        aleloCompany: "Alelo Brasil",
        aleloSector: "• Corporate Benefits & Payments (Bradesco & Banco do Brasil)",
        aleloPeriod: "2021 – Jan 2026 (~5 Years)",
        aleloDesc: "Consolidated ~5-year engineering progression driving core payments, benefits card processing, and distributed architecture across 150k enterprise clients.",
        aleloBullet1: "Scaled core card transaction processing and benefits microservices in Java/Kotlin (Spring Boot), sustaining <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+500M req/mo</strong> serving <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">10M+ users</strong> across <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">150k</strong> enterprise clients under <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">99.99% availability</strong>.",
        aleloBullet2: "Architected decoupled asynchronous microservices utilizing <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">ActiveMQ</strong> and <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong> with <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Redis</strong> distributed caching, mitigating latency spikes during peak retail shopping hours.",
        aleloBullet3: "Engineered secure authentication and authorization flows (OAuth2, JWT, RBAC), ensuring transactional integrity and zero-trust identity verification across client endpoints.",
        aleloBullet4: "Conducted zero-downtime database schema refactoring and data migrations on high-volume relational and NoSQL databases (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Oracle</strong>, MongoDB) across tables with hundreds of millions of records.",
        aleloBullet5: "Led technical code reviews, fostered clean architecture standards, and mentored junior engineers, substantially increasing automated unit and integration test coverage.",

        // Legacy compatibility mappings
        developer: "Software Engineer",
        developerCompany: "Trustly • Jan 2026 - Present",
        developerDesc: "Architecting mission-critical B2B billing engines and mass financial reporting systems processing +$100B volume and +500 TPS with zero ledger discrepancy.",
        juniorDeveloper: "Software Engineer Progression (Intern to Mid-Level)",
        juniorCompany: "Alelo Brasil • 2021 - Jan 2026",
        juniorDesc: "Consolidated ~5-year engineering progression driving core payments, benefits card processing, and distributed architecture across 150k enterprise clients.",

        // Education Section
        educationSectionIndex: "06. EDUCATION",
        education: "Education",
        educationTitle: "Academic Credentials",
        educationSubtitle: "Formal higher education, concluded postgraduate specializations, and verified engineering degrees.",
        educationStatusConcluded: "Concluded",
        educationVerifyLink: "Verify Institutional Credential",
        educationVerifyDeclaration: "View Completion Statement (PDF)",
        educationVerifyDiploma: "Verify Official Diploma",

        // Masters / MBA
        masters: "MBA in Software Engineering",
        mastersSchool: "University of São Paulo (USP / Esalq)",
        mbaDegreeType: "Postgraduate Lato Sensu",
        mbaPeriod: "2024 – 2026",
        mastersDesc: "Advanced specialization focused on Distributed Systems Architecture, Microservices, Domain-Driven Design, Design Patterns, Requirements Engineering, Cloud Computing, and Scalable Resilient Systems at Latin America's top-ranked institution.",

        // Bachelors
        bachelors: "Bachelor of Science (B.S.) in Electrical Engineering",
        bachelorsSchool: "São Paulo State University (UNESP)",
        bachelorsDegreeType: "Bachelor's Degree (STEM)",
        bachelorsPeriod: "2016 – 2023",
        bachelorsDesc: "5-year rigorous engineering curriculum (STEM) with focus on control systems, automation, signal processing, applied programming, algorithms, and mathematical modeling.",
        certifications: "Professional Certifications",
        certification1: "Spring Professional Certification",
        certification2: "Java SE 11 Professional Developer",
        certification3: "AWS Certified Developer - Associate",
        certification4: "Docker Certified Associate",
        
        // Contact Section Form Keys
        name: "Name",
        email: "Email",
        message: "Message",
        sendMessage: "Send Message",
        yourLocation: "Your Location",
        
        // Footer
        copyright: "© 2026 Vinicius Rodrigues Silva. All rights reserved.",
        
        // Language Switcher
        switchToEnglish: "EN",
        switchToPortuguese: "PT",
        switchToEnglishAria: "Switch language to English",
        switchToPortugueseAria: "Switch language to Portuguese",
        
        // Form Response
        formResponse: "Thank you, {0}! Your message has been received. I'll get back to you at {1} soon."
    },
    pt: {
        // Navigation
        about: "Sobre",
        skills: "Habilidades",
        experience: "Experiência",
        projects: "Projetos",
        opensource: "Open Source",
        education: "Formação",
        contact: "Contato",
        
        // Hero Section
        availabilityBeacon: "Disponível para oportunidades remotas",
        heroRole: "Engenheiro de Software • Backend",
        heroDesc: "Engenheiro de Software especializado em arquiteturas JVM, sistemas distribuídos e backends financeiros.",
        role: "Engenheiro de Software • Backend",
        specialization: "Engenheiro de Software especializado em arquiteturas JVM, sistemas distribuídos e backends financeiros.",
        getInTouch: "Iniciar Contato Direto",
        viewProjects: "Ver Projetos",
        downloadCv: "Baixar CV ATS (PDF)",
        downloadCvShort: "CV ATS (PDF)",
        contactEmail: "Contato por E-mail",
        sendDirectEmail: "Enviar E-mail Direto",
        copyEmail: "Copiar E-mail",
        emailCopied: "E-mail copiado para a área de transferência",
        contactSectionIndex: "07. CONTATO",
        resumeLabel: "Currículo",
        contactConnect: "Conectar",
        contactInspect: "Inspecionar Código",

        // Metric Stat Cards
        metric1Num: "+500M",
        metric1Label: "Vazão em Escala B2C",
        metric1Sub: "Escala de microsserviços para 10M+ usuários",
        metric2Num: "+$100B",
        metric2Label: "Volume Financeiro B2B",
        metric2Sub: "Volume global processado e reconciliação",
        metric3Num: "+500 TPS",
        metric3Label: "Taxa de Pico de Processamento",
        metric3Sub: "Processamento transacional e streaming de alta escala",

        // Contact Pre-filled Email Strings
        contactEmailSubject: "Oportunidade Engenharia de Software - Vinicius R. Silva",
        contactEmailBody: "Olá Vinicius,\n\nAnalisei seu portfólio e gostaria de conversar sobre uma oportunidade de Engenheiro de Software na...",
        contactText: "Contato direto para oportunidades de engenharia de software, desenvolvimento backend e sistemas de alta vazão.",
        
        // About Section
        aboutMe: "Sobre Mim",
        aboutText1: "Sou um desenvolvedor de software com expertise em Java, Kotlin, Spring e Arquitetura de Microsserviços. Com uma forte base em princípios de engenharia de software, eu me especializo em construir aplicações robustas e escaláveis que resolvem problemas do mundo real.",
        aboutText2: "Minha experiência se estende pelo desenvolvimento de APIs REST, implementação de sistemas de autenticação, criação de arquiteturas de microsserviços e trabalho com diversos bancos de dados. Sou guiado por práticas de código limpo e busco continuamente melhorar minhas habilidades e me manter atualizado com as mais recentes tecnologias.",
        aboutText3: "Quando não estou codificando, gosto de explorar novas tecnologias, contribuir para projetos open-source e compartilhar conhecimento com a comunidade de desenvolvedores.",
        
        // Projects Section (03. PROJETOS)
        projectsSectionIndex: "03. PROJETOS",
        featuredProjects: "Demonstrações Interativas de Engenharia",
        projectsSubtitle: "Demonstrações interativas e ferramentas para desenvolvedores evidenciando arquitetura de sistemas backend, heurísticas de risco em tempo real e automação CLI.",
        viewAllProjects: "Ver Todos os Repositórios no GitHub",
        viewOnGitHub: "Ver no GitHub",

        // Antifraud Sandbox Widget
        antifraudTitle: "Motor de Segurança Financeira Antifraude • Sandbox em Tempo Real",
        antifraudSubtitle: "API REST em Spring Boot • Sandbox visual em tempo real de heurísticas de risco transacional e feedback adaptativo",
        antifraudArchitectureNote: "<strong class=\"text-[#0F172A] dark:text-[#F9FAFB]\">Contexto Arquitetural:</strong> O projeto original é uma API REST corporativa em Spring Boot com RBAC em 4 níveis (Anonymous, Merchant, Admin, Support), listas de bloqueio de IP/cartões roubados, correlação regional e loop de feedback adaptativo dinâmico (0.8 × limite ± 0.2 × valor). O widget abaixo é uma simulação visual em tempo real das heurísticas de avaliação de risco.",
        antifraudAmountLabel: "Valor da Transação",
        antifraudDeltaLabel: "Intervalo de Tempo da Anterior",
        antifraudDistanceLabel: "Salto de Distância Física",
        antifraudRiskIndex: "Índice de Risco Calibrado",
        antifraudStatusApproved: "APROVADO",
        antifraudStatusFlagged: "SINALIZADO",
        antifraudStatusRejected: "REJEITADO",
        antifraudTravelVelocity: "Velocidade de Deslocamento",
        antifraudVelocityPenalty: "Penalidade de Velocidade (P_vel)",
        antifraudGeoPenalty: "Penalidade Salto Geográfico (P_geo)",
        antifraudAmountPenalty: "Penalidade de Valor (P_amount)",
        antifraudDampingRatio: "Taxa de Amortecimento Aplicada",
        antifraudDampingVal: "0.8 Heurísticas + 0.2 Base",
        antifraudSupersonicAlert: "Salto Geográfico Supersônico",
        antifraudImpossibleSpeedAlert: "Salto em Alta Velocidade",
        antifraudNormalSpeed: "Trânsito Normal",
        antifraudRepoLink: "Ver Repositório",

        // dotme CLI Project Card
        dotmeTitle: "dotme • Gerenciador de Dotfiles Baseado em Git via CLI",
        dotmeSubtitle: "Loop de Digitação Autônomo • Distribuição de Dotfiles por Padrões",
        dotmeSrSummary: "Demonstração do dotme CLI: uma sessão autônoma de terminal executando git clone, filtragem por padrões com regras de inclusão e exclusão, e distribuição de dotfiles com métricas de resumo.",

        // Open Source Section
        opensourceSectionIndex: "04. CÓDIGO ABERTO",
        opensourceTitle: "Ecossistema Open Source & Comunidade",
        opensourceSubtitle: "Contribuições verificadas para bibliotecas open-source globais, ferramentas CLI de produtividade e frameworks de automação.",
        mockkRole: "Contribuidor",
        mockkCategory: "Biblioteca de Testes",
        mockkDesc: "Biblioteca principal de testes unitários e mocking para Kotlin. Correção de vazamento de estado em verificações para isolamento hermético de testes.",
        mockkLinkText: "Ver Repositório",
        dotmeRole: "Criador & Mantenedor",
        dotmeCategory: "Ferramenta CLI",
        dotmeDesc: "Ferramenta CLI declarativa para gestão de dotfiles com reconciliação atômica de symlinks, filtros de padrões e validação de sintaxe.",
        dotmeLinkText: "Ver Repositório",
        n8nDocsRole: "Contribuidor",
        n8nDocsCategory: "Documentação / Ecossistema",
        n8nDocsDesc: "Documentação de automação de fluxos de trabalho e integrações técnicas para a plataforma open-source n8n.",
        n8nDocsLinkText: "Ver Repositório",

        // Skills Section (4-Layer Architectural Taxonomy)
        skillsSectionIndex: "05. HABILIDADES",
        technicalSkills: "Competências Arquiteturais & Habilidades Técnicas",
        skillsSubtitle: "Competências de engenharia estruturadas em 4 camadas arquiteturais de sistemas modernos de software.",
        
        // Layer 1
        layer1Badge: "CAMADA 01",
        layer1Scope: "Ecossistema JVM",
        backendCore: "Backend Core & Ecossistema JVM",
        backendCoreDesc: "Runtimes JVM de alta concorrência, fluxos reativos, injeção de dependência corporativa e arquitetura poliglota.",
        backendCoreLangs: "Linguagens & Runtimes",
        backendCoreFrameworks: "Frameworks & Injeção de Dependências",
        backendCoreExecution: "Engenharia de Execução",

        // Layer 2
        layer2Badge: "CAMADA 02",
        layer2Scope: "Dados & Escala",
        distributedSystems: "Sistemas Distribuídos, Dados & Escala",
        distributedSystemsDesc: "Arquitetura de microsserviços, persistência distribuída de dados, mensageria assíncrona e processamento em lote de alto volume.",
        distributedSystemsArch: "Arquitetura & Padrões",
        distributedSystemsDb: "Bancos de Dados & Armazenamento",
        distributedSystemsMsg: "Mensageria & Processamento",

        // Layer 3
        layer3Badge: "CAMADA 03",
        layer3Scope: "Cloud & Infra",
        cloudDevOps: "Arquitetura de Cloud, DevOps & Infraestrutura",
        cloudDevOpsDesc: "Orquestração de infraestrutura em nuvem, conteinerização de baixo overhead, automação CI/CD e protocolos de transporte seguro.",
        cloudDevOpsCloud: "Infraestrutura Cloud (AWS)",
        cloudDevOpsProtocols: "Protocolos & Pipelines",
        cloudDevOpsContainers: "Contêineres & CI/CD",

        // Layer 4
        layer4Badge: "CAMADA 04",
        layer4Scope: "SDLC Moderno",
        aiAugmented: "Engenharia Aumentada por IA & SDLC Moderno",
        aiAugmentedDesc: "Orquestração de agentes autônomos, sistemas de contexto de recuperação (RAG/MCP), ferramentas de desenvolvimento generativas e testes de regressão assistidos por IA.",
        aiAugmentedContext: "Sistemas de IA & Contexto",
        aiAugmentedAgentic: "Orquestração de Agentes",
        aiAugmentedTooling: "Ferramentas Modernas de Desenvolvimento",

        // Legacy compatibility
        backendDev: "Desenvolvimento Backend",
        databases: "Bancos de Dados",
        devOpsTools: "DevOps & Ferramentas",
        frontend: "Frontend",
        integration: "Integração",
        softSkills: "Soft Skills",
        softSkills1: "Resolução de Problemas",
        softSkills2: "Colaboração em Equipe",
        softSkills3: "Metodologias Ágeis",
        softSkills4: "Gestão de Tempo",
        softSkills5: "Aprendizado Contínuo",
        
        // Experience Section
        experienceSectionIndex: "02. EXPERIÊNCIA",
        workExperience: "Trajetória Profissional & Escala Corporativa",
        experienceSubtitle: "Arquiteturas JVM de alta vazão, liquidação financeira e sistemas distribuídos em larga escala.",
        
        // Trustly Experience
        trustlyRole: "Engenheiro de Software",
        trustlyCompany: "Trustly",
        trustlySector: "• Líder Global em Pay-by-Bank & Open Banking",
        trustlyPeriod: "Jan 2026 – Presente",
        trustlyDesc: "Desenvolvimento de sistemas de billing B2B de missão crítica e relatórios financeiros em larga escala, processando mais de $100B em volume transacional e +500 TPS com rigorosa consistência contábil.",
        trustlyBullet1: "Engenharia e sustentação de pipelines de faturamento B2B e liquidação financeira de merchants lidando com <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+500 TPS</strong> e volumes bilionários com tolerância zero a divergências contábeis.",
        trustlyBullet2: "Arquitetura de pipelines assíncronos e batch em larga escala com <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong> e <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Quartz Scheduler</strong> para extração, consolidação e reconciliação contábil de milhões de eventos transacionais diários.",
        trustlyBullet3: "Implementação de streaming de arquivos com baixo consumo de memória para relatórios pesados (PDF, ZIP, CSV), integrando <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS S3</strong>, <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS Lambda</strong> e despacho seguro automatizado via <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">SFTP</strong> para bancos parceiros.",
        trustlyBullet4: "Desenvolvimento em arquiteturas resilientes com JVM poliglota (Spring Boot, Javalite, Google Guice) e refatoração com tuning de consultas complexas em <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">PostgreSQL</strong>, reduzindo contenção de locks e tempos analíticos.",

        // Alelo Consolidated Experience
        aleloRole: "Trajetória em Engenharia de Software (Estágio a Pleno)",
        aleloCompany: "Alelo Brasil",
        aleloSector: "• Benefícios Corporativos & Pagamentos (Bradesco & Banco do Brasil)",
        aleloPeriod: "2021 – Jan 2026 (~5 Anos)",
        aleloDesc: "~5 anos de trajetória consolidada sustentando microsserviços de alta escala, processamento transacional de cartões e contas digitais.",
        aleloBullet1: "Evolução da malha de microsserviços em Java/Kotlin (Spring Boot), sustentando <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+500M req/mês</strong> para <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">10M+ usuários</strong> ativos em <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">150k</strong> empresas com <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">99.99% de disponibilidade</strong>.",
        aleloBullet2: "Concepção de microsserviços desacoplados com mensageria assíncrona (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">ActiveMQ</strong>) e processamento em lote com <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong>, além de cache distribuído (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Redis</strong>), eliminando gargalos de throughput nos horários de pico comercial.",
        aleloBullet3: "Implementação de fluxos de autenticação e autorização robustos (OAuth2, JWT, RBAC), garantindo estrita integridade transacional contra fraudes de identidade.",
        aleloBullet4: "Refatoração e migração de esquemas sem indisponibilidade em bancos relacionais e não-relacionais (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Oracle</strong>, MongoDB) em tabelas com centenas de milhões de registros.",
        aleloBullet5: "Liderança técnica em code reviews, disseminação de Clean Architecture e mentoria de desenvolvedores juniores, elevando expressivamente a cobertura de testes automatizados.",

        // Legacy compatibility mappings
        developer: "Engenheiro de Software",
        developerCompany: "Trustly • Jan 2026 - Presente",
        developerDesc: "Desenvolvimento de sistemas de billing B2B de missão crítica e relatórios financeiros em larga escala, processando mais de $100B em volume transacional e +500 TPS com rigorosa consistência contábil.",
        juniorDeveloper: "Trajetória em Engenharia de Software (Estágio a Pleno)",
        juniorCompany: "Alelo Brasil • 2021 - Jan 2026",
        juniorDesc: "~5 anos de trajetória consolidada sustentando microsserviços de alta escala, processamento transacional de cartões e contas digitais.",

        // Education Section
        educationSectionIndex: "06. FORMAÇÃO",
        education: "Formação",
        educationTitle: "Formação Acadêmica",
        educationSubtitle: "Formação acadêmica formal, pós-graduação concluída e diplomas verificados de engenharia.",
        educationStatusConcluded: "Concluído",
        educationVerifyLink: "Verificar Credencial Institucional",
        educationVerifyDeclaration: "Visualizar Declaração de Conclusão (PDF)",
        educationVerifyDiploma: "Verificar Diploma Oficial",

        // Masters / MBA
        masters: "MBA em Engenharia de Software",
        mastersSchool: "Universidade de São Paulo (USP / Esalq)",
        mbaDegreeType: "Pós-Graduação Lato Sensu",
        mbaPeriod: "2024 – 2026",
        mastersDesc: "Especialização avançada focada em Arquitetura de Sistemas Distribuídos, Microsserviços, Domain-Driven Design, Design Patterns, Engenharia de Requisitos, Nuvem e Sistemas Escaláveis de Alta Resiliência pela instituição nº 1 da América Latina.",

        // Bachelors
        bachelors: "Bacharelado em Engenharia Elétrica",
        bachelorsSchool: "Universidade Estadual Paulista (UNESP)",
        bachelorsDegreeType: "Graduação / Bacharelado (STEM)",
        bachelorsPeriod: "2016 – 2023",
        bachelorsDesc: "Formação sólida de 5 anos em engenharia com foco em sistemas de controle, automação, processamento de sinais, programação aplicada, algoritmos e modelagem matemática.",
        certifications: "Certificações Profissionais",
        certification1: "Certificação Spring Professional",
        certification2: "Java SE 11 Professional Developer",
        certification3: "AWS Certified Developer - Associate",
        certification4: "Docker Certified Associate",
        
        // Contact Section Form Keys
        name: "Nome",
        email: "Email",
        message: "Mensagem",
        sendMessage: "Enviar Mensagem",
        yourLocation: "Sua Localização",
        
        // Footer
        copyright: "© 2026 Vinicius Rodrigues Silva. Todos os direitos reservados.",
        
        // Language Switcher
        switchToEnglish: "EN",
        switchToPortuguese: "PT",
        switchToEnglishAria: "Mudar idioma para inglês",
        switchToPortugueseAria: "Mudar idioma para português",
        
        // Form Response
        formResponse: "Obrigado, {0}! Sua mensagem foi recebida. Entrarei em contato com você em {1} em breve."
    }
};

export default translations;