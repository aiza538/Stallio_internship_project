// src/api/storefrontApi.js

// ============================================================
// 0. DATA STORE (Memory)
// ============================================================

// ✅ About Page Data Store (stored here after save)
let aboutDataStore = {
  enabled: true,
  language: "EN",
  headline: "",
  story: "",
  heroImage: "",
  heroTextColor: "#4A1A6B",
};

// ✅ Products Data Store
let productsDataStore = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    price: 2500,
    salePrice: 1999,
    category: "Cakes",
    featured: true,
    language: "EN",
    description: "Rich chocolate cake with creamy frosting",
    image: "🍰",
    visible: true,
  },
  {
    id: 2,
    name: "Strawberry Delight Cupcake",
    price: 800,
    salePrice: null,
    category: "Cupcakes",
    featured: false,
    language: "EN",
    description: "Fresh strawberry cupcake with cream topping",
    image: "🧁",
    visible: true,
  },
  {
    id: 3,
    name: "Custom Birthday Cake",
    price: 3500,
    salePrice: 2999,
    category: "Custom Cakes",
    featured: true,
    language: "UR",
    description: "Personalized birthday cake as per your design",
    image: "🎂",
    visible: true,
  },
  {
    id: 4,
    name: "Assorted Cookies Box",
    price: 1200,
    salePrice: null,
    category: "Cookies",
    featured: false,
    language: "EN",
    description: "Mixed cookie box with 6 different flavors",
    image: "🍪",
    visible: true,
  },
  {
    id: 5,
    name: "Red Velvet Cake",
    price: 2800,
    salePrice: 2300,
    category: "Cakes",
    featured: false,
    language: "EN",
    description: "Classic red velvet cake with cream cheese",
    image: "🎂",
    visible: true,
  },
  {
    id: 6,
    name: "Chocolate Chip Cookies",
    price: 600,
    salePrice: null,
    category: "Cookies",
    featured: false,
    language: "UR",
    description: "Freshly baked chocolate chip cookies",
    image: "🍪",
    visible: true,
  },
  {
    id: 7,
    name: "Vanilla Dream Cake",
    price: 2200,
    salePrice: 1800,
    category: "Cakes",
    featured: false,
    language: "EN",
    description: "Classic vanilla cake with buttercream frosting",
    image: "🎂",
    visible: true,
  },
  {
    id: 8,
    name: "Chocolate Chip Muffins",
    price: 500,
    salePrice: null,
    category: "Muffins",
    featured: false,
    language: "EN",
    description: "Freshly baked chocolate chip muffins",
    image: "🧁",
    visible: true,
  },
];

// ✅ Categories Data Store
let categoriesDataStore = [
  { id: 1, name: "Cakes", image: "🎂", language: "EN", productCount: 12 },
  { id: 2, name: "Cupcakes", image: "🧁", language: "EN", productCount: 8 },
  { id: 3, name: "Custom Cakes", image: "🎂", language: "UR", productCount: 5 },
  { id: 4, name: "Cookies", image: "🍪", language: "EN", productCount: 15 },
  { id: 5, name: "Muffins", image: "🧁", language: "EN", productCount: 6 },
  { id: 6, name: "Brownies", image: "🍫", language: "EN", productCount: 4 },
  { id: 7, name: "Donuts", image: "🍩", language: "UR", productCount: 9 },
  { id: 8, name: "Pastries", image: "🥐", language: "EN", productCount: 7 },
];

// ============================================================
// 1. HOME PAGE API
// ============================================================

// ✅ Get Home Page Data (Mock)
export const getHomePage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          hero: {
            title: "Welcome to Sweet Cravings Studio",
            subtitle: "Discover our delicious collection",
            ctaText: "Shop Now",
            active: true,
          },
          trustBadges: {
            items: [
              { id: 1, icon: "shield", label: "Secure Payments", active: true },
              { id: 2, icon: "truck", label: "Fast Delivery", active: true },
              {
                id: 3,
                icon: "headphones",
                label: "24/7 Support",
                active: true,
              },
              {
                id: 4,
                icon: "award",
                label: "Quality Guarantee",
                active: true,
              },
            ],
            active: true,
          },
          reviews: {
            items: [
              {
                id: 1,
                name: "Sarah Ahmed",
                rating: 5,
                comment: "Amazing products!",
                active: true,
              },
              {
                id: 2,
                name: "Muhammad Ali",
                rating: 5,
                comment: "Excellent service!",
                active: true,
              },
              {
                id: 3,
                name: "Fatima Khan",
                rating: 4,
                comment: "Great quality!",
                active: true,
              },
            ],
            active: true,
            total: 128,
          },
          status: "published",
          lastUpdated: "2 hours ago",
        },
      });
    }, 800);
  });
};

// ✅ Save Home Page Data (Mock)
export const saveHomePage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Home page saved:", data);
      resolve({ success: true, message: "Home page updated successfully!" });
    }, 1500);
  });
};

// ============================================================
// 2. ABOUT PAGE API — WITH DATA STORE ✅
// ============================================================

// ✅ Get About Page Data — returns stored data
export const getAboutPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          enabled: aboutDataStore.enabled ?? true,
          language: aboutDataStore.language ?? "EN",
          headline: aboutDataStore.headline ?? "",
          story: aboutDataStore.story ?? "",
          heroImage: aboutDataStore.heroImage ?? "",
          heroTextColor: aboutDataStore.heroTextColor ?? "#4A1A6B",
        },
      });
    }, 800);
  });
};

// ✅ Save About Page Data — stores data in memory
export const saveAboutPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // ✅ Store the data in memory
      aboutDataStore = {
        enabled: data.enabled ?? true,
        language: data.language ?? "EN",
        headline: data.headline ?? "",
        story: data.story ?? "",
        heroImage: data.heroImage ?? "",
        heroTextColor: data.heroTextColor ?? "#4A1A6B",
      };

      console.log("✅ About page saved:", aboutDataStore);
      resolve({
        success: true,
        message: "About page updated successfully!",
        data: aboutDataStore,
      });
    }, 1500);
  });
};

// ============================================================
// 3. PRODUCTS PAGE API — WITH DATA STORE ✅
// ============================================================

// ✅ Get Products Data — returns stored data
export const getProductsPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: productsDataStore,
      });
    }, 800);
  });
};

// ✅ Save Products Data — stores data in memory
export const saveProductsPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      productsDataStore = data;
      console.log("✅ Products saved:", productsDataStore);
      resolve({ success: true, message: "Products updated successfully!" });
    }, 1500);
  });
};

// ============================================================
// 4. CATEGORIES PAGE API — WITH DATA STORE ✅
// ============================================================

// ✅ Get Categories Data — returns stored data
export const getCategoriesPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: categoriesDataStore,
      });
    }, 800);
  });
};

// ✅ Save Categories Data — stores data in memory
export const saveCategoriesPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      categoriesDataStore = data;
      console.log("✅ Categories saved:", categoriesDataStore);
      resolve({ success: true, message: "Categories updated successfully!" });
    }, 1500);
  });
};
