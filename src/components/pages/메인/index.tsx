export default function Main() {
  return (
    <>
      <div className="mb-4 flex h-50 w-full gap-x-2">
        <div className="flex-1 bg-gray-200"></div>
        <div className="flex-1 bg-gray-200"></div>
        <div className="flex-1 bg-gray-200"></div>
      </div>
      <div
        className="grid h-[calc(100%-268px)] w-full gap-2"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(400px,100%), 1fr))",
        }}
      >
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
        <div className="min-h-70 bg-gray-200"></div>
      </div>
    </>
  );
}
