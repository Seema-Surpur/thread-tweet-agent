import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">Thread Agent</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const threads = useQuery(api.threads.listThreads);
  const createThread = useMutation(api.threads.createThread);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    await createThread({
      title,
      content: content.split('\n').filter(line => line.trim()),
    });
    
    setTitle("");
    setContent("");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold accent-text mb-4">Thread Agent</h1>
        <Authenticated>
          <p className="text-xl text-slate-600">Create and manage your Twitter threads</p>
        </Authenticated>
        <Unauthenticated>
          <p className="text-xl text-slate-600">Sign in to create threads</p>
        </Unauthenticated>
      </div>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>

      <Authenticated>
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thread Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter thread title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thread Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter thread content (one tweet per line)"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Thread
            </button>
          </form>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Threads</h2>
            {threads?.map((thread) => (
              <div key={thread._id} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold">{thread.title}</h3>
                <div className="mt-2 space-y-2">
                  {thread.content.map((tweet, index) => (
                    <p key={index} className="text-gray-600">{tweet}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Authenticated>
    </div>
  );
}
