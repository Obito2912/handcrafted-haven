import './Aside.css';
import Navigation from "../Navigation/Navigation";

export default function Aside() {
    return <aside className="sidebar">
        <Navigation />
        <button className='sign-out'>Sign Out</button>
    </aside>;
}