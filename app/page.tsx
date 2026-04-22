'use client'

import {useState, useEffect} from "react"
import {motion} from "framer-motion"
import {PRODUCTS} from "@/constants/product"
//import { once } from "events";
//import { main } from "framer-motion/client"

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true)
  }, []);
  
  const whatsappNumber = "2349123305803"

  const handleWhatsAppClick = (productName: string) => {
    const message = "Hello! I'm interested in your clothes."
    const encodedMessage = encodeURIComponent(message)
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`
  }
  
  return (
  <main className="min-h-screen px-4 bg-black text-white">
    {mounted ? (
      <>
      <section className="h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-black">
        <motion.h1 initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="text-5xl md:text-7xl font-bold tracking-tighter"
        >
        STYLISH WEAR. <br/>
        ESSENTIAL COMFORT.
      </motion.h1>
      <motion.p initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 0.3}}
      className="mt-4 text-gray-400 max-w-md"
      >
      Curated premium clothing for the modern professional. Browse our latest collection below
    </motion.p>
  </section>
  <section>
    <h2 className="text-2xl font-semibold mb-10">Latest Arrivals</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 py-2 gap-8">
      {PRODUCTS.map((product, index) => (
        <motion.div
        initial = {{opacity: 0, y: 50}}
        whileInView = {{opacity: 1, y: 0}}
        transition = {{duration: 0.5, delay: index*0.1}}
        viewport={{once: true}}
        key={product.id}
        whileHover={{ y: -5}}
        className="group cursor-pointer"
        >
        <div className="aspect-3/4 overflow-hidden bg-gray-100 rounded-lg">
          <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex flex-col justify-between items-center md:flex-row">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-400">{product.price}</p>
          </div>
          <a 
          href={handleWhatsAppClick(product.name)}
          target="_blank"
          className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-colors"
          >
          Buy on WhatsApp
        </a>
      </div>
    </motion.div>
    ))}
  </div>
</section>

<section id="about-us" className="h-auto md:h-auto lg:h-auto flow-root p-8 border rounded-2xl my-8">
  <motion.h2
    initial = {{opacity: 0, y: 1}}
    animate = {{opacity: 1, y: 0}}
    className="text-2xl font-bold border-b-2 mb-4"
    >About us
  </motion.h2>
  <motion.img 
  src={`https://images.unsplash.com/photo-1767536038913-837ef97913b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmF2ZSUyMGdlYXIlMjB3ZWFyc3xlbnwwfHwwfHx8MA%3D%3D`}
  className="aspect-auto border-0 rounded-xl w-full md:w-1/3 md:float-right md:ml-4 mb-4"
  />
  <motion.p
    initial = {{opacity: 0, y: 1}}
    animate = {{opacity: 1, y: 0}}
    className="text-lg text-justify my-2 leading-relaxed"
    > The Genesis of the Groove

    Techno-Wears wasn't born in a boardroom or a sanitized design studio; it was forged on the vibrating concrete of the underground warehouse scene. We founded this brand on a simple, uncompromising belief: rave gear shouldn't just look the part—it should be as relentless as the music that inspires it. In an environment where the humidity hits 90% and the BPM never drops below 140, standard streetwear simply isn't built to survive. We saw the limitations of fast fashion and decided to engineer a solution for those who live for the late-night culture. 
    Industrial DNA meets Tactical Performance 
    We’ve refined that industrial, utilitarian DNA for the modern street, combining raw, dark aesthetics with heavy-duty tactical durability. Every garment in our collection is a piece of equipment. From reinforced triple-stitching that withstands high-intensity movement to breathable, high-performance tech-fabrics that manage moisture while you're deep in the booth, every single detail is intentional. We utilize military-grade hardware and ergonomic tailoring to ensure that our silhouettes move with you—from the first atmospheric drop of the opening set to the unforgiving glare of the morning light.
    The Rave-Ready Standard
     Our commitment to the scene goes beyond just clothing; it’s about the endurance of the subculture. We test our prototypes in the harshest conditions—dark clubs, desert festivals, and industrial squats—to ensure they meet the demands of the global techno community. There are no distractions in our design language. No unnecessary flair. No compromises on quality. Whether you are navigating a crowded dancefloor or the urban landscape of the city, our gear is built to provide maximum utility without sacrificing the avant-garde edge that defines the genre. Built to endure the pressure. Built to survive the night.
  </motion.p>

</section>


<footer className="border-t mt-2 py-10 text-center text-gray-400 text-sm space-y-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
      <div className="flex flex-col border-x-2 border-gray-600 rounded-2xl py-4 items-center justify-center space-y-6">
        <div className="flex items-center justify-center border-b-2 border-gray-600 py-2 w-full"><a href="facebook.com" className="text-lg">YOUTUBE</a></div>
        <a href="facebook.com" className="text-sm">Follow us</a>
        <a href="facebook.com" className="text-sm">Buy from us</a>
        <a href="facebook.com" className="text-sm">Watch our videos</a>
        <a href="facebook.com" className="text-sm">Special offers</a>
        <a href="facebook.com" className="text-sm">Become a seller</a>
      </div>
      <div className="flex flex-col border-x-2 border-gray-600 rounded-2xl py-4 items-center justify-center space-y-6">
      <div className="flex items-center justify-center border-b-2 border-gray-600 py-2 w-full">
        <a href="facebook.com" className="text-lg">FACEBOOK</a>
      </div>
        <a href="facebook.com" className="text-sm">Follow us</a>
        <a href="facebook.com" className="text-sm">Buy from us</a>
        <a href="facebook.com" className="text-sm">Watch our videos</a>
        <a href="facebook.com" className="text-sm">Special offers</a>
        <a href="facebook.com" className="text-sm">Become a seller</a>
      </div>
      <div className="flex flex-col border-x-2 border-gray-600 rounded-2xl py-4 items-center justify-center space-y-6">
      <div className="flex items-center justify-center border-b-2 border-gray-600 py-2 w-full">
        <a href="facebook.com" className="text-lg">INSTAGRAM</a>
      </div>
        <a href="facebook.com" className="text-sm">Follow us</a>
        <a href="facebook.com" className="text-sm">Buy from us</a>
        <a href="facebook.com" className="text-sm">Watch our videos</a>
        <a href="facebook.com" className="text-sm">Special offers</a>
        <a href="facebook.com" className="text-sm">Become a seller</a>
      </div>
      <div className="flex flex-col border-x-2 border-gray-600 rounded-2xl py-4 items-center justify-center space-y-6">
        <div className="flex items-center justify-center border-b-2 border-gray-600 py-2 w-full">
          <a href="facebook.com" className="text-lg">CONTACT US</a>
        </div>
        <a href="facebook.com" className="text-sm">Follow us</a>
        <a href="facebook.com" className="text-sm">Buy from us</a>
        <a href="facebook.com" className="text-sm">Watch our videos</a>
        <a href="facebook.com" className="text-sm">Special offers</a>
        <a href="facebook.com" className="text-sm">Become a seller</a>
      </div>
    </div>
  <span>©2026 Modern Threads. All rights reserved.</span>
</footer>
</>
) : 
<div className="bg-white min-h-screen" />
}
</main>
);
}
