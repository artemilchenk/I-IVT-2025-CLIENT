import { useEffect } from "react";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/router.ts";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 — Page not found";
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12 grid grid-cols-1 gap-6 items-center"
        aria-labelledby="not-found-heading"
      >
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 flex items-center justify-center shadow-md">
            <span className="text-4xl sm:text-4xl font-extrabold text-red-700 dark:text-red-200 p-2">
              404
            </span>
          </div>

          <div>
            <div
              id="not-found-heading"
              className="font-bold text-gray-900 dark:text-gray-100 leading-tight text-2xl"
            >
              Oops — page not found
            </div>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl">
              The page you are looking for doesn’t exist or has been moved. You
              can go back home or use the navigation to find what you need.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(ROUTES.HOME.path)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 text-sm"
              aria-label="Back to home"
            >
              Back to home
            </button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Or try searching for something else in the app.
          </div>
        </div>

        <hr className="border-t border-gray-100 dark:border-gray-700" />

        <footer className="text-xs text-gray-400 dark:text-gray-500">
          If you believe this is an error, contact the app administrator or
          check the URL for typos.
        </footer>
      </motion.section>
    </main>
  );
};
