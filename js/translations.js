const translations = {
    en: {
        // Navigation
        about: "About",
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
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
        resumeLabel: "Resume",
        contactConnect: "Connect",
        contactInspect: "Inspect Code",

        // Metric Stat Cards
        metric1Num: "+500M",
        metric1Label: "B2C Scale Throughput",
        metric1Sub: "Monthly requests at <strong class=\"text-[#0F172A] dark:text-[#F9FAFB] font-semibold\">Alelo</strong> scale across 10M+ users",
        metric2Num: "+$100B",
        metric2Label: "B2B Financial Volume",
        metric2Sub: "Annual settlement volume processed at <strong class=\"text-[#0F172A] dark:text-[#F9FAFB] font-semibold\">Trustly</strong>",
        metric3Num: "99.99%",
        metric3Label: "Production Availability",
        metric3Sub: "Sustained during month-end payday traffic spikes at <strong class=\"text-[#0F172A] dark:text-[#F9FAFB] font-semibold\">Alelo</strong>",

        // Contact Pre-filled Email Strings
        contactEmailSubject: "Software Engineering Opportunity - Vinicius Rodrigues Silva",
        contactEmailBody: "Hi Vinicius,\n\nI reviewed your portfolio and would like to discuss a Software Engineer role at...",
        contactText: "Direct outreach for software engineering opportunities, backend development, and high-throughput systems.",
        
        // About Section
        aboutMe: "About Me",
        aboutText1: "I am a passionate software developer with expertise in Java, Kotlin, Spring and Microservices Architecture. With a strong foundation in software engineering principles, I specialize in building robust, scalable applications that solve real-world problems.",
        aboutText2: "My experience spans across developing REST APIs, implementing authentication systems, creating microservices architectures, and working with various databases. I am driven by clean code practices and continuously strive to improve my skills and stay updated with the latest technologies.",
        aboutText3: "When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.",
        
        // Experience Section (01. EXPERIENCE)
        experienceSectionIndex: "01. EXPERIENCE",
        workExperience: "Career Narrative & Enterprise Impact",
        experienceSubtitle: "High-throughput JVM architectures, financial settlement pipelines, and large-scale distributed systems.",
        
        // Trustly Experience
        trustlyRole: "Software Engineer",
        trustlyCompany: "Trustly",
        trustlySector: "• Global Pay-by-Bank & Open Banking Leader",
        trustlyPeriod: "Jan 2026 – Present",
        trustlyDesc: "Engineering mission-critical B2B billing engines and mass financial reporting systems, processing high-volume transaction records and automated settlement pipelines.",
        trustlyBullet1: "Engineered and maintained B2B merchant billing and financial settlement pipelines processing multi-billion-dollar transaction volume (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+$100B</strong>), ensuring financial data integrity through automated reconciliation and robust batch execution.",
        trustlyBullet2: "Designed mass reports and reconciliation pipelines using <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong> and <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Quartz Scheduler</strong>, extracting and consolidating millions of daily transaction records.",
        trustlyBullet3: "Engineered low-memory file streaming mechanisms for massive report payloads (PDF, ZIP, CSV), integrating <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS S3</strong>, <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS Lambda</strong>, and automated secure delivery via <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">SFTP</strong> to partner financial institutions.",

        // Alelo Consolidated Experience
        aleloRole: "Software Engineer Progression (Intern to Mid-Level)",
        aleloCompany: "Alelo Brasil",
        aleloSector: "• Corporate Benefits & Payments (Bradesco & Banco do Brasil)",
        aleloPeriod: "May 2021 – Jan 2026 (4 yrs 9 mos)",
        aleloDesc: "4+ year engineering progression driving core payments, benefits card processing, and distributed architecture across 150k enterprise clients.",
        aleloBullet1: "Scaled core card transaction processing and benefits microservices in Java/Kotlin (Spring Boot), implementing circuit breakers, distributed caching (Redis), and connection pooling to sustain <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">99.99% availability</strong> during month-end payday traffic spikes (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+500M req/mo</strong> across 10M+ users).",
        aleloBullet2: "Architected decoupled asynchronous microservices utilizing <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">ActiveMQ</strong> and <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong>, refactoring high-latency synchronous calls to eliminate throughput bottlenecks during peak retail shopping hours.",
        aleloBullet3: "Engineered secure authentication and authorization flows (OAuth2, JWT, RBAC), ensuring transactional integrity and zero-trust identity verification across client endpoints.",
        aleloBullet4: "Conducted zero-downtime database schema refactoring and data migrations on high-volume relational and NoSQL databases (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Oracle</strong>, MongoDB) across tables with hundreds of millions of records.",
        aleloBullet5: "Led technical code reviews, fostered clean architecture standards, and mentored junior engineers, substantially increasing automated unit and integration test coverage.",

        // Legacy experience compatibility mappings
        developer: "Software Engineer",
        developerCompany: "Trustly • Jan 2026 - Present",
        developerDesc: "Architecting mission-critical B2B billing engines and mass financial reporting systems processing +$100B volume, ensuring financial data integrity through automated reconciliation.",
        juniorDeveloper: "Software Engineer Progression (Intern to Mid-Level)",
        juniorCompany: "Alelo Brasil • 2021 - Jan 2026",
        juniorDesc: "Consolidated ~5-year engineering progression driving core payments, benefits card processing, and distributed architecture across 150k enterprise clients.",

        // Projects Section (02. PROJECTS)
        projectsSectionIndex: "02. PROJECTS",
        featuredProjects: "Featured Projects",
        projectsSubtitle: "Production systems, developer tooling, and open-source contributions demonstrating backend architecture and distributed engineering.",
        viewAllProjects: "View All Repositories on GitHub",
        viewOnGitHub: "View on GitHub",

        // Card 1: Antifraud System
        antifraudRole: "Production System",
        antifraudCategory: "Backend Security",
        antifraudTitle: "Antifraud System",
        antifraudDesc: "Production-grade Spring Boot REST API featuring a 4-tier RBAC role model, IP/card blocklists, and dynamic feedback loops that automatically tune fraud limits.",
        antifraudRepoLink: "View Repository",

        // Card 2: MockK
        mockkRole: "Contributor",
        mockkCategory: "Testing Library",
        mockkTitle: "MockK",
        mockkDesc: "Core unit testing and mocking library for Kotlin. Fixed state leak in verification mechanisms ensuring hermetic test isolation.",
        mockkLinkText: "View Repository",
        mockkReleaseText: "v1.14.0 Release Notes",

        // Card 3: dotme
        dotmeRole: "Creator & Maintainer",
        dotmeCategory: "Developer CLI",
        dotmeTitle: "dotme",
        dotmeDesc: "Declarative dotfiles management CLI tool featuring atomic symlink reconciliation, pattern filtering, and syntax validation.",
        dotmeLinkText: "View Repository",

        // Skills Section (03. SKILLS)
        skillsSectionIndex: "03. SKILLS",
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
        cloudDevOpsObservability: "Observability & Monitoring",

        // Layer 4
        layer4Badge: "LAYER 04",
        layer4Scope: "Modern SDLC",
        aiAugmented: "AI-Augmented Engineering & Modern SDLC",
        aiAugmentedDesc: "Agentic orchestration, retrieval context systems, generative developer tooling, and AI-assisted regression testing.",
        aiAugmentedContext: "AI Systems & Context",
        aiAugmentedAgentic: "Agentic Orchestration",
        aiAugmentedTooling: "Modern Development Tooling",

        // Legacy skills compatibility
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

        // Education Section (04. EDUCATION)
        educationSectionIndex: "04. EDUCATION",
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
        
        // Contact Section (05. CONTACT)
        contactSectionIndex: "05. CONTACT",
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
        resumeLabel: "Currículo",
        contactConnect: "Conectar",
        contactInspect: "Inspecionar Código",

        // Metric Stat Cards
        metric1Num: "+500M",
        metric1Label: "Vazão em Escala B2C",
        metric1Sub: "Requisições mensais na escala <strong class=\"text-[#0F172A] dark:text-[#F9FAFB] font-semibold\">Alelo</strong> para 10M+ usuários",
        metric2Num: "+$100B",
        metric2Label: "Volume Financeiro B2B",
        metric2Sub: "Volume anual de liquidação processado na <strong class=\"text-[#0F172A] dark:text-[#F9FAFB] font-semibold\">Trustly</strong>",
        metric3Num: "99.99%",
        metric3Label: "Disponibilidade em Produção",
        metric3Sub: "Sustentada durante picos de fechamento de folha na <strong class=\"text-[#0F172A] dark:text-[#F9FAFB] font-semibold\">Alelo</strong>",

        // Contact Pre-filled Email Strings
        contactEmailSubject: "Oportunidade Engenharia de Software - Vinicius Rodrigues Silva",
        contactEmailBody: "Olá Vinicius,\n\nAnalisei seu portfólio e gostaria de conversar sobre uma oportunidade de Engenheiro de Software na...",
        contactText: "Contato direto para oportunidades de engenharia de software, desenvolvimento backend e sistemas de alta vazão.",
        
        // About Section
        aboutMe: "Sobre Mim",
        aboutText1: "Sou um desenvolvedor de software com expertise em Java, Kotlin, Spring e Arquitetura de Microsserviços. Com uma forte base em princípios de engenharia de software, eu me especializo em construir aplicações robustas e escaláveis que resolvem problemas do mundo real.",
        aboutText2: "Minha experiência se estende pelo desenvolvimento de APIs REST, implementação de sistemas de autenticação, criação de arquiteturas de microsserviços e trabalho com diversos bancos de dados. Sou guiado por práticas de código limpo e busco continuamente melhorar minhas habilidades e me manter atualizado com as mais recentes tecnologias.",
        aboutText3: "Quando não estou codificando, gosto de explorar novas tecnologias, contribuir para projetos open-source e compartilhar conhecimento com a comunidade de desenvolvedores.",
        
        // Experience Section (01. EXPERIÊNCIA)
        experienceSectionIndex: "01. EXPERIÊNCIA",
        workExperience: "Trajetória Profissional & Escala Corporativa",
        experienceSubtitle: "Arquiteturas JVM de alta vazão, liquidação financeira e sistemas distribuídos em larga escala.",
        
        // Trustly Experience
        trustlyRole: "Engenheiro de Software",
        trustlyCompany: "Trustly",
        trustlySector: "• Líder Global em Pay-by-Bank & Open Banking",
        trustlyPeriod: "Jan 2026 – Presente",
        trustlyDesc: "Desenvolvimento de sistemas de faturamento B2B de missão crítica e relatórios financeiros em larga escala, processando volumes multibilionários e pipelines automatizados de liquidação.",
        trustlyBullet1: "Engenharia e sustentação de pipelines de faturamento B2B e liquidação financeira processando volume multibilionário (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+$100B</strong>), garantindo a integridade dos dados contábeis por meio de conciliação automatizada e processamento batch resiliente.",
        trustlyBullet2: "Arquitetura de pipelines batch em larga escala com <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong> e <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Quartz Scheduler</strong> para extração, consolidação e conciliação contábil de milhões de registros transacionais diários.",
        trustlyBullet3: "Implementação de streaming de arquivos com baixo consumo de memória para relatórios pesados (PDF, ZIP, CSV), integrando <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS S3</strong>, <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">AWS Lambda</strong> e despacho seguro automatizado via <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">SFTP</strong> para bancos parceiros.",

        // Alelo Consolidated Experience
        aleloRole: "Trajetória em Engenharia de Software (Estágio a Pleno)",
        aleloCompany: "Alelo Brasil",
        aleloSector: "• Benefícios Corporativos & Pagamentos (Bradesco & Banco do Brasil)",
        aleloPeriod: "Mai 2021 – Jan 2026 (4 anos 9 meses)",
        aleloDesc: "Mais de 4 anos de trajetória consolidada sustentando microsserviços de alta escala, processamento transacional de cartões e contas corporativas.",
        aleloBullet1: "Evolução da malha de microsserviços em Java/Kotlin (Spring Boot), implementando circuit breakers, cache distribuído (Redis) e pooling de conexões para sustentar <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">99.99% de disponibilidade</strong> sob picos de tráfego de fechamento de folha (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">+500M req/mês</strong> para 10M+ usuários).",
        aleloBullet2: "Concepção de microsserviços desacoplados com mensageria assíncrona (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">ActiveMQ</strong>) e processamento em lote com <strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Spring Batch</strong>, refatorando chamadas síncronas para eliminar gargalos de throughput nos horários de pico comercial.",
        aleloBullet3: "Implementação de fluxos de autenticação e autorização robustos (OAuth2, JWT, RBAC), garantindo estrita integridade transacional contra fraudes de identidade.",
        aleloBullet4: "Refatoração e migração de esquemas sem indisponibilidade em bancos relacionais e não-relacionais (<strong class=\"font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]\">Oracle</strong>, MongoDB) em tabelas com centenas de milhões de registros.",
        aleloBullet5: "Liderança técnica em code reviews, disseminação de Clean Architecture e mentoria de desenvolvedores juniores, elevando expressivamente a cobertura de testes automatizados.",

        // Legacy experience compatibility mappings
        developer: "Engenheiro de Software",
        developerCompany: "Trustly • Jan 2026 - Presente",
        developerDesc: "Desenvolvimento de sistemas de faturamento B2B de missão crítica e relatórios financeiros processando volumes de +$100B, garantindo a integridade dos dados contábeis por meio de conciliação automatizada.",
        juniorDeveloper: "Trajetória em Engenharia de Software (Estágio a Pleno)",
        juniorCompany: "Alelo Brasil • 2021 - Jan 2026",
        juniorDesc: "~5 anos de trajetória consolidada sustentando microsserviços de alta escala, processamento transacional de cartões e contas digitais.",

        // Projects Section (02. PROJETOS)
        projectsSectionIndex: "02. PROJETOS",
        featuredProjects: "Projetos em Destaque",
        projectsSubtitle: "Sistemas em produção, ferramentas para desenvolvedores e contribuições open-source evidenciando arquitetura backend e engenharia distribuída.",
        viewAllProjects: "Ver Todos os Repositórios no GitHub",
        viewOnGitHub: "Ver no GitHub",

        // Card 1: Antifraud System
        antifraudRole: "Em Produção",
        antifraudCategory: "Segurança Backend",
        antifraudTitle: "Sistema Antifraude",
        antifraudDesc: "API REST em Spring Boot com modelo de RBAC em 4 níveis, listas de bloqueio de IP/cartões e loops de feedback dinâmico para calibração de limites de fraude.",
        antifraudRepoLink: "Ver Repositório",

        // Card 2: MockK
        mockkRole: "Contribuidor",
        mockkCategory: "Biblioteca de Testes",
        mockkTitle: "MockK",
        mockkDesc: "Biblioteca principal de testes unitários e mocking para Kotlin. Correção de vazamento de estado em verificações para isolamento hermético de testes.",
        mockkLinkText: "Ver Repositório",
        mockkReleaseText: "Notas de Release v1.14.0",

        // Card 3: dotme
        dotmeRole: "Criador & Mantenedor",
        dotmeCategory: "Ferramenta CLI",
        dotmeTitle: "dotme",
        dotmeDesc: "Ferramenta CLI declarativa para gestão de dotfiles com reconciliação atômica de symlinks, filtros de padrões e validação de sintaxe.",
        dotmeLinkText: "Ver Repositório",

        // Skills Section (03. HABILIDADES)
        skillsSectionIndex: "03. HABILIDADES",
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
        cloudDevOpsObservability: "Observabilidade & Monitoramento",

        // Layer 4
        layer4Badge: "CAMADA 04",
        layer4Scope: "SDLC Moderno",
        aiAugmented: "Engenharia Aumentada por IA & SDLC Moderno",
        aiAugmentedDesc: "Orquestração de agentes autônomos, sistemas de contexto de recuperação (RAG/MCP), ferramentas de desenvolvimento generativas e testes de regressão assistidos por IA.",
        aiAugmentedContext: "Sistemas de IA & Contexto",
        aiAugmentedAgentic: "Orquestração de Agentes",
        aiAugmentedTooling: "Ferramentas Modernas de Desenvolvimento",

        // Legacy skills compatibility
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

        // Education Section (04. FORMAÇÃO)
        educationSectionIndex: "04. FORMAÇÃO",
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
        
        // Contact Section (05. CONTATO)
        contactSectionIndex: "05. CONTATO",
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