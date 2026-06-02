"use client";

import { useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import type { Note } from "@/types";

interface NotesPanelProps {
  lectureId: string;
  notes: Note[];
  onAdd: (lectureId: string, body: string) => void;
  onUpdate: (lectureId: string, noteId: string, body: string) => void;
  onDelete: (lectureId: string, noteId: string) => void;
}

export function NotesPanel({
  lectureId,
  notes,
  onAdd,
  onUpdate,
  onDelete
}: NotesPanelProps) {
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingBody, setEditingBody] = useState("");

  const addNote = () => {
    onAdd(lectureId, draft);
    setDraft("");
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditingBody(note.body);
  };

  const saveEdit = () => {
    if (!editingId) {
      return;
    }
    onUpdate(lectureId, editingId, editingBody);
    setEditingId(null);
    setEditingBody("");
  };

  return (
    <section className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
      <h2 className="text-xl font-semibold text-white">Lecture notes</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Notes are saved in this browser and tied to this lecture ID.
      </p>
      <div className="mt-4">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write a note about assumptions, formulas, or design checks..."
          className="min-h-28 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-red-700"
        />
        <button
          type="button"
          onClick={addNote}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-forge-burgundy px-3 py-2 text-sm font-semibold text-white transition hover:bg-forge-wine"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Add note
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {notes.length ? (
          notes.map((note) => (
            <article key={note.id} className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
              {editingId === note.id ? (
                <div>
                  <textarea
                    value={editingBody}
                    onChange={(event) => setEditingBody(event.target.value)}
                    className="min-h-24 w-full rounded-md border border-zinc-800 bg-forge-black px-3 py-2 text-sm text-white outline-none focus:border-red-700"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={saveEdit}
                      className="rounded-md bg-forge-burgundy px-3 py-2 text-sm font-semibold text-white transition hover:bg-forge-wine"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-md border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-300">{note.body}</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-zinc-600">
                      Updated {new Date(note.updatedAt).toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(note)}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-200 transition hover:border-red-700"
                      >
                        <Edit3 className="h-3.5 w-3.5" aria-hidden />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(lectureId, note.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-200 transition hover:border-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </article>
          ))
        ) : (
          <p className="rounded-md border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
            No notes yet.
          </p>
        )}
      </div>
    </section>
  );
}
