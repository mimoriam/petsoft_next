export default function SearchForm() {
  return (
    <form className="size-full">
      <input
        className="size-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50"
        placeholder="Search pets"
        type="search"
        // value={}
        // onChange={}
      />
    </form>
  );
}
