# n8n Workflow Configuration

## Overview
n8n handles the backend orchestration for DocMind, including:
- RAG (Retrieval Augmented Generation) pipeline
- Notion content synchronization
- Embedding generation
- Vector search

## Required Workflows

### 1. Chat Workflow
**Endpoint:** `POST /webhook/v1/chat`

**Request:**
```json
{
  "organizationId": "uuid",
  "userId": "uuid",
  "message": "string",
  "sessionId": "uuid (optional)"
}
```

**Response:**
```json
{
  "response": "string",
  "citations": [
    {
      "documentId": "uuid",
      "title": "string",
      "url": "string (optional)",
      "excerpt": "string",
      "relevanceScore": 0.95
    }
  ],
  "sessionId": "uuid"
}
```

**Workflow Steps:**
1. Receive chat request
2. Generate embedding for user message
3. Query pgvector for similar document chunks
4. Retrieve top K relevant chunks
5. Construct prompt with context
6. Call LLM API (OpenAI/Anthropic/etc.)
7. Extract citations from retrieved chunks
8. Return response with citations

### 2. Notion Sync Workflow
**Endpoint:** `POST /webhook/v1/sync/notion`

**Request:**
```json
{
  "organizationId": "uuid",
  "integrationId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "documentsProcessed": 42,
  "embeddingsCreated": 256
}
```

**Workflow Steps:**
1. Receive sync request
2. Fetch Notion integration details
3. Query Notion API for all pages
4. For each page:
   - Extract content
   - Store in documents table
   - Chunk content
   - Generate embeddings
   - Store embeddings with pgvector
5. Update last_sync_at timestamp
6. Return statistics

### 3. Sync Status Workflow
**Endpoint:** `GET /webhook/v1/sync/status/{organizationId}`

**Response:**
```json
{
  "lastSync": "2024-01-15T10:30:00Z",
  "status": "completed"
}
```

## Required n8n Nodes

### Core Nodes
- Webhook (for API endpoints)
- HTTP Request (for Notion API, LLM APIs)
- PostgreSQL (for database operations)
- Function/Code (for data transformation)
- Switch/IF (for conditional logic)

### Recommended Setup

1. **Environment Variables in n8n:**
   - `NOTION_API_URL`: https://api.notion.com/v1
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: PostgreSQL connection string
   - `EMBEDDING_MODEL`: text-embedding-ada-002

2. **Vector Search Query Example:**
```sql
SELECT 
  d.id,
  d.title,
  d.url,
  e.content,
  1 - (e.embedding <=> $1::vector) as similarity
FROM embeddings e
JOIN documents d ON e.document_id = d.id
WHERE d.organization_id = $2
ORDER BY e.embedding <=> $1::vector
LIMIT 5;
```

3. **RAG Prompt Template:**
```
You are a helpful AI assistant. Answer the user's question based ONLY on the context provided below. 
If the answer cannot be found in the context, say "I don't have enough information to answer that question."

Context:
{context}

User Question: {question}

Answer with citations:
```

## Deployment

1. Import workflows into n8n
2. Configure credentials (Notion OAuth, OpenAI API key, PostgreSQL)
3. Activate workflows
4. Test endpoints with sample requests

## Security Notes

- All webhook endpoints should validate API keys
- Store Notion OAuth tokens securely in n8n credentials
- Use environment variables for sensitive data
- Implement rate limiting on chat endpoint
