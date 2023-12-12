import { supabase } from "@/lib/supabase";

const getRandomArtwork = async () => {
  const { data } = await supabase.from("artworks").select();

  if (data) {
    const randomNumber = Math.floor(Math.random() * data.length);
    const selected = data[randomNumber];
    const result = {
      src: `https://mxuynnjexrmtnwewutpx.supabase.co/storage/v1/object/public/images/public/${selected.authorId}_${selected.id}`,
      title: selected.title,
      author: selected.authorNickname,
      desc: selected.desc,
    };
    return result;
  }
};

export { getRandomArtwork };
