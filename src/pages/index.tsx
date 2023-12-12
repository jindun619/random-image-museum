import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { Artwork } from "@/components/Artwork";

import { getRandomArtwork } from "@/utils";

import { curArtworkState } from "@/recoil/atoms/curArtworkState";

export default function IndexPage() {
  const [curArtwork, setCurArtwork] = useRecoilState(curArtworkState);

  const setRandomArtwork = async () => {
    const data = await getRandomArtwork();
    if (data) {
      setCurArtwork(data);
    }
  };

  const regenArtwork = () => {
    setCurArtwork({ src: "", title: "", author: "", desc: "" });
    setRandomArtwork();
  };

  useEffect(() => {
    setRandomArtwork();
  }, []);

  return (
    <div className="flex justify-center mt-5">
      <Artwork
        src={curArtwork.src || ""}
        title={curArtwork.title || ""}
        author={curArtwork.author || ""}
        desc={curArtwork.desc || ""}
        regenBtn={regenArtwork}
      />
    </div>
  );
}
