"use client";

import { useState } from "react";
import Link from "next/link";
import OrganizationSettings from "@/components/admin/OrganizationSettings";
import MemberManagement from "@/components/admin/MemberManagement";
import NotionIntegration from "@/components/admin/NotionIntegration";

type Tab = "organization" | "members" | "notion" | "sync";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("organization");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "organization", label: "Organization", icon: "🏢" },
    { id: "members", label: "Members", icon: "👥" },
    { id: "notion", label: "Notion Integration", icon: "🔗" },
    { id: "sync", label: "Sync Status", icon: "🔄" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="flex gap-4">
              <Link
                href="/chat"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Chat
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "organization" && <OrganizationSettings />}
        {activeTab === "members" && <MemberManagement />}
        {activeTab === "notion" && <NotionIntegration />}
        {activeTab === "sync" && <SyncStatus />}
      </div>
    </div>
  );
}

function SyncStatus() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Sync Status
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Last Sync
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Never synced
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Sync Now
          </button>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
            Sync Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                0
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Documents
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                0
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Embeddings
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                N/A
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last Duration
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
