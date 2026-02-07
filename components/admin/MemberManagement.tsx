"use client";

import { useState } from "react";
import { MemberRole, OrganizationMember } from "@/types";

export default function MemberManagement() {
  const [members, setMembers] = useState<OrganizationMember[]>([
    {
      id: "1",
      userId: "user-1",
      organizationId: "org-1",
      role: MemberRole.ADMIN,
      user: {
        id: "user-1",
        email: "admin@example.com",
        name: "Admin User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      joinedAt: new Date(),
    },
  ]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>(MemberRole.MEMBER);

  const handleInvite = () => {
    // TODO: Implement invite functionality
    setShowInvite(false);
    setInviteEmail("");
    setInviteRole(MemberRole.MEMBER);
  };

  const handleRemove = (memberId: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter((m) => m.id !== memberId));
    }
  };

  const handleRoleChange = (memberId: string, newRole: MemberRole) => {
    setMembers(
      members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Team Members
        </h2>
        <button
          onClick={() => setShowInvite(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Invite Member
        </button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium mb-4 text-gray-900 dark:text-white">
            Invite New Member
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="colleague@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as MemberRole)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={MemberRole.MEMBER}>Member</option>
                <option value={MemberRole.ADMIN}>Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Send Invite
              </button>
              <button
                onClick={() => setShowInvite(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {member.user.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {member.user.email}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={member.role}
                onChange={(e) =>
                  handleRoleChange(member.id, e.target.value as MemberRole)
                }
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value={MemberRole.MEMBER}>Member</option>
                <option value={MemberRole.ADMIN}>Admin</option>
              </select>
              <button
                onClick={() => handleRemove(member.id)}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
