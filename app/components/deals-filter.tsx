export default function DealsFilter() {
  return (
    <div className="w-full flex flex-row">
      <div className="w-1/3">
        <label className="font-light">Filter By:</label>
        <div className="flex gap-2">
          <select value={ undefined }
                  className="px-4 py-2 border-2">
            <option value={ undefined }>Speed</option>
          </select>
          <select value={ undefined }
                  className="px-4 py-2 border-2">
            <option value={ undefined }>Price</option>
          </select>
        </div>
      </div>
      <div className="w-1/3 flex flex-col">
        <label className="font-light">Deal Type:</label>
        <select value={ undefined }
                className="bg-blue-900 text-white py-2 text-center"
                style={ { borderRight: "10px solid transparent" } }>
          <option>Free setup + Router</option>
        </select>
      </div>
    </div>
  );
}