// src/api/storefrontApi.js (Optional)

export const saveHomePage = async (data) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Home page saved:", data);
      resolve({ success: true, message: "Home page updated successfully!" });
    }, 1500);
  });
};
