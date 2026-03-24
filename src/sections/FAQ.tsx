import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = sectionRef.current;
    if (content) {
      gsap.from(content, {
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, []);

  const faqs: FAQItem[] = [
    {
      question: 'How long does the shoot take?',
      answer:
        'Most shoots take 2-3 hours depending on the package. We work around your schedule to minimize disruption during service hours. Early mornings (prep time) or late afternoons (golden hour) usually work best.',
    },
    {
      question: 'When will I receive my videos?',
      answer:
        'Standard delivery is 48-72 hours after the shoot. Rush delivery (24 hours) is available for an additional fee. All videos include professional color grading, trending audio, and captions.',
    },
    {
      question: 'Do you provide the trending audio and hashtags?',
      answer:
        "Yes! We research trending audio and provide a complete posting strategy including captions, hashtags, and optimal posting times. We stay on top of what's working right now so you don't have to.",
    },
    {
      question: 'What if I don\'t like the videos?',
      answer:
        'We offer unlimited revisions within 7 days of delivery. Our goal is your complete satisfaction. If you\'re not happy, we\'ll keep working until you are. That\'s our guarantee.',
    },
    {
      question: 'Do I need to prepare anything for the shoot?',
      answer:
        "Just your best dishes! We'll send a prep guide 48 hours before the shoot. Generally, we recommend having 3-5 signature dishes ready, a clean dining area, and any staff you'd like featured. We handle all the lighting and equipment.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div ref={sectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-orange font-semibold mb-2 uppercase tracking-wide">
            FAQ
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Common Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-2xl overflow-hidden px-6 data-[state=open]:bg-gray-50"
            >
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
