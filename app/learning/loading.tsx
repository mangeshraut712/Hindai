export default function LearningLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading Sanskrit Learning Hub...</p>
        </div>
      </div>
    </div>
  );
}
