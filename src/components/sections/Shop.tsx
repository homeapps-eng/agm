"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { products, type Product } from "@/data/shop";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ShoppingBag } from "lucide-react";

export function Shop() {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <SectionWrapper id="shop" className="bg-muted/30">
      <SectionHeading
        badge="Merchandise"
        title="Anniversary Shop"
        subtitle="Commemorate 40 years with exclusive anniversary merchandise."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={fadeInUp}>
            <GlassCard
              className="cursor-pointer overflow-hidden p-0"
              onClick={() => setSelectedProduct(product)}
              whileHover={{ y: -4 }}
            >
              <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
                <ShoppingBag size={40} className="text-muted-foreground/30" />
                {product.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="gold">{product.badge}</Badge>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-violet">${product.price}</span>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Product Detail Modal */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div>
            <div className="mb-6 aspect-[4/3] rounded-xl bg-muted flex items-center justify-center">
              <ShoppingBag size={60} className="text-muted-foreground/30" />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-serif">{selectedProduct.name}</h3>
                <p className="mt-1 text-violet">{selectedProduct.category}</p>
              </div>
              <span className="text-2xl font-bold">${selectedProduct.price}</span>
            </div>
            <p className="mt-4 text-muted-foreground">{selectedProduct.description}</p>
            {selectedProduct.badge && <Badge variant="gold" className="mt-3">{selectedProduct.badge}</Badge>}
            <Button
              className="mt-6 w-full"
              onClick={() => {
                toast(`${selectedProduct.name} added to cart!`, "success");
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
