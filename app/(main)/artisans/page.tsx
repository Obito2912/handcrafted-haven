import ScrollableContainer from "@/components/ScrollableContainer/ScrollableContainer";
import { fetchUserInformation, fetchUserProfile, fetchUserProducts } from "@/app/(main)/lib/data";

export default async function Artisans() {
  const userId = "user123"; // Replace with dynamic ID later

  // Fetch data
  const user = await fetchUserInformation(userId);
  const { userProfile } = await fetchUserProfile(userId);
  const products = await fetchUserProducts(userId);

  return (
    <main className="artisans">
      <ScrollableContainer>
        <h1>Artisan Profile</h1>

        {/* Profile Section */}
        {userProfile ? (
          <section className="artisan-profile">
            <img src={userProfile.image_url ?? "/default-avatar.png"} alt={userProfile.name ?? "Artisan"} />
            <h2>{userProfile.name ?? user?.email}</h2>
            <p>{userProfile.bio ?? "No bio available"}</p>
            <p>Age: {userProfile.age ?? "N/A"}</p>
            <p>Gender: {userProfile.gender ?? "N/A"}</p>
            <p>User Type: {userProfile.user_type ?? "N/A"}</p>
            <p>Joined: {user ? new Date(user.created_at).toLocaleDateString() : "Unknown"}</p>
          </section>
        ) : (
          <p>No profile found.</p>
        )}

        {/* Products Section */}
        <section className="artisan-products">
          <h2>Products</h2>
          {products.length > 0 ? (
            <ul className="product-list">
              {products.map((p) => (
                <li key={p.product_id} className="product-card">
                  <img src={p.image_url} alt={p.title} />
                  <strong>{p.title}</strong> – ${p.price}
                  <p>{p.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products yet.</p>
          )}
        </section>
      </ScrollableContainer>
    </main>
  );
}

//TODO Marco
//Create Artisan Profile Page