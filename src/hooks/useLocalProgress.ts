"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { slugify } from "@/lib/slug";
import type { LearnerProfile, Note, PracticeResult, ProgressState } from "@/types";

export const STORAGE_KEY = "forge-academy-progress-v1";
export const PROFILE_STORAGE_KEY = "forge-academy-profiles-v1";
export const ACTIVE_PROFILE_KEY = "forge-academy-active-profile-v1";
const PROFILE_CHANGE_EVENT = "forge-academy-profile-change";

const emptyProgress: ProgressState = {
  completedLectures: [],
  practiceResults: {},
  notes: {},
  streak: {
    count: 0
  }
};

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return localDateKey(date);
}

function profileProgressKey(profileId: string) {
  return `${STORAGE_KEY}:${profileId}`;
}

function readProfiles() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LearnerProfile[]) : [];
  } catch {
    return [];
  }
}

function persistProfiles(profiles: LearnerProfile[]) {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

function readProgress(storageKey: string) {
  if (typeof window === "undefined") {
    return emptyProgress;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return emptyProgress;
    }

    const parsed = JSON.parse(raw) as ProgressState;
    return {
      ...emptyProgress,
      ...parsed,
      completedLectures: parsed.completedLectures ?? [],
      practiceResults: parsed.practiceResults ?? {},
      notes: parsed.notes ?? {},
      streak: parsed.streak ?? emptyProgress.streak
    };
  } catch {
    return emptyProgress;
  }
}

function persistProgress(progress: ProgressState, storageKey: string) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

function notifyProfileChange() {
  window.dispatchEvent(new Event(PROFILE_CHANGE_EVENT));
}

