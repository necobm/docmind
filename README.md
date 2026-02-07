# DocMind

An AI-powered support and knowledge base assistant for companies. DocMind is a B2B SaaS application that enables organizations to connect their existing documentation systems and query that knowledge through a conversational AI interface.

## Overview

DocMind allows users to interact with a chat UI to ask questions about internal processes, policies, or documentation, and receive answers generated exclusively from connected knowledge sources. The system uses a Retrieval-Augmented Generation (RAG) approach to ensure answers are grounded in source content and include references.

### Key Features

- **Natural Language Chat**: Ask questions in plain language and get AI-generated answers
- **Notion Integration**: Connect your Notion workspace as a knowledge source (OAuth-based)
- **Source References**: Every answer includes references to the original documentation
- **Multi-User Support**: Multiple users per organization with role-based access (ADMIN/MEMBER)
- **Knowledge Source Management**: Admin users can manage which pages and databases are used as sources

## Architecture

The system is composed of:

- **Frontend**: Custom application where users interact with chat and admin interfaces
- **Backend/Orchestration**: n8n handling integrations, data ingestion, embeddings, vector search, and LLM calls
- **Database**: PostgreSQL with pgvector for storing embeddings and relational metadata
- **LLM Provider**: External Large Language Model provider (e.g., OpenAI or Claude)

```
┌─────────────┐     HTTP API      ┌─────────────┐
│   Frontend  │ ←───────────────→ │     n8n     │
│  (Next.js)  │                   │  (Backend)  │
└─────────────┘                   └──────┬──────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
                    ▼                    ▼                    ▼
            ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
            │  PostgreSQL │      │  Notion API │      │ LLM Provider│
            │  (pgvector) │      │             │      │             │
            └─────────────┘      └─────────────┘      └─────────────┘
```

The frontend communicates with n8n through a versioned HTTP API. The frontend does not communicate directly with Notion or the LLM provider.

## Technologies

| Component | Technology |
|-----------|------------|
| Frontend | Next.js with React and TypeScript |
| Styling | Tailwind CSS |
| Backend/Orchestration | n8n |
| Database | PostgreSQL with pgvector extension |
| AI | Large Language Model API with embeddings |
| Knowledge Source (MVP) | Notion API (OAuth-based integration) |
| Authentication | JWT-based authentication between frontend and n8n |

## Functional Requirements

### Chat
- Users can ask natural language questions via a chat interface
- The system retrieves relevant content from connected Notion pages using vector similarity search
- AI-generated answers are based only on retrieved content
- Each answer includes references to the source pages used

### Knowledge Source Management (Admin)
- Admin users can connect a Notion workspace via OAuth
- Admin users can select which pages or databases are used as knowledge sources
- Admin users can enable or disable sources without deleting data
- The system can re-sync content from Notion on demand or on a schedule

### User Management
- Admin users can create and manage users
- Users belong to a single organization
- Users have roles (ADMIN or MEMBER) that control access to admin features

## Non-Goals (MVP)

The following are explicitly out of scope for the MVP:

- Manual document uploads (PDFs, Word files)
- Billing and subscriptions
- Advanced analytics
- Fine-grained permissions per document
- Voice-based interaction

## Design Principles

- **Grounded Responses**: All AI responses must be grounded in source content (no hallucinations)
- **Decoupled Architecture**: The frontend is decoupled from backend implementation details
- **Extensible Knowledge Sources**: Knowledge sources are treated as abstract providers (Notion now, others later)
- **Future-Proof**: The system is designed to allow future migration to a custom backend without major frontend changes
