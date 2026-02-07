import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center gap-8 p-8 max-w-4xl">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            DocMind
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300">
            AI Knowledge Assistant
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Powered by Notion integration and RAG technology, DocMind helps your
            team find answers from your knowledge base with accurate citations.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
          >
            Sign Up
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Try Chat
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              🔗 Notion Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Seamlessly connect your Notion workspace as your knowledge source
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              🤖 AI-Powered Search
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get accurate answers with RAG technology and source citations
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              👥 Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Multi-user organizations with role-based access control
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 DocMind. All rights reserved.</p>
      </footer>
    </div>
  );
}
