// components/CardCarousel.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import product from '@/utils/productHTTP';
import SlidingImage from "./SlidingImages"
import {CircularLoading} from '@/commonHelpers/circularLoading';
import axios from 'axios';
import { product } from '@/apiUtils/productsapi';

interface CardProps {
  title: string;
  category: string;
  price: number;
  image: string;
}

export const Card: React.FC<CardProps> = ({ title, category, price, image }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[250px] mb-4 p-5">
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src={`data:image/jpeg;base64,${image}`}
        alt={title}
        width={170}
        height={180}
        layout="intrinsic"
        className="object-cover rounded-lg" // Add rounded corners for a more polished look
      />
      <div className="p-4 w-full text-center">
        <h3 className="text-lg font-semibold truncate max-w-[200px] mb-2" title={title}>
          {title}
        </h3>
        <h3 className="text-gray-500 mb-1">{category}</h3>
        <div>
          <p className="text-blue-500 font-bold">₹{price }</p>
        </div>
        <button className="bg-blue-500 text-white py-2 px-6 m-3 rounded-md">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

const CardCarousel: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchCards() {
    try {
      setIsLoading(true)
      const response = await product.get('/api/productservice/products')
      setCards(response.data);
      console.log(1234,response);

    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Error fetching cards');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);



  

  return (
    <>
      <div className="p-2">
        <SlidingImage />
      </div>
      {isLoading ?  <div className="flex flex-wrap justify-between p-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>:
      <CircularLoading /> }
    </>
  );
};

export default CardCarousel;
