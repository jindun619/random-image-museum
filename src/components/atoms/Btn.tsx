function BlockBtn({ text, color }: { text: string; color: string }) {
  const btnColor = `btn-${color}`
  return (
    <div>
      <button className={`btn btn-block ${btnColor}`}>{text}</button>
    </div>
  );
}

export { BlockBtn };
