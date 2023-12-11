import { atom } from "recoil";

interface UploadInputsState {
  file?: File;
  title: string;
  desc: string;
}

export const uploadInputsState = atom<UploadInputsState>({
  key: "uploadInputsState",
  default: {
    title: "",
    desc: "",
  },
});
