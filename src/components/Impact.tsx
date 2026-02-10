const Impact = () => {
  return (
    <section className="py-10 px-6 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#192841" }}
          >
            Automation That Moves the Needle
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Automation isn’t about replacing people, it’s about removing friction.
          </p>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              We embed AI directly into your business processes to handle complexity, improve accuracy, and unlock speed across operations. From data ingestion to decision execution, our solutions adapt, learn, and improve so your systems work harder without adding headcount.
            </p>
            <ul className="text-base sm:text-lg text-muted-foreground list-disc pl-6 space-y-2">
              <li>Reduce Error Rates: Eliminate manual copy-paste mistakes.</li>
              <li>Instant Scalability: Handle 10x the volume without hiring 10x the staff.</li>
              <li>Real-Time Execution: Tasks are completed the second they are triggered.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
