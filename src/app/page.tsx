"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ValuePills } from "@/components/value-pills";
import { FeatureCards } from "@/components/feature-cards";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <Hero />
      <ValuePills />
      <FeatureCards />
      
      {/* Minimal Final CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-sora font-light text-slate-900 mb-6 tracking-tight">
              Start optimizing today
            </h2>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto font-light">
              Experience the next generation of cross-chain yield optimization
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 font-light text-base shadow-sm hover:shadow-md transition-all duration-300 rounded-sm"
              >
                Get Started
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-slate-700 hover:text-slate-900 px-8 py-3 font-light text-base border-0 hover:bg-black/5 transition-all duration-300 rounded-sm"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
