export default function TrustStrip() {

  const points = [
    "Trusted by 2,000+ customers",
    "Dermatologically tested",
    "Premium quality formula",
    "Made for Indian skin types",
  ];

  return (
    <section className="bg-primary text-white">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">

          {points.map((item) => (

            <div key={item} className="flex items-center gap-2">
              ✔ {item}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}