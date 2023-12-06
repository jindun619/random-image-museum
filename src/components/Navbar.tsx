import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b flex justify-between">
      <div>
        <Link href="/">
          <div>
            <button className="btn btn-ghost text-xl">daisyUI</button>
          </div>
        </Link>
      </div>
      <div className="gap-2">
        <button className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </button>
      </div>
    </div>
  );
}
