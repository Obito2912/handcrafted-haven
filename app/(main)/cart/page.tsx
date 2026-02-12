// app/cart/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/dist/client/components/navigation";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import CartPageContent from "@/components/cart/CartPageContent/CartPageContent";
import styles from "./cart.module.css";

export default async function Cart() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className={styles.cart}>
      <ScrollableContainer>
        <h1 className={styles.cart__title}>Shopping Cart</h1>
        <CartPageContent userId={session.user.id} />
      </ScrollableContainer>
    </div>
  );
}
