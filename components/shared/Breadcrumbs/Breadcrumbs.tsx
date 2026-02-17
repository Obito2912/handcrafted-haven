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
}) {
    return (
        <nav aria-label="Breadcrumb" className={styles.nav}>
            <ol className={styles.ol}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href}
                        className={breadcrumb.active ? styles.active : styles.inactive}>
                        <Link aria-current={breadcrumb.active ? "page" : undefined} href={breadcrumb.href} className={styles.link}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 && <span className={styles.separator} aria-hidden="true">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
