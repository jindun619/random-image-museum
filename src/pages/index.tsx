import { Artwork } from "@/components/Artwork";

export default function IndexPage() {
  // const src = "http://via.placeholder.com/900x1200";
  const src =
    "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg";
  const title = "Name of The Artwork";
  const desc =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duisimperdiet dui quis ex commodo elementum. Aenean eget tristique quam.Quisque sit amet eros consequat, tempor nisl posuere, laciniaturpis. Phasellus eget facilisis neque. Mauris ut nisl in exconvallis venenatis. Morbi nec vestibulum leo. Vestibulumscelerisque lobortis risus sit amet pulvinar. Pellentesque habitantmorbi tristique senectus et netus et malesuada fames ac turpisegestas. Nunc risus nisi, cursus a nibh et, scelerisque consequatnulla.";
  return (
    <div className="flex justify-center mt-5">
      <Artwork
        src={src}
        title={title}
        author="김둔"
        desc={desc}
        withBtn={true}
      />
    </div>
  );
}
