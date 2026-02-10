import Link from 'next/link';
import './SupportCard.css';
import Image from 'next/image';

export default function SupportCard() {
    //Support array
    const support = [
        {
            title: 'Orders & Shipping',
            description: 'Track your order, or get help with your shipping.',
            icon: '/shipping-icon.png'
        },
        {
            title: 'Returns & Refunds',
            description: 'Questions about returns or refunds? We can help.',
            icon: '/return-package-icon.png'
        },
        {
            title: 'Account & Profile',
            description: 'Learn how to manage your settings and profile information.',
            icon: '/account-icon.png'
        },
        {
            title: 'Artisan Resources',
            description: 'Resources and support for our artisan community.',
            icon: '/paint-palette-icon.png'
        },

    ];
    return (
        support.map(item => (
            <div className="support__card" key={item.title}>
                <Image src={item.icon} alt={`${item.title} icon`} width={50} height={50} className="support__card_icon" />
                <h3 className='support__card_title'>{item.title}</h3>
                <p className='support__card_description'>{item.description}</p>
                <Link href="#" className="support__card_link">View Articles</Link>
            </div>
        ))
    )
}