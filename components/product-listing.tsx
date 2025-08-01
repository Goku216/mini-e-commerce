"use client"
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

const ProductListing = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      const res = await fetch('https://api.freeapi.app/api/v1/public/randomproducts');
      const data = await res.json();
      return data.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'text-chart-5 fill-chart-5'
                : ''
            }`}
          />
        ))}
        <span className="text-sm ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Discover Amazing Products
              </h1>
              <p >
                Find the perfect items from our curated collection
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 rounded-lg overflow-hidden">
                <Button
                  onClick={() => setViewMode('grid')}
                  size="icon"
                  variant={"secondary"}
                  className="cursor-pointer"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  size="icon"
                  variant={"secondary"}
                  className="cursor-pointer"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p >
            Showing {products.length} products
          </p>
        </div>

        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} >
            <Card 
              className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md  overflow-hidden ${
                viewMode === 'list' ? 'flex flex-row h-48' : ''
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Section */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
              }`}>
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={product.thumbnail}
                  alt={product.title}
                />
                
                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 ${
                  viewMode === 'list' ? 'flex-col' : ''
                }`}>
                  <Button className="cursor-pointer" variant="secondary" size="icon">
                    <Eye  className="w-5 h-5 " />
                  </Button>
                  <Button className="cursor-pointer" variant="secondary" size="icon" >
                    <Heart className="w-5 h-5 " />
                  </Button>
                </div>

                {/* Discount Badge */}
                {product.discountPercentage && (
                  <Badge variant="destructive" className="absolute top-3 left-3">
                    -{Math.round(product.discountPercentage)}%
                  </Badge>
                )}
              </div>

              {/* Content Section */}
              <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 p-6' : ''}`}>
                <CardHeader className={`${viewMode === 'list' ? 'p-0 pb-3' : 'pb-3'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg  line-clamp-2 group-hover:text-chart-1 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm capitalize mt-1">
                        {product.brand} • {product.category}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className={`flex-1 ${viewMode === 'list' ? 'p-0 py-2' : 'pt-0'}`}>
                  <p className="text-sm line-clamp-3 mb-3">
                    {product.description}
                  </p>
                  
                  {product.rating && renderStars(product.rating)}
                </CardContent>

                <CardFooter className={`${viewMode === 'list' ? 'p-0 pt-3 flex items-center justify-between' : 'pt-4 flex-col justify-start items-start gap-2'} `}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.discountPercentage && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price / (1 - product.discountPercentage / 100))}
                        </span>
                      )}
                    </div>
                    {product.stock && (
                      <span className="text-xs text-green-600 font-medium">
                        {product.stock} in stock
                      </span>
                    )}
                  </div>
                  
                  <Button className="cursor-pointer" >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </div>
            </Card>
            </Link>
          ))}
        </div>

        {/* Loading State */}
        {products.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading amazing products...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { ProductListing };