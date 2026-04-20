import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';

const faqs = [
  {
    question: "What is EcoPal Engineering?",
    answer: "EcoPal Engineering is a Sri Lankan-based company specializing in renewable energy and sustainable agriculture solutions, helping businesses and homes transition to greener practices.",
  },
  {
    question: "How do your Biogas Systems work?",
    answer: "Our biogas systems convert organic waste into clean cooking fuel and organic fertilizer using anaerobic digestion. It's a completely sustainable process that reduces waste and lowers your carbon footprint.",
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes, we offer free initial consultations to assess your property's energy or agricultural needs and determine the best sustainable solutions for your budget.",
  },
  {
    question: "How long does installation take?",
    answer: "Installation timelines vary depending on the project scope. Residential solar or biogas systems typically take 1-2 weeks, while larger commercial projects may take up to a few months.",
  },
  {
    question: "Are your solutions financially viable?",
    answer: "Absolutely! Our renewable energy systems are designed to significantly reduce your monthly electricity or fuel bills, offering a solid return on investment typically within 2-4 years.",
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-emerald-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <HelpCircle className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-700 text-sm font-medium">Frequently Asked Questions</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0B3D2E] mb-6">
            Got Questions? We Have
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> Answers</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our frequently asked questions to learn more about our services, processes, and how we can help you build a greener future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl border border-emerald-100/50 p-6 md:p-10"
        >
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-2 border-gray-100 last:border-0 pb-2"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-[#0B3D2E] hover:text-emerald-600 hover:no-underline transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
