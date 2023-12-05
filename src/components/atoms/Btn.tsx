function BlockBtn({ text, color }: { text: string; color: string }) {
  const btnColor = `btn-${color}`;
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

export { BlockBtn };
