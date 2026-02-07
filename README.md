# DocMind - AI Knowledge Assistant

A B2B SaaS AI knowledge assistant that integrates with Notion to provide intelligent, citation-backed answers to your team's questions.

## 🌟 Features

- **🔗 Notion Integration**: Seamlessly connect your Notion workspace via OAuth
- **🤖 RAG-Powered Search**: Get accurate answers with Retrieval Augmented Generation
- **📚 Source Citations**: Every answer includes citations to source documents
- **👥 Multi-User Organizations**: Support for teams with ADMIN and MEMBER roles
- **💬 Chat Interface**: Intuitive chat UI for natural conversation
- **⚙️ Admin Dashboard**: Manage organization settings, members, and integrations
- **🔄 Auto-Sync**: Keep knowledge base updated with Notion changes

## 🏗️ Architecture

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** for UI components

### Backend Orchestration
- **n8n** for workflow automation
- Handles RAG pipeline, embeddings, and Notion sync

### Database
- **PostgreSQL** with **pgvector** extension
- Stores users, organizations, documents, and embeddings

### Integrations
- **Notion API** for knowledge source
- **OpenAI API** (via n8n) for embeddings and LLM

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ with pgvector extension
- n8n instance
- Notion OAuth credentials
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/necobm/docmind.git
   cd docmind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `NEXT_PUBLIC_N8N_API_URL`: Your n8n instance URL
   - `N8N_API_KEY`: n8n API key for authentication
   - `NEXT_PUBLIC_NOTION_CLIENT_ID`: Notion OAuth client ID
   - `NOTION_CLIENT_SECRET`: Notion OAuth client secret

4. **Set up the database**
   
   See [docs/database-schema.md](docs/database-schema.md) for schema details.
   
   ```bash
   createdb docmind
   psql -d docmind -c "CREATE EXTENSION vector;"
   # Run schema creation scripts
   ```

5. **Configure n8n workflows**
   
   See [docs/n8n-workflows.md](docs/n8n-workflows.md) for workflow setup.
   
   Required workflows:
   - Chat workflow (RAG pipeline)
   - Notion sync workflow
   - Sync status workflow

6. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
docmind/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (future)
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat interface
│   ├── admin/             # Admin dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── chat/             # Chat components
│   ├── admin/            # Admin components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and libraries
│   ├── api/             # API clients
│   └── utils/           # Helper functions
├── types/               # TypeScript type definitions
├── docs/                # Documentation
│   ├── database-schema.md
│   └── n8n-workflows.md
└── public/              # Static assets
```

## 🔐 Authentication & Authorization

### User Roles

- **ADMIN**: Full access to organization settings, member management, and integrations
- **MEMBER**: Access to chat and view synced content

### Authentication Flow

1. User signs up and creates organization
2. User becomes ADMIN of their organization
3. ADMIN can invite additional members
4. Members can be assigned ADMIN or MEMBER role

## 🔄 Notion Integration

### Setup Process

1. Create Notion OAuth integration at https://www.notion.so/my-integrations
2. Configure OAuth redirect URI: `http://localhost:3000/api/auth/notion/callback`
3. Add credentials to `.env`
4. Connect workspace via Admin Dashboard
5. Run initial sync to import content

### Sync Process

The Notion sync workflow:
1. Fetches all accessible pages from Notion
2. Extracts page content and metadata
3. Stores documents in PostgreSQL
4. Generates embeddings using OpenAI
5. Stores embeddings with pgvector for similarity search

## 💬 RAG Pipeline

### How It Works

1. **User Query**: User asks a question in chat
2. **Embedding**: Query is converted to vector embedding
3. **Vector Search**: pgvector finds similar document chunks
4. **Context Building**: Top K relevant chunks are retrieved
5. **LLM Prompt**: Context + query sent to LLM
6. **Response**: AI generates answer strictly from context
7. **Citations**: Source documents are included with response

### Vector Search

Uses cosine similarity with pgvector:
```sql
SELECT * FROM embeddings 
ORDER BY embedding <=> query_embedding 
LIMIT 5;
```

## 🛠️ API Structure

All API calls go through n8n workflows:

- `POST /webhook/v1/chat` - Chat endpoint
- `POST /webhook/v1/sync/notion` - Trigger Notion sync
- `GET /webhook/v1/sync/status/{orgId}` - Get sync status

See [docs/n8n-workflows.md](docs/n8n-workflows.md) for details.

## 🧪 Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

## 📦 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### n8n
Deploy n8n using Docker or cloud provider. Configure workflows and credentials.

### Database
Use managed PostgreSQL with pgvector support (e.g., Supabase, AWS RDS).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🔗 Links

- [Notion API Documentation](https://developers.notion.com/)
- [n8n Documentation](https://docs.n8n.io/)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [Next.js Documentation](https://nextjs.org/docs)