
import { fetchProductData } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';
import Image from 'next/image';

export default async function ProductCardWrapper()
{
    //TODO Add Paging and Filtering
    const { productData } = await fetchProductData();
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productData.map((product) => (
                <ProductCard key={product.product_id} {...product} />
            ))}
        </div> 
    );  
}

export function ProductCard(product : Product)
{
    return (
        <div className="round-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                <div className="relative h-32 relative flex-shrink-0">
                    <Image 
                        src={product.image_url}
                        alt={product.title}
                          width={128}
                        height={128}
                        className="rounded-lg object-contain"
                        //sizes="(max-width: 768px) 100vw, 256px"
                    />
                </div>
                <div className="ml-4 flex flex-col justify-center">
                    <h3 className="text-lg font-medium">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <p className="mt-2 font-semibold">${product.price}</p>
                </div>
            </div>
        </div>
    );
}
