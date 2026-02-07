"use client";

import { useState } from "react";

export default function NotionIntegration() {
  const [isConnected, setIsConnected] = useState(false);
  const [workspace, setWorkspace] = useState("");

  const handleConnect = () => {
    // TODO: Implement Notion OAuth flow
    // This would redirect to Notion's OAuth endpoint
    const notionOAuthUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(window.location.origin + "/api/auth/notion/callback")}`;
    window.location.href = notionOAuthUrl;
  };

  const handleDisconnect = () => {
    if (confirm("Are you sure you want to disconnect Notion?")) {
      setIsConnected(false);
      setWorkspace("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Notion Integration
      </h2>

      {!isConnected ? (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Connect your Notion workspace to sync your knowledge base and enable
            AI-powered search.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              What will be shared?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Access to pages and databases you select</li>
              <li>• Page content and metadata</li>
              <li>• Update notifications for syncing</li>
            </ul>
          </div>
          <button
            onClick={handleConnect}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
          >
            <span>🔗</span>
            Connect Notion Workspace
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-300 mb-2">
              <span>✓</span>
              <span className="font-medium">Connected</span>
            </div>
            <div className="text-sm text-green-700 dark:text-green-400">
              Workspace: {workspace || "My Notion Workspace"}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Synced Pages
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              No pages synced yet. Run a sync to import your Notion content.
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Disconnect
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
              Manage Permissions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
