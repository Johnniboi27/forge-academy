import { notFound } from "next/navigation";
import { LectureDetailClient } from "@/components/LectureDetailClient";
import {
  allLectures,
  getCourseById,
  getLectureById,
  getLectureNeighbors
} from "@/data/courses";

export function generateStaticParams() {
  return allLectures.map((lecture) => ({
    lectureId: lecture.id
  }));
}

export default async function LecturePage({
  params
}: {
  params: Promise<{ lectureId: string }>;
}) {
  const { lectureId } = await params;
  const lecture = getLectureById(lectureId);

  if (!lecture) {
    notFound();
  }

  const course = getCourseById(lecture.courseId);

  if (!course) {
    notFound();
  }

  const neighbors = getLectureNeighbors(lecture.id);

  return (
    <LectureDetailClient
      lecture={lecture}
      course={course}
      previousLectureId={neighbors.previous?.id}
      nextLectureId={neighbors.next?.id}
    />
  );
}
