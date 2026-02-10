const Impact = () => {
  return (
    <section className="py-10 px-6 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#192841" }}
          >
            AI With Purpose, Not Just Possibility
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            AI shouldn't be a siloed experiment; it must be the engine of your business.
          </p>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              Most AI projects fail because they never leave the prototype phase. Our engineering-first approach ensures that AI integrations aren't just "cool features", they are production-grade systems.
            </p>
            <ul className="text-base sm:text-lg text-muted-foreground list-disc pl-6 space-y-2">
              <li>Zero "Spaghetti Code": Modular, maintainable architecture.</li>
              <li>Low Latency: Optimized for speed and high-throughput.</li>
              <li>Secure: Enterprise-grade encryption for all data in transit.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
