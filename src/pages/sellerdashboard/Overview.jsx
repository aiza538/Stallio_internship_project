// src/pages/sellerdashboard/Overview.jsx

export default function Overview() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome Back, Sweet Cravings Studio</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">Performance For Selected Period</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">PKR 13,000</p>
          <p className="text-xs text-gray-400 mt-1">Paid Orders Only · All Time</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</p>
          <p className="text-xs text-gray-400 mt-1">All Time</p>
        </div>

        {/* Total Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">38</p>
          <p className="text-xs text-gray-400 mt-1">In Catalog</p>
        </div>
      </div>

      {/* Performance Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Revenue (Paid)</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">All Time</span>
            </div>
            <div className="h-32 flex items-end gap-2">
              <div className="w-full h-16 bg-purple-200 dark:bg-purple-900/30 rounded-t-lg"></div>
              <div className="w-full h-24 bg-purple-300 dark:bg-purple-800/40 rounded-t-lg"></div>
              <div className="w-full h-32 bg-purple-500 dark:bg-purple-600 rounded-t-lg"></div>
              <div className="w-full h-20 bg-purple-300 dark:bg-purple-800/40 rounded-t-lg"></div>
              <div className="w-full h-12 bg-purple-200 dark:bg-purple-900/30 rounded-t-lg"></div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Revenue (paid): PKR 0</p>
          </div>

          {/* Orders Chart Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Orders</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">All Time</span>
            </div>
            <div className="h-32 flex items-end gap-2">
              <div className="w-full h-8 bg-blue-200 dark:bg-blue-900/30 rounded-t-lg"></div>
              <div className="w-full h-12 bg-blue-300 dark:bg-blue-800/40 rounded-t-lg"></div>
              <div className="w-full h-20 bg-blue-500 dark:bg-blue-600 rounded-t-lg"></div>
              <div className="w-full h-16 bg-blue-300 dark:bg-blue-800/40 rounded-t-lg"></div>
              <div className="w-full h-4 bg-blue-200 dark:bg-blue-900/30 rounded-t-lg"></div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">No orders in this period yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}