import { supabase } from "@/lib/supabase";

const getRandomArtwork = async () => {
  const { data } = await supabase.from("artworks").select();
  console.log(data);

  if (data) {
    const randomNumber = Math.floor(Math.random() * data.length);
    const selected = data[randomNumber];
    // const result = {

    // }
    return selected;
  }
};

export { getRandomArtwork };
