export default function Searchbar() {
  return (
    <div className="flex items-center z-50">
      <form>
        <input
          type="text"
          placeholder="Buscar"
          required
          className="w-96 h-10 pr-1 pl-4 rounded-l-full text-sm outline-none border focus:border-tertiary-gray bg-primary-gray"
        />
      </form>
      <button className="flex items-center justify-center rounded-r-full bg-primary-gray w-16 h-10">
        <i className="fi fi-rr-search flex justify-center items-center"></i>
      </button>
    </div>
  );
}
