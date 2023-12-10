import { atom } from "recoil";

interface UploadInputsState {
  file?: File
  src: string;
  title: string;
  desc: string;
}

export const uploadInputsState = atom<UploadInputsState>({
  key: "uploadInputsState",
  default: {
    src: "",
    title: "",
    desc: "",
  },
});
