import { fetchSellerUserProfiles } from "../lib/data";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import styles from "./artisansPage.module.css";
import ProfileCardWrapper from "@/components/main/ProfileForm/ProfileCardWrapper";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";

export default async function Profiles() {
  const userProfiles = await fetchSellerUserProfiles();
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Artisans", href: "/artisans" },
        ]}
      />
      <ScrollableContainer>
        <div className={styles.content}>
          <h1>Seller Profiles</h1>

          <ProfileCardWrapper userProfiles={userProfiles} />
      </div>
      </ScrollableContainer>
    
    </>);
}