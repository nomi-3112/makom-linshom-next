import Image from "next/image";

const services = [
  {
    title: "תרפיה בנשימה",
    description: "נשימה מודעת ומעגלית ככלי לשחרור חסימות רגשיות וחיבור למרכז הפנימי.",
    image: "/hands.jpg",
  },
  {
    title: "עבודה סומטית",
    description: "הקשבה לשפת הגוף ומעבר מחקירה שכלית למפגש חי עם מה שקיים בפנים.",
    image: "/session.jpg",
  },
  {
    title: "טרנספורמציה",
    description: "כלים פרקטיים לניהול מערכת יחסים מיטיבה עם עצמך בתוך היום-יום.",
    image: "/wood.jpg",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="headline-section mb-4">מה קורה כאן</h2>
          <div className="divider-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group text-center">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
              >
                {service.title}
              </h3>
              <p className="body-text text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
