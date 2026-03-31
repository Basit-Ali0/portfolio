// ══════════════════════════════════════
// PROJECT MODALS LOGIC
// ══════════════════════════════════════

const projectsData = {
    yggdrasil: {
        title: "Yggdrasil",
        meta: "Full-Stack Compliance Engine",
        desc: "Architected a full-stack compliance engine using Next.js 15, React 19, and TypeScript that automates mapping of GDPR / SOC2 / AML style policies to CSV datasets, removing manual auditing steps. Integrated LLM assistance (Vercel AI SDK + Google Gemini) to extract enforceable logic from PDFs and feed a deterministic rule engine. Backend on Supabase (Postgres + RLS) with a Bayesian feedback loop to iteratively improve rule precision and lower false positives. Designed dashboards and CSV exports to make audit trails and remediation actionable for compliance teams.",
        tags: ["Next.js", "React", "TypeScript", "Supabase", "LLMs", "Compliance", "Docker"],
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/Basit-Ali0/Yggdrasil",
        live: "https://yggdrasil-793978127865.asia-south1.run.app/"
    },
    slotsync: {
        title: "SlotSync",
        meta: "Backend API Architecture",
        desc: "Built a modular, production-ready RESTful API with Node.js and Express.js focused on clean separation of concerns and scalable route handling. Implemented request validation, centralized error middleware, and controller/service layers to reduce server exceptions and make the codebase easy to extend. The architecture improves testability and speeds up onboarding for new contributors — ideal for real-time booking or scheduling frontends. Frontend integrations follow the same modular conventions.",
        tags: ["Node.js", "Express", "REST API", "Architecture", "Validation", "CI/CD"],
        image: "https://images.unsplash.com/photo-1620825937374-87fc1a620f8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/Basit-Ali0/slotsync-backend",
        live: "https://yggdrasil-793978127865.asia-south1.run.app/"
    },
    maskedfile: {
        title: "Masked File (Secure Share)",
        meta: "Zero-Knowledge Encrypted Platform",
        desc: "A zero-knowledge encrypted file-sharing platform using AES-256-GCM via the Web Crypto API so the server never sees plaintext. Implemented a streaming encrypt/upload/download pipeline that supports files up to 5GB using Web Workers to keep the UI responsive. Deployed with Docker, Render, and Cloudflare R2 for global delivery; Supabase stores metadata and handles auto-expiry. Current deployments serve 50+ active users while maintaining a strict client-side key model and automatic file destruction. This project showcases secure UX for sensitive file exchange without compromising on scale or UX.",
        tags: ["WebCrypto", "AES-GCM", "Web Workers", "Cloudflare R2", "Supabase", "Docker", "Secure by design"],
        image: "images/maskedfile.png",
        github: "https://github.com/Basit-Ali0/secure-share",
        live: "http://maskedfile.online"
    },
    campuspulse: {
        title: "Campus Pulse",
        meta: "AI-Powered Automation Portal",
        desc: "Developed a centralized grievance management system to automate the triage, aggregation, and routing of student-reported issues across the Jamia Hamdard campus. Built with Next.js and Supabase, the platform replaces fragmented offline complaints with a unified web portal. It leverages Google Generative AI to automatically group similar overlapping issues and calculates dynamic priority scores based on urgency, impact, and reporting frequency. Designed robust, role-based dashboards for both students and administrators, featuring real-time metric visualization and automated department routing.",
        tags: ["Next.js", "Supabase", "PostgreSQL", "Google Generative AI", "Tailwind CSS", "Zustand"],
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        github: "https://github.com/Amm4r03/campus-pulse",
        live: "https://campus-pulse-xi.vercel.app/"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.pc');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    const mHeader = document.getElementById('modal-header');
    const mTitle = document.getElementById('modal-title');
    const mMeta = document.getElementById('modal-meta');
    const mDesc = document.getElementById('modal-desc');
    const mTags = document.getElementById('modal-tags');
    const mLinkGithub = document.getElementById('modal-link-github');
    const mLinkLive = document.getElementById('modal-link-live');

    if (!modal) return; // Safeguard if modal HTML is missing

    function tagColor(tagName) {
        const map = {
            'Next.js': '#3b82f6', 'React': '#06b6d4', 'TypeScript': '#2563eb',
            'Supabase': '#22c55e', 'LLMs': '#a855f7', 'Compliance': '#f59e0b',
            'Docker': '#0ea5e9', 'Node.js': '#16a34a', 'Express': '#6b7280',
            'REST API': '#ef4444', 'Architecture': '#8b5cf6', 'Validation': '#14b8a6',
            'CI/CD': '#f97316', 'WebCrypto': '#f43f5e', 'AES-GCM': '#d946ef',
            'Web Workers': '#eab308', 'Cloudflare R2': '#f97316', 'Secure by design': '#10b981',
            'PostgreSQL': '#336791', 'Google Generative AI': '#0d9488', 'Tailwind CSS': '#06b6d4',
            'Zustand': '#fbbf24'
        };
        return map[tagName] || '#6366f1';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project');
            const data = projectsData[id];
            if (!data) return;

            mTitle.textContent = data.title;
            mMeta.textContent = data.meta;
            mDesc.textContent = data.desc;
            mHeader.style.backgroundImage = `url('${data.image}')`;

            if (mLinkGithub && data.github) {
                mLinkGithub.href = data.github;
                mLinkGithub.style.display = 'inline-flex';
            } else if (mLinkGithub) {
                mLinkGithub.style.display = 'none';
            }

            if (mLinkLive && data.live) {
                mLinkLive.href = data.live;
                mLinkLive.style.display = 'inline-flex';
            } else if (mLinkLive) {
                mLinkLive.style.display = 'none';
            }

            mTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.style.background = `${tagColor(tag)}20`;
                span.style.color = tagColor(tag);
                span.textContent = tag;
                mTags.appendChild(span);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Prevent clicks on card links from opening the modal
    document.querySelectorAll('.pc-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
