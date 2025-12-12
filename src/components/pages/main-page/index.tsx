export default function Main() {
  return (
    <>
      <div className="mb-4 flex w-full gap-x-2">
        <div className="h-[218px] flex-1 rounded-md bg-gray-200"></div>
        <div className="h-[218px] flex-1 rounded-md bg-gray-200"></div>
        <div className="h-[218px] flex-1 rounded-md bg-gray-200"></div>
      </div>
      <div
        className="grid h-[calc(100%-268px)] w-full gap-2"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(400px,100%), 1fr))",
        }}
      >
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
        <div className="h-[280px] rounded-md bg-gray-200"></div>
      </div>
    </>
  );
}
