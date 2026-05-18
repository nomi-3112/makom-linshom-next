import { MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="headline-section mb-4">
          לא חייבים ללכת את הדרך הזו לבד
        </h2>
        <div className="divider-line" />
        <p className="body-text mt-6 mb-10">
          מוכנים להחליף את המאמץ בנשימה?
        </p>
        <a
          href="https://wa.me/972507341685?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%99%D7%93%D7%9F%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%AA%D7%99%D7%99%D7%A2%D7%A5%20%D7%90%D7%99%D7%AA%D7%9A%20%D7%90%D7%9D%20%D7%AA%D7%94%D7%9C%D7%99%D7%A3%20%D7%94%D7%9C%D7%99%D7%95%D7%95%D7%99%20%D7%A9%D7%9C%D7%9A%20%D7%99%D7%9B%D7%95%D7%9C%20%D7%9C%D7%94%D7%AA%D7%90%D7%99%D7%9D%20%D7%9C%D7%99"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          <MessageCircle className="w-5 h-5" />
          בואו נדבר בוואטסאפ
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
