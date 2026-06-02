"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Note, PracticeResult, ProgressState } from "@/types";

export const STORAGE_KEY = "forge-academy-progress-v1";

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

function readProgress() {
  if (typeof window === "undefined") {
    return emptyProgress;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
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

function persistProgress(progress: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useLocalProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setIsReady(true);
  }, []);

  const commit = useCallback((updater: (previous: ProgressState) => ProgressState) => {
    setProgress((previous) => {
      const next = updater(previous);
      persistProgress(next);
      return next;
    });
  }, []);

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

  return {
    progress,
    isReady,
    completedSet,
    masteredLectureIds,
    markLectureComplete,
    setLastOpenedCourse,
    recordPracticeResult,
    addNote,
    updateNote,
    deleteNote,
    clearProgress
  };
}
