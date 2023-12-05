function Btn({
  text,
  color,
  textColor,
}: {
  text: string;
  color: string;
  textColor: string;
}) {
  const getColorString = (color: string) => {
    switch (color) {
      case "neutral":
        return "btn-neutral";
      case "ghost":
        return "btn-ghost";
      default:
        return "";
    }
  };

  return (
    <div>
      <button className={`btn ${getColorString(color)} text-${textColor}`}>
        {text}
      </button>
    </div>
  );
}

function BlockBtn({ text, color }: { text: string; color: string }) {
  const getColorString = (color: string) => {
    switch (color) {
      case "neutral":
        return "btn-neutral";
      default:
        return "";
    }
  };

  return (
    <div>
      <button className={`btn btn-block ${getColorString(color)}`}>
        {text}
      </button>
    </div>
  );
}

function ProfileBtn({ src }: { src: string }) {
  return (
    <button className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src={src} />
      </div>
    </button>
  );
}

export { Btn, BlockBtn, ProfileBtn };
