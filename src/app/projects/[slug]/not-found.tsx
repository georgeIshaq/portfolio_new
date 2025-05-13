import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="mb-6 text-4xl font-bold">Project Not Found</h1>
      <p className="mb-10 text-xl text-gray-600">
        Sorry, the project you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/#projects"
        className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Back to Projects
      </Link>
    </div>
  );
}
