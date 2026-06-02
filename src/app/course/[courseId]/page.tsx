import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/CourseDetailClient";
import { courses, getCourseById } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id
  }));
}

export default async function CoursePage({
  params
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
