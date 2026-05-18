const VideoSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="headline-section mb-4">סיור קצר במרחב</h2>
        <div className="divider-line" />
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ paddingBottom: "177.78%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/UK4b3DNdBAE"
            title="סיור קצר במרחב - מקום לנשום"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
