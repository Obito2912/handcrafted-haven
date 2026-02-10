import Image from 'next/image';
import './SupportContactUs.css';

export default function SupportContactUs() {
    return (
        <section className="support__contact">
            <h2 className='support__contact_title'>Contact Us</h2>
            <div className='support__contact_container'>
                <div className="support__contact_email">
                    <Image src="/email-icon.png" alt="Email Icon" width={50} height={50} />
                    <div>
                        <h3 className='support__contact_email_title'>Email Support</h3>
                        <a className='support__contact_email-link' href="mailto:handcraftedhaven@example.com">handcraftedhaven@example.com</a>
                        <p>Monday - Friday (9am - 5pm)</p>
                    </div>
                </div>
                <div className="support__contact_chat">
                    <Image src="/chat-icon.png" alt="Chat Icon" width={50} height={50} />
                    <div>
                        <h3 className='support__contact_chat_title'>Live Chat</h3>
                        <p>Monday - Friday (9am - 5pm)</p>
                        <button className="support__contact_chat-button">Start Chat</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
