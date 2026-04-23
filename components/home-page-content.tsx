"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product, ProductSource } from "@/lib/products";

const DEFAULT_WHATSAPP_NUMBER = "2349123305803";
const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;

type HomePageContentProps = {
  products: Product[];
  source: ProductSource;
};

function createWhatsAppLink(product: Product) {
  const message = encodeURIComponent(
    product.whatsappMessage || `Hello! I'm interested in ${product.name}.`,
  );

  return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
}

export default function HomePageContent({
  products,
  source,
}: HomePageContentProps) {
  return (
    <main className="min-h-screen bg-black px-4 pt-24 text-white">
      <section className="flex h-[70vh] flex-col items-center justify-center bg-black px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold tracking-tighter md:text-7xl"
        >
          STYLISH WEAR. <br />
          ESSENTIAL COMFORT.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 max-w-md text-gray-400"
        >
          Curated premium clothing for the modern professional. Browse our latest
          collection below.
        </motion.p>
      </section>

      {source === "fallback" ? (
        <section className="mx-auto mb-8 max-w-5xl rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
          Supabase is not configured yet, so this page is showing the local sample
          catalog. Add your `.env.local` values and run the SQL in
          `supabase/schema.sql` to switch to live products.
        </section>
      ) : null}

      <section id="shop" className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-2xl font-semibold">Latest Arrivals</h2>
        <div className="grid grid-cols-1 gap-8 py-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              key={product.id}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="aspect-3/4 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={800}
                  unoptimized
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-400">{product.priceLabel}</p>
                </div>
                <a
                  href={createWhatsAppLink(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-gray-800 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-green-600"
                >
                  Buy on WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="about-us"
        className="mx-auto my-8 max-w-6xl flow-root rounded-2xl border p-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 1 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 border-b-2 text-2xl font-bold"
        >
          About us
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 1 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 w-full md:float-right md:ml-4 md:w-1/3"
        >
          <Image
            src="https://images.unsplash.com/photo-1767536038913-837ef97913b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmF2ZSUyMGdlYXIlMjB3ZWFyc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Techno Wears editorial"
            width={600}
            height={720}
            unoptimized
            className="aspect-auto w-full rounded-xl border-0"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 1 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-2 text-justify text-lg leading-relaxed"
        >
          The Genesis of the Groove
          <br />
          <br />
          Techno-Wears was not born in a boardroom or a sanitized design studio;
          it was forged on the vibrating concrete of the underground warehouse
          scene. We founded this brand on a simple, uncompromising belief: rave
          gear should not just look the part, it should be as relentless as the
          music that inspires it. In an environment where the humidity hits 90%
          and the BPM never drops below 140, standard streetwear simply is not
          built to survive. We saw the limitations of fast fashion and decided to
          engineer a solution for those who live for the late-night culture.
          <br />
          <br />
          Industrial DNA meets Tactical Performance
          <br />
          <br />
          We have refined that industrial, utilitarian DNA for the modern street,
          combining raw, dark aesthetics with heavy-duty tactical durability.
          Every garment in our collection is a piece of equipment. From reinforced
          triple-stitching that withstands high-intensity movement to breathable,
          high-performance tech-fabrics that manage moisture while you are deep in
          the booth, every single detail is intentional. We utilize military-grade
          hardware and ergonomic tailoring to ensure that our silhouettes move
          with you from the first atmospheric drop of the opening set to the
          unforgiving glare of the morning light.
          <br />
          <br />
          The Rave-Ready Standard
          <br />
          <br />
          Our commitment to the scene goes beyond just clothing; it is about the
          endurance of the subculture. We test our prototypes in the harshest
          conditions, dark clubs, desert festivals, and industrial squats, to
          ensure they meet the demands of the global techno community. There are
          no distractions in our design language. No unnecessary flair. No
          compromises on quality. Whether you are navigating a crowded dancefloor
          or the urban landscape of the city, our gear is built to provide maximum
          utility without sacrificing the avant-garde edge that defines the genre.
          Built to endure the pressure. Built to survive the night.
        </motion.p>
      </section>

      <footer
        id="contact"
        className="mx-auto mt-2 max-w-6xl space-y-12 border-t py-10 text-center text-sm text-gray-400"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl border-x-2 border-gray-600 py-4">
            <div className="flex w-full items-center justify-center border-b-2 border-gray-600 py-2">
              <a href="https://youtube.com" className="text-lg">
                YOUTUBE
              </a>
            </div>
            <a href="https://youtube.com" className="text-sm">
              Follow us
            </a>
            <a href="https://youtube.com" className="text-sm">
              Buy from us
            </a>
            <a href="https://youtube.com" className="text-sm">
              Watch our videos
            </a>
            <a href="https://youtube.com" className="text-sm">
              Special offers
            </a>
            <a href="https://youtube.com" className="text-sm">
              Become a seller
            </a>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl border-x-2 border-gray-600 py-4">
            <div className="flex w-full items-center justify-center border-b-2 border-gray-600 py-2">
              <a href="https://facebook.com" className="text-lg">
                FACEBOOK
              </a>
            </div>
            <a href="https://facebook.com" className="text-sm">
              Follow us
            </a>
            <a href="https://facebook.com" className="text-sm">
              Buy from us
            </a>
            <a href="https://facebook.com" className="text-sm">
              Watch our videos
            </a>
            <a href="https://facebook.com" className="text-sm">
              Special offers
            </a>
            <a href="https://facebook.com" className="text-sm">
              Become a seller
            </a>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl border-x-2 border-gray-600 py-4">
            <div className="flex w-full items-center justify-center border-b-2 border-gray-600 py-2">
              <a href="https://instagram.com" className="text-lg">
                INSTAGRAM
              </a>
            </div>
            <a href="https://instagram.com" className="text-sm">
              Follow us
            </a>
            <a href="https://instagram.com" className="text-sm">
              Buy from us
            </a>
            <a href="https://instagram.com" className="text-sm">
              Watch our videos
            </a>
            <a href="https://instagram.com" className="text-sm">
              Special offers
            </a>
            <a href="https://instagram.com" className="text-sm">
              Become a seller
            </a>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl border-x-2 border-gray-600 py-4">
            <div className="flex w-full items-center justify-center border-b-2 border-gray-600 py-2">
              <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="text-lg">
                CONTACT US
              </a>
            </div>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="text-sm">
              WhatsApp support
            </a>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="text-sm">
              Bulk orders
            </a>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="text-sm">
              Custom requests
            </a>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="text-sm">
              Special offers
            </a>
            <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`} className="text-sm">
              Become a seller
            </a>
          </div>
        </div>
        <span>©2026 Modern Threads. All rights reserved.</span>
      </footer>
    </main>
  );
}
