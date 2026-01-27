import Header from '../components/header/header';
import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';

export default function Home() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <div>This will be the home page</div>
      </main>
      <Footer />
    </>
  );
}