export function useLocalProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [profiles, setProfiles] = useState<LearnerProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<LearnerProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  const loadFromStorage = useCallback(() => {
    const storedProfiles = readProfiles();
    const activeProfileId = window.localStorage.getItem(ACTIVE_PROFILE_KEY);
    const storedActiveProfile =
      storedProfiles.find((profile) => profile.id === activeProfileId) ?? null;

    setProfiles(storedProfiles);
    setActiveProfile(storedActiveProfile);
    setProgress(
      readProgress(
        storedActiveProfile ? profileProgressKey(storedActiveProfile.id) : STORAGE_KEY
      )
    );
    setIsReady(true);
  }, []);

  useEffect(() => {
    loadFromStorage();
    window.addEventListener(PROFILE_CHANGE_EVENT, loadFromStorage);
    return () => window.removeEventListener(PROFILE_CHANGE_EVENT, loadFromStorage);
  }, [loadFromStorage]);

  const currentStorageKey = activeProfile
    ? profileProgressKey(activeProfile.id)
    : STORAGE_KEY;

  const commit = useCallback((updater: (previous: ProgressState) => ProgressState) => {
    setProgress((previous) => {
      const next = updater(previous);
      persistProgress(next, currentStorageKey);
      return next;
    });
  }, [currentStorageKey]);

  const completedSet = useMemo(
    () => new Set(progress.completedLectures),
    [progress.completedLectures]
  );

  const masteredLectureIds = useMemo(
    () =>
      new Set(
        Object.values(progress.practiceResults)
          .filter((result) => result.mastered)
          .map((result) => result.lectureId)
      ),
    [progress.practiceResults]
  );

  const markLectureComplete = useCallback(
    (lectureId: string) => {
      commit((previous) => ({
        ...previous,
        completedLectures: previous.completedLectures.includes(lectureId)
          ? previous.completedLectures
          : [...previous.completedLectures, lectureId]
      }));
    },
    [commit]
  );

  const setLastOpenedCourse = useCallback(
    (courseId: string) => {
      commit((previous) => ({
        ...previous,
        lastOpenedCourse: courseId
      }));
    },
    [commit]
  );

  const recordPracticeResult = useCallback(
    (
      lectureId: string,
      score: number,
      total: number,
      missedProblemIds: string[]
    ) => {
      const today = localDateKey(new Date());
      commit((previous) => {
        const lastDate = previous.streak.lastPracticeDate;
        const nextCount =
          lastDate === today
            ? previous.streak.count
            : lastDate === yesterdayKey()
              ? previous.streak.count + 1
              : 1;
        const result: PracticeResult = {
          lectureId,
          score,
          total,
          mastered: score === total,
          attemptedAt: new Date().toISOString(),
          missedProblemIds
        };

        return {
          ...previous,
          practiceResults: {
            ...previous.practiceResults,
            [lectureId]: result
          },
          streak: {
            count: nextCount,
            lastPracticeDate: today
          }
        };
      });
    },
    [commit]
  );

  const addNote = useCallback(
    (lectureId: string, body: string) => {
      const trimmed = body.trim();
      if (!trimmed) {
        return;
      }

      commit((previous) => {
        const note: Note = {
          id: `${lectureId}-${Date.now()}`,
          lectureId,
          body: trimmed,
          updatedAt: new Date().toISOString()
        };
        return {
          ...previous,
          notes: {
            ...previous.notes,
            [lectureId]: [note, ...(previous.notes[lectureId] ?? [])]
          }
        };
      });
    },
    [commit]
  );

  const updateNote = useCallback(
    (lectureId: string, noteId: string, body: string) => {
      commit((previous) => ({
        ...previous,
        notes: {
          ...previous.notes,
          [lectureId]: (previous.notes[lectureId] ?? []).map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  body,
                  updatedAt: new Date().toISOString()
                }
              : note
          )
        }
      }));
    },
    [commit]
  );

  const deleteNote = useCallback(
    (lectureId: string, noteId: string) => {
      commit((previous) => ({
        ...previous,
        notes: {
          ...previous.notes,
          [lectureId]: (previous.notes[lectureId] ?? []).filter(
            (note) => note.id !== noteId
          )
        }
      }));
    },
    [commit]
  );

  const clearProgress = useCallback(() => {
    commit(() => emptyProgress);
  }, [commit]);

  const signInProfile = useCallback(
    (name: string, email?: string) => {
      const cleanedName = name.trim();
      const cleanedEmail = email?.trim().toLowerCase();

      if (!cleanedName) {
        return;
      }

      const profileId = `learner-${slugify(cleanedEmail || cleanedName)}`;
      const now = new Date().toISOString();
      const existingProfile = profiles.find((profile) => profile.id === profileId);
      const nextProfile: LearnerProfile = existingProfile
        ? {
            ...existingProfile,
            name: cleanedName,
            email: cleanedEmail || existingProfile.email,
            lastLoginAt: now
          }
        : {
            id: profileId,
            name: cleanedName,
            email: cleanedEmail || undefined,
            createdAt: now,
            lastLoginAt: now
          };
      const nextProfiles = existingProfile
        ? profiles.map((profile) => (profile.id === profileId ? nextProfile : profile))
        : [...profiles, nextProfile];
      const targetStorageKey = profileProgressKey(profileId);
      const targetHasProgress = Boolean(window.localStorage.getItem(targetStorageKey));

      persistProfiles(nextProfiles);
      window.localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);

      if (!targetHasProgress) {
        persistProgress(progress, targetStorageKey);
      }

      setProfiles(nextProfiles);
      setActiveProfile(nextProfile);
      setProgress(readProgress(targetStorageKey));
      notifyProfileChange();
    },
    [profiles, progress]
  );

  const signOutProfile = useCallback(() => {
    window.localStorage.removeItem(ACTIVE_PROFILE_KEY);
    setActiveProfile(null);
    setProgress(readProgress(STORAGE_KEY));
    notifyProfileChange();
  }, []);

  const deleteProfile = useCallback(
    (profileId: string) => {
      const nextProfiles = profiles.filter((profile) => profile.id !== profileId);
      persistProfiles(nextProfiles);
      window.localStorage.removeItem(profileProgressKey(profileId));
      setProfiles(nextProfiles);

      if (activeProfile?.id === profileId) {
        window.localStorage.removeItem(ACTIVE_PROFILE_KEY);
        setActiveProfile(null);
        setProgress(readProgress(STORAGE_KEY));
      }
      notifyProfileChange();
    },
    [activeProfile?.id, profiles]
  );

  const exportProgressSnapshot = useCallback(() => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        profile: activeProfile,
        progress
      },
      null,
      2
    );
  }, [activeProfile, progress]);

  const importProgressSnapshot = useCallback(
    (raw: string) => {
      const parsed = JSON.parse(raw) as {
        profile?: LearnerProfile | null;
        progress?: ProgressState;
      };
      const importedProgress = parsed.progress ?? (parsed as ProgressState);
      const importedProfile = parsed.profile;

      if (importedProfile) {
        const now = new Date().toISOString();
        const nextProfile: LearnerProfile = {
          ...importedProfile,
          lastLoginAt: now
        };
        const nextProfiles = profiles.some((profile) => profile.id === nextProfile.id)
          ? profiles.map((profile) =>
              profile.id === nextProfile.id ? nextProfile : profile
            )
          : [...profiles, nextProfile];

        persistProfiles(nextProfiles);
        persistProgress(importedProgress, profileProgressKey(nextProfile.id));
        window.localStorage.setItem(ACTIVE_PROFILE_KEY, nextProfile.id);
        setProfiles(nextProfiles);
        setActiveProfile(nextProfile);
        setProgress(importedProgress);
        notifyProfileChange();
        return;
      }

      persistProgress(importedProgress, currentStorageKey);
      setProgress(importedProgress);
      notifyProfileChange();
    },
    [currentStorageKey, profiles]
  );

  return {
    progress,
    isReady,
    profiles,
    activeProfile,
    isGuest: !activeProfile,
    completedSet,
    masteredLectureIds,
    markLectureComplete,
    setLastOpenedCourse,
    recordPracticeResult,
    addNote,
    updateNote,
    deleteNote,
    clearProgress,
    signInProfile,
    signOutProfile,
    deleteProfile,
    exportProgressSnapshot,
    importProgressSnapshot
  };
}
