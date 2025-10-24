export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-5">
      <input
        type="text"
        placeholder="Search contact..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>
  );
}
