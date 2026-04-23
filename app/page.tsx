import HomePageContent from "@/components/home-page-content";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const { products, source } = await getProducts();

  return <HomePageContent products={products} source={source} />;
}
