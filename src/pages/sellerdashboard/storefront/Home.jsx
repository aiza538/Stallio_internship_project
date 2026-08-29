// src/pages/sellerdashboard/storefront/Home.jsx

export default function HomeStorefront() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Home</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your store home page content here.</p>
      
      <div className="mt-6 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white">Hero Section</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage hero banner and headline</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white">Trust Badges</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage trust badges and reviews</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white">Customer Reviews</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage customer testimonials</p>
        </div>
      </div>
    </div>
  );
}