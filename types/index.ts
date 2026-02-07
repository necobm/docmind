// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: MemberRole;
  user: User;
  joinedAt: Date;
}

// Notion Integration Types
export interface NotionIntegration {
  id: string;
  organizationId: string;
  accessToken: string;
  botId: string;
  workspaceId: string;
  workspaceName: string;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotionPage {
  id: string;
  integrationId: string;
  notionPageId: string;
  title: string;
  url: string;
  lastEditedTime: Date;
  synced: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Document and Embedding Types
export interface Document {
  id: string;
  organizationId: string;
  sourceType: "notion";
  sourceId: string;
  title: string;
  content: string;
  url?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Embedding {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  embedding: number[];
  metadata: Record<string, any>;
  createdAt: Date;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

export interface Citation {
  documentId: string;
  title: string;
  url?: string;
  excerpt: string;
  relevanceScore: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  organizationId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// n8n API Request/Response Types
export interface N8nChatRequest {
  organizationId: string;
  userId: string;
  message: string;
  sessionId?: string;
}

export interface N8nChatResponse {
  response: string;
  citations: Citation[];
  sessionId: string;
}

export interface N8nSyncRequest {
  organizationId: string;
  integrationId: string;
}

export interface N8nSyncResponse {
  success: boolean;
  documentsProcessed: number;
  embeddingsCreated: number;
}
