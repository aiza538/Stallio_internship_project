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

// ============================================================
// 5. CONTACT PAGE API — WITH DATA STORE ✅
// ============================================================

let contactDataStore = {
  phone: "",
  email: "",
  address: "",
  socialLinks: [], // ✅ Empty array
};

export const getContactPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: contactDataStore,
      });
    }, 800);
  });
};

export const saveContactPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      contactDataStore = data;
      console.log("✅ Contact page saved:", contactDataStore);
      resolve({ success: true, message: "Contact page updated successfully!" });
    }, 1500);
  });
};

// ============================================================
// 6. FOOTER PAGE API — WITH DATA STORE ✅
// ============================================================

let footerDataStore = {
  enabled: true,
  logo: "",
  title: "",
  description: "",
};

export const getFooterPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: footerDataStore,
      });
    }, 800);
  });
};

export const saveFooterPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      footerDataStore = data;
      console.log("✅ Footer page saved:", footerDataStore);
      resolve({ success: true, message: "Footer page updated successfully!" });
    }, 1500);
  });
};

// ============================================================
// 7. COUPON CODES PAGE API — WITH DATA STORE ✅
// ============================================================

let couponsDataStore = [
  // { id: 1, code: "SAVE10", discount: 10, type: "percentage", expires: "2024-12-31" },
];

export const getCouponsPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: couponsDataStore,
      });
    }, 800);
  });
};

export const saveCouponsPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      couponsDataStore = data;
      console.log("✅ Coupons saved:", couponsDataStore);
      resolve({ success: true, message: "Coupons updated successfully!" });
    }, 1500);
  });
};

// src/api/storefrontApi.js

// ============================================================
// 8. OTHERS PAGE API — WITH DATA STORE ✅
// ============================================================

let othersDataStore = {
  announcement: {
    enabled: false,
    text: "",
  },
  delivery: {
    enabled: false,
    estimatedTime: "",
    codEnabled: false,
  },
  checkout: {
    note: "",
  },
  returnPolicy: {
    enabled: false,
  },
  shopLanguages: ["EN"],
};

export const getOthersPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: othersDataStore,
      });
    }, 800);
  });
};

export const saveOthersPage = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      othersDataStore = data;
      console.log("✅ Others page saved:", othersDataStore);
      resolve({
        success: true,
        message: "Others settings updated successfully!",
      });
    }, 1500);
  });
};
// ============================================================
// 9. NOTIFICATIONS API — WITH DATA STORE ✅
// ============================================================

let notificationsDataStore = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "John Doe placed a new order #1234 for Chocolate Dream Cake",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: "review",
    title: "New Customer Review",
    message: "Sarah Ahmed left a 5-star review on your store",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: "message",
    title: "New Message Received",
    message: "You have a new message from Muhammad Ali regarding order #1233",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    type: "customer",
    title: "New Customer",
    message: "Fatima Khan just signed up and joined your store",
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    type: "product",
    title: "Product Out of Stock",
    message:
      "Your product 'Strawberry Delight Cupcake' is low on stock (2 remaining)",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

export const getNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: notificationsDataStore,
      });
    }, 800);
  });
};

export const markAllAsRead = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notificationsDataStore = notificationsDataStore.map((n) => ({
        ...n,
        read: true,
      }));
      console.log("✅ All notifications marked as read");
      resolve({ success: true, message: "All notifications marked as read!" });
    }, 500);
  });
};

export const deleteAllNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notificationsDataStore = [];
      console.log("✅ All notifications deleted");
      resolve({ success: true, message: "All notifications deleted!" });
    }, 500);
  });
};

// ============================================================
// 10. CHAT API — WITH DATA STORE ✅
// ============================================================

let chatMessagesDataStore = [
  {
    id: 1,
    sender: "admin",
    message: "Hello! Welcome to Stallio Support 👋 How can I help you today?",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    sender: "seller",
    message: "Hi! I'm having trouble setting up my store. Can you help?",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    sender: "admin",
    message: "Of course! I'd be happy to help. What seems to be the issue?",
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    sender: "seller",
    message:
      "I'm trying to add products but the save button isn't working properly.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    sender: "admin",
    message:
      "Let me check that for you. Are you able to see any error messages?",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
];

export const getChatMessages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: chatMessagesDataStore,
      });
    }, 800);
  });
};

export const sendMessage = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        sender: "seller",
        message: message,
        timestamp: new Date().toISOString(),
      };
      chatMessagesDataStore = [...chatMessagesDataStore, newMessage];
      console.log("✅ Message sent:", newMessage);

      // Simulate admin reply
      setTimeout(() => {
        const adminReply = {
          id: Date.now() + 1,
          sender: "admin",
          message:
            "Thanks for your message! Our team will review it shortly. 🚀",
          timestamp: new Date().toISOString(),
        };
        chatMessagesDataStore = [...chatMessagesDataStore, adminReply];
        console.log("✅ Admin reply:", adminReply);
      }, 3000);

      resolve({ success: true, data: newMessage });
    }, 500);
  });
};
// src/api/storefrontApi.js

// ============================================================
// 11. MESSAGES API — WITH DATA STORE ✅
// ============================================================

let messagesDataStore = [
  {
    id: 1,
    senderName: "John Doe",
    subject: "Order #1234 - Delivery Question",
    preview:
      "Hi, I was wondering when my order will be delivered? I need it by Friday.",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    senderName: "Sarah Ahmed",
    subject: "Custom Cake Inquiry",
    preview:
      "Hello! I'd like to order a custom cake for my daughter's birthday. Do you offer customization?",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    senderName: "Muhammad Ali",
    subject: "Order #1233 - Return Request",
    preview:
      "I received my order but the product was damaged during shipping. Can I return it?",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    senderName: "Fatima Khan",
    subject: "Bulk Order Discount",
    preview:
      "I'm interested in placing a bulk order for my event. Do you offer discounts for large orders?",
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    senderName: "Ahmed Hassan",
    subject: "Product Suggestion",
    preview:
      "Just wanted to suggest adding more vegan options to your menu. I love your products!",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

export const getMessages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: messagesDataStore,
      });
    }, 800);
  });
};

export const markMessageAsRead = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      messagesDataStore = messagesDataStore.map((msg) =>
        msg.id === id ? { ...msg, read: true } : msg,
      );
      console.log(`✅ Message ${id} marked as read`);
      resolve({ success: true, message: "Message marked as read!" });
    }, 500);
  });
};

export const deleteMessage = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      messagesDataStore = messagesDataStore.filter((msg) => msg.id !== id);
      console.log(`✅ Message ${id} deleted`);
      resolve({ success: true, message: "Message deleted!" });
    }, 500);
  });
};
