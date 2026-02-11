import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}){
    return (
        <nav aria-label="Breadcrumb" className = {styles.nav}>
            <ol className={styles.ol}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href} 
                        aria-current={breadcrumb.active}
                        className={breadcrumb.active ? styles.active : styles.inactive}>
                        <Link href={breadcrumb.href} className={styles.link}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 && <span className={styles.separator}>/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
