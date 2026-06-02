import { notFound } from "next/navigation";
import { PracticeSetClient } from "@/components/PracticeSetClient";
import { allLectures, getCourseById, getLectureById } from "@/data/courses";

export function generateStaticParams() {
  return allLectures.map((lecture) => ({
    lectureId: lecture.id
  }));
}

export default async function PracticeSetPage({
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

  return <PracticeSetClient lecture={lecture} course={course} />;
}
