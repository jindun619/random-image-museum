import { atom } from "recoil";

interface curArtworkState {
  src: string;
  title: string;
  author: string;
  desc: string;
}

export const curArtworkState = atom<curArtworkState>({
  key: "curArtworkState",
  default: {
    src: "",
    title: "",
    author: "",
    desc: "",
  },
});
