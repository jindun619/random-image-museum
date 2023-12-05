import { Btn, ProfileBtn } from "../atoms/Btn";

export function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b flex justify-between">
      <div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
        <Btn text="btn" color="ghost" textColor={"primary"} />
      </div>
      <div className="gap-2">
        <ProfileBtn src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
  );
}
