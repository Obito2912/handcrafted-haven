import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import { fetchUserInformation, fetchUserProfile, fetchUserProducts } from "@/app/(main)/lib/data";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";
import ArtisansDisplay from "@/components/main/Artisans/ArtisansDisplay";
import ArtisansProductDisplay from "@/components/main/Artisans/ArtisansProductDisplay";
import styles from "../artisansPage.module.css";

export default async function Artisans(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  console.log(`Fetching artisan profile for user ID ${params.id}...`);
  // Fetch data
  const user = await fetchUserInformation(params.id);
  const userProfile = await fetchUserProfile(params.id);
  const products = await fetchUserProducts(params.id);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Artisans", href: "/artisans" },
          { label: userProfile?.name ?? "Artisan", href: `/artisans/${params.id}`, active: true },
        ]}
      />
      <ScrollableContainer>
        <div className={styles.content}>
        <ArtisansDisplay userProfile={userProfile} user={user}></ArtisansDisplay>
        <ArtisansProductDisplay products={products}></ArtisansProductDisplay>
        </div>
      </ScrollableContainer>
    </>
  );
}

