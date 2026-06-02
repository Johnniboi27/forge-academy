"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Download, LogIn, LogOut, Trash2, Upload, UserCircle } from "lucide-react";
import { useLocalProgress } from "@/hooks/useLocalProgress";

export function AccountMenu() {
  const {
    activeProfile,
    profiles,
    progress,
    signInProfile,
    signOutProfile,
    deleteProfile,
    exportProgressSnapshot,
    importProgressSnapshot
  } = useLocalProgress();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const signIn = () => {
    signInProfile(name, email);
    setName("");
    setEmail("");
  };

  const downloadProgress = () => {
    const blob = new Blob([exportProgressSnapshot()], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeProfile
      ? `forge-academy-${activeProfile.id}-progress.json`
      : "forge-academy-guest-progress.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        importProgressSnapshot(String(reader.result));
        setImportError("");
      } catch {
        setImportError("Could not import that progress file.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-red-800 hover:text-white"
        aria-expanded={isOpen}
      >
        <UserCircle className="h-4 w-4 text-red-300" aria-hidden />
        <span className="hidden sm:inline">
          {activeProfile ? activeProfile.name : "Sign in"}
        </span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,360px)] rounded-lg border border-zinc-800 bg-forge-panel p-4 shadow-forge">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                Learner account
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                {activeProfile ? activeProfile.name : "Guest progress"}
              </h2>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Progress is saved locally in this browser. Export/import lets a learner move it to another device.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-zinc-400">
            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-2">
              <span className="block text-lg font-semibold text-white">
                {progress.completedLectures.length}
              </span>
              Lectures
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-2">
              <span className="block text-lg font-semibold text-white">
                {Object.keys(progress.practiceResults).length}
              </span>
              Practice
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-2">
              <span className="block text-lg font-semibold text-white">
                {progress.streak.count}
              </span>
              Streak
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="text-xs font-medium text-zinc-400">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ada Lovelace"
                className="mt-1 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-red-700"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-zinc-400">Email or ID</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="student@example.com"
                className="mt-1 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-red-700"
              />
            </label>
            <button
              type="button"
              onClick={signIn}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-forge-burgundy px-3 py-2 text-sm font-semibold text-white transition hover:bg-forge-wine"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Sign in / switch profile
            </button>
          </div>

          {profiles.length ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Saved profiles
              </p>
              <div className="mt-2 space-y-2">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-zinc-800 bg-zinc-950 p-2"
                  >
                    <button
                      type="button"
                      onClick={() => signInProfile(profile.name, profile.email)}
                      className="min-w-0 flex-1 text-left text-sm text-zinc-200 hover:text-white"
                    >
                      <span className="block truncate">{profile.name}</span>
                      <span className="block truncate text-xs text-zinc-600">
                        {profile.email ?? profile.id}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProfile(profile.id)}
                      className="rounded-md border border-zinc-800 p-2 text-zinc-500 transition hover:border-red-800 hover:text-red-200"
                      aria-label={`Delete ${profile.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={downloadProgress}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
            >
              <Download className="h-4 w-4" aria-hidden />
              Export
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
            >
              <Upload className="h-4 w-4" aria-hidden />
              Import
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importProgress}
            className="hidden"
          />
          {importError ? <p className="mt-2 text-xs text-red-300">{importError}</p> : null}

          {activeProfile ? (
            <button
              type="button"
              onClick={signOutProfile}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sign out to guest
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
