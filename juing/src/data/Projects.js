export const projects = [
  {
    id: 1,
    title: "MESHOPS",
    description:
      "AI-driven cloud deployment platform engineered to deploy containerized machine learning models and APIs with built-in validation, automated testing, and comprehensive observability. Architected to scale production workloads with intelligent monitoring and failure detection systems.",
    fullDescription:
      "MESHOPS is a sophisticated cloud deployment platform that automates the entire lifecycle of deploying machine learning models and microservices. It combines AI-powered testing, infrastructure orchestration, and observability into a single unified platform. The system handles containerization, health monitoring, auto-scaling, and provides real-time insights into deployed services.",
    highlights: [
      "Implemented LLM-based unit and behavioral test generation to validate deployed services autonomously",
      "Built Spring Boot orchestration layer with Docker isolation, real-time log streaming, and health monitoring",
      "Deployed on AWS infrastructure with autoscaling, load balancing, and integrated CloudWatch metrics",
    ],
    stack: "AWS · Java · Spring Boot · Python · Docker · React · OpenTelemetry",
    link: "https://github.com/praneswar-g/automesh",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    status: "Production",
  },

  {
    id: 2,
    title: "AI FITNESS",
    description:
      "AI-powered fitness planning application leveraging Google Gemini API to generate hyper-personalized workout routines. Built with microservices architecture for scalability and decoupled service communication through message queuing.",
    fullDescription:
      "AI Fitness is an intelligent fitness companion that uses advanced AI to create personalized workout plans tailored to individual goals, fitness levels, and preferences. The application intelligently adapts workouts based on user feedback and progress, providing real-time guidance and motivation.",
    highlights: [
      "Integrated Gemini API with custom prompt engineering to support 30+ distinct user personas and fitness goals",
      "Implemented RabbitMQ for asynchronous task processing and improved system reliability under high load",
      "Containerized all services using Docker and Docker Compose for seamless local and cloud deployment",
    ],
    stack: "Spring Boot · Python · Gemini API · RabbitMQ · Docker · PostgreSQL",
    link: "https://github.com/praneswar-g/ai-fitness-app",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80",
    status: "Active",
  },

  {
    id: 3,
    title: "ENTERPRISE DASHBOARDS",
    description:
      "Production-grade internal dashboards developed during Accenture internship for skill assessment tracking, system health monitoring, and evaluation workflows. Built with full-stack best practices including RESTful API design, responsive UI, and comprehensive documentation.",
    fullDescription:
      "Enterprise-grade dashboards designed for internal operations at a Fortune 500 company. These systems monitor KPIs, track team performance, manage evaluation workflows, and provide real-time insights into system health. Integrated with enterprise tools like Splunk for log analysis and ServiceNow for incident management.",
    highlights: [
      "Designed and developed RESTful APIs with Spring Boot for CRUD operations and complex business logic",
      "Built responsive React frontend with Material-UI for intuitive user experience and accessibility",
      "Documented monitoring workflows, incident response procedures, and integration with Splunk and ServiceNow",
    ],
    stack: "Spring Boot · React · MySQL · Splunk · ServiceNow · REST APIs",
    link: "#",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    status: "Completed",
  },

  {
    id: 4,
    title: "UI/UX CONTRIBUTIONS",
    description:
      "Open-source frontend and UI/UX modernization contributions to developer platforms and tools. Focused on enhancing user experience through thoughtful design systems, performance optimization, and accessibility improvements.",
    fullDescription:
      "A series of strategic UI/UX improvements contributed to multiple open-source projects. These contributions focused on modernizing interfaces, improving performance through animation optimization, and enhancing accessibility for all users. The work involved collaboration with maintainers through pull requests and detailed code reviews.",
    highlights: [
      "Redesigned error handling pages and 404 pages with modern design principles and micro-interactions",
      "Optimized CSS animations and transitions to reduce rendering overhead by 40%",
      "Collaborated through GitHub PRs with detailed documentation and responsive code review feedback",
    ],
    stack: "React · CSS3 · Figma · UI/UX · Open Source Collaboration",
    link: "https://github.com/praneswar-g",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
    status: "Open Source",
  },
];