import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

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
        <Reveal className="text-center mb-16">
          <h2 className="headline-section mb-4">מה קורה כאן</h2>
          <div className="divider-line" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 120}>
              <article tabIndex={0} className="svc-card h-80 md:h-[26rem]">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="svc-img object-cover"
                />
                <div className="svc-shade" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-right">
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-cream)" }}
                  >
                    {service.title}
                  </h3>
                  <div className="svc-desc">
                    <p
                      className="text-sm md:text-base font-light leading-relaxed"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
