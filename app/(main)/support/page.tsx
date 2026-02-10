import SupportCard from "@/components/main/support/SupportCard";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import styles from './support.module.css';
import SupportContactUs from "@/components/main/support/SupportContactUs";

export default function Support() {
    return (
        <main className={styles.main}>
            <div className={styles.support}>
            <ScrollableContainer>
                <h1 className={styles.support__title}>Support Center</h1>
                <section className={styles.support__cards_container}>
                    <SupportCard />
                </section>
                <SupportContactUs />
            </ScrollableContainer>
            </div>
        </main>
    );
}