# Setup Guide for DocMind

## Quick Start

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 14+ with pgvector extension
- n8n instance (cloud or self-hosted)
- Notion workspace with OAuth app
- OpenAI API key

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and configure the following:

```env
# n8n API Configuration
NEXT_PUBLIC_N8N_API_URL=https://your-n8n-instance.com
N8N_API_KEY=your-n8n-api-key

# Notion OAuth Configuration
NEXT_PUBLIC_NOTION_CLIENT_ID=your-notion-oauth-client-id
NOTION_CLIENT_SECRET=your-notion-oauth-client-secret
```

### Step 3: Database Setup

1. Create a PostgreSQL database:
```bash
createdb docmind
```

2. Enable the pgvector extension:
```sql
CREATE EXTENSION vector;
```

3. Run the schema creation scripts from `docs/database-schema.md`

### Step 4: n8n Configuration

Follow the instructions in `docs/n8n-workflows.md` to:
1. Import the required workflows
2. Configure credentials (Notion OAuth, OpenAI API key, PostgreSQL)
3. Activate the workflows

Required workflows:
- Chat workflow (`POST /webhook/v1/chat`)
- Notion sync workflow (`POST /webhook/v1/sync/notion`)
- Sync status workflow (`GET /webhook/v1/sync/status/{orgId}`)

### Step 5: Notion OAuth App Setup

1. Go to https://www.notion.so/my-integrations
2. Create a new integration
3. Configure OAuth settings:
   - Redirect URI: `http://localhost:3000/api/auth/notion/callback`
   - Capabilities: Read content, Read user information
4. Copy the OAuth client ID and secret to `.env`

### Step 6: Run the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The application will be available at http://localhost:3000

## Application Structure

```
docmind/
├── app/                    # Next.js app directory (pages)
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── admin/            # Admin UI components
│   └── chat/             # Chat UI components
├── lib/                   # Utilities and libraries
│   └── api/              # API clients
├── types/                # TypeScript type definitions
├── docs/                 # Documentation
│   ├── database-schema.md
│   └── n8n-workflows.md
└── public/               # Static assets
```

## Default User Roles

- **ADMIN**: Full access to organization settings, member management, and integrations
- **MEMBER**: Access to chat interface and view content

## Troubleshooting

### Build fails with module format error
Ensure `package.json` has `"type": "module"` set.

### Tailwind CSS not working
Make sure `@tailwindcss/postcss` is installed and configured in `postcss.config.js`.

### n8n API not responding
1. Check that n8n workflows are active
2. Verify the API URL in `.env`
3. Ensure API key is correctly configured

### Database connection issues
1. Verify PostgreSQL is running
2. Check connection string in n8n
3. Ensure pgvector extension is installed

## Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Database (Managed PostgreSQL)

Use a managed PostgreSQL service with pgvector support:
- Supabase (recommended)
- AWS RDS with pgvector
- DigitalOcean Managed Databases

### n8n (Cloud or Self-Hosted)

Option 1: n8n Cloud
- Sign up at https://n8n.io/cloud
- Import workflows
- Configure credentials

Option 2: Self-Hosted
- Deploy using Docker
- Configure workflows
- Ensure public endpoint for webhooks

## Security Considerations

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use HTTPS in production** - Especially for OAuth flows
3. **Rotate API keys regularly** - Change n8n and OpenAI keys periodically
4. **Implement rate limiting** - Protect chat endpoint from abuse
5. **Validate input** - Sanitize user input before processing

## Support

For issues and questions:
- Check the documentation in `/docs`
- Review the README.md
- Open an issue on GitHub
