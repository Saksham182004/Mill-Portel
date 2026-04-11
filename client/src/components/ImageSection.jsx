const ImageSection = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
      }}
    >
      <div style={{ background: "#d1d5db", height: "150px" }}>Image 1</div>
      <div style={{ background: "#d1d5db", height: "150px" }}>Image 2</div>
      <div style={{ background: "#d1d5db", height: "150px" }}>Image 3</div>
      <div style={{ background: "#d1d5db", height: "150px" }}>Image 4</div>
    </div>
  );
};

export default ImageSection;
