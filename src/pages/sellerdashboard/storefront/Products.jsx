// src/pages/sellerdashboard/storefront/Products.jsx

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { 
  Search, 
  Grid, 
  List, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Star, 
  Globe,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Save
} from "lucide-react";

function CustomDropdown({ value, options, onChange, isDark, placeholder = "Select...", icon: Icon = null, rounded = "rounded-xl" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full ${Icon ? 'pl-9 pr-7' : 'px-3'} py-2 ${rounded} text-xs sm:text-sm border-2 flex items-center justify-between gap-2 transition-colors ${
          isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500 hover:bg-purple-500/10' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500 hover:bg-purple-50'
        } ${isOpen ? 'ring-2 ring-purple-500 border-purple-500' : ''} focus:outline-none`}
      >
        {Icon && <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />}
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-1.5 w-full rounded-xl border-2 shadow-2xl overflow-hidden py-1 max-h-56 overflow-y-auto ${
            isDark ? 'bg-gray-800 border-purple-500/40' : 'bg-white border-purple-300'
          }`}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                opt.value === value
                  ? 'bg-purple-600 text-white font-semibold'
                  : isDark
                    ? 'text-gray-200 hover:bg-purple-600/25 hover:text-white'
                    : 'text-gray-700 hover:bg-purple-100 hover:text-purple-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const CATEGORY_OPTIONS = ['Cakes', 'Cupcakes', 'Custom Cakes', 'Cookies', 'Muffins'].map(cat => ({ value: cat, label: cat }));
const LANGUAGE_OPTIONS = [
  { value: 'EN', label: 'English (EN)' },
  { value: 'UR', label: 'Urdu (UR)' },
  { value: 'AR', label: 'Arabic (AR)' }
];


const getMockProductsData = () => ({
  success: true,
  data: [
    { id: 1, name: "Chocolate Dream Cake", price: 2500, salePrice: 1999, category: "Cakes", featured: true, language: "EN", description: "Rich chocolate cake with creamy frosting", image: "🍰", visible: true },
    { id: 2, name: "Strawberry Delight Cupcake", price: 800, salePrice: null, category: "Cupcakes", featured: false, language: "EN", description: "Fresh strawberry cupcake with cream topping", image: "🧁", visible: true },
    { id: 3, name: "Custom Birthday Cake", price: 3500, salePrice: 2999, category: "Custom Cakes", featured: true, language: "UR", description: "Personalized birthday cake as per your design", image: "🎂", visible: true },
    { id: 4, name: "Assorted Cookies Box", price: 1200, salePrice: null, category: "Cookies", featured: false, language: "EN", description: "Mixed cookie box with 6 different flavors", image: "🍪", visible: true },
    { id: 5, name: "Red Velvet Cake", price: 2800, salePrice: 2300, category: "Cakes", featured: false, language: "EN", description: "Classic red velvet cake with cream cheese", image: "🎂", visible: true },
    { id: 6, name: "Chocolate Chip Cookies", price: 600, salePrice: null, category: "Cookies", featured: false, language: "UR", description: "Freshly baked chocolate chip cookies", image: "🍪", visible: true },
    { id: 7, name: "Vanilla Dream Cake", price: 2200, salePrice: 1800, category: "Cakes", featured: false, language: "EN", description: "Classic vanilla cake with buttercream frosting", image: "🎂", visible: true },
    { id: 8, name: "Chocolate Chip Muffins", price: 500, salePrice: null, category: "Muffins", featured: false, language: "EN", description: "Freshly baked chocolate chip muffins", image: "🧁", visible: true }
  ]
});

const saveProductsData = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Products saved:", data);
      resolve({ success: true, message: "Products updated successfully!" });
    }, 1500);
  });
};

export default function ProductsStorefront() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    salePrice: "",
    category: "",
    description: "",
    language: "EN",
    featured: false
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const emptyAddForm = {
    name: "",
    price: "",
    salePrice: "",
    category: "Cakes",
    description: "",
    language: "EN",
    featured: false,
    image: "🎂"
  };
  const [addForm, setAddForm] = useState(emptyAddForm);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = getMockProductsData();
        if (response.success) {
          setProducts(response.data);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProductsData(products);
      setIsSaved(true);
      showToast("Products saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleVisibility = (id) => {
    setProducts(prev => 
      prev.map(p => {
        if (p.id === id) {
          const newVisible = !p.visible;
          showToast(`${p.name} ${newVisible ? 'visible' : 'hidden'}!`);
          return { ...p, visible: newVisible };
        }
        return p;
      })
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      salePrice: product.salePrice || "",
      category: product.category,
      description: product.description,
      language: product.language,
      featured: product.featured
    });
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    const updatedProduct = {
      ...editingProduct,
      ...editForm,
      price: Number(editForm.price),
      salePrice: editForm.salePrice ? Number(editForm.salePrice) : null
    };
    
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setIsEditModalOpen(false);
    showToast(`${updatedProduct.name} updated successfully! ✅`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast("Product deleted successfully!");
    }
  };

  const handleOpenAddModal = () => {
    setAddForm(emptyAddForm);
    setIsAddModalOpen(true);
  };

  const handleAddSave = () => {
    if (!addForm.name.trim() || !addForm.price) {
      showToast("Name and price are required! ❌");
      return;
    }

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: addForm.name.trim(),
      price: Number(addForm.price),
      salePrice: addForm.salePrice ? Number(addForm.salePrice) : null,
      category: addForm.category,
      featured: addForm.featured,
      language: addForm.language,
      description: addForm.description,
      image: addForm.image || "🎂",
      visible: true
    };

    setProducts(prev => [newProduct, ...prev]);
    setIsAddModalOpen(false);
    showToast(`${newProduct.name} added successfully! ✅`);
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-xl text-center border-2 ${isDark ? 'bg-red-900/30 border-red-800/40' : 'bg-red-50 border-red-200'}`}>
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Failed to Load</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">

      {toastMessage && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 px-4 py-3 rounded-xl shadow-lg border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex items-center gap-2 max-w-sm mx-auto sm:mx-0`}>
          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage the products shown on your store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAddModal}
            className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent"
          >
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3">
        <div className="relative flex-1 min-w-[140px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border-2
              ${isDark ? 'bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 hover:border-purple-500' : 'bg-white border-purple-300 text-gray-900 placeholder-gray-400 hover:border-purple-500'}
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              transition-colors duration-200
            `}
          />
        </div>

        <div className="relative min-w-[120px]">
          <CustomDropdown
            value={selectedCategory}
            options={categories.map(cat => ({ value: cat, label: cat }))}
            onChange={(val) => setSelectedCategory(val)}
            isDark={isDark}
            icon={Filter}
            rounded="rounded-lg"
          />
        </div>

        <div className="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 sm:p-2 rounded-md transition-all ${
              viewMode === 'grid' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Grid className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 sm:p-2 rounded-md transition-all ${
              viewMode === 'list' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <List className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className={`py-8 sm:py-12 text-center rounded-xl ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-100'}`}>
          <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">No Products Yet</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Add your first product to show it on your shop.</p>
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">Name, price, and at least one image are required.</p>
          <button onClick={handleOpenAddModal} className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 sm:gap-2 mx-auto">
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            Add Product
          </button>
        </div>
      ) : (
        <>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 xs:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-3 sm:gap-4`}>
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className={`
                  rounded-xl overflow-hidden transition-colors duration-200
                  ${isDark ? 'bg-gray-800/50 border-2 border-purple-500/25 hover:border-purple-500 hover:bg-purple-500/5' : 'bg-white border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50/50'}
                  ${!product.visible ? 'opacity-50 border-dashed border-red-400 dark:border-red-600' : ''}
                `}
              >
                <div className="relative h-32 sm:h-40 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">{product.image}</span>
                  
                  {!product.visible && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="px-3 py-1.5 text-xs font-bold text-white bg-red-500/80 rounded-full">Hidden</span>
                    </div>
                  )}
                  
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.featured && (
                      <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold bg-amber-500 text-white rounded-full flex items-center gap-0.5 sm:gap-1">
                        <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-white" />
                        <span className="hidden xs:inline">Featured</span>
                      </span>
                    )}
                    {product.salePrice && (
                      <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold bg-red-500 text-white rounded-full">Sale</span>
                    )}
                  </div>
                  
                  <div className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-medium bg-gray-800/80 text-white rounded-full flex items-center gap-0.5 sm:gap-1">
                    <Globe className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                    {product.language}
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                        {product.name}
                        {!product.visible && (
                          <span className="ml-2 text-[9px] sm:text-xs text-red-500 font-medium">(Hidden)</span>
                        )}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{product.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {product.salePrice ? (
                        <>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">PKR {product.salePrice}</p>
                          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 line-through">PKR {product.price}</p>
                        </>
                      ) : (
                        <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">PKR {product.price}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-end gap-1 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => toggleVisibility(product.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        product.visible 
                          ? 'text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400' 
                          : 'text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                      }`}
                      title={product.visible ? 'Hide' : 'Show'}
                    >
                      <Eye className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col xs:flex-row items-center justify-between gap-3 mt-3 sm:mt-4">
              <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 text-center xs:text-left">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of{' '}
                <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <ChevronLeft className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-6 sm:w-8 h-6 sm:h-8 rounded-lg text-[10px] sm:text-sm font-medium transition-all ${currentPage === index + 1 ? 'bg-purple-600 text-white' : isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <ChevronRight className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ===== Edit Modal ===== */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 border-2 ${isDark ? 'bg-gray-900 border-purple-500/40' : 'bg-white border-purple-300'} shadow-2xl`}>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Edit Product</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Product Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Sale Price</label>
                  <input
                    type="number"
                    value={editForm.salePrice}
                    onChange={(e) => setEditForm({ ...editForm, salePrice: e.target.value })}
                    placeholder="Optional"
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Category</label>
                  <CustomDropdown
                    value={editForm.category}
                    options={CATEGORY_OPTIONS}
                    onChange={(val) => setEditForm({ ...editForm, category: val })}
                    isDark={isDark}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Language</label>
                  <CustomDropdown
                    value={editForm.language}
                    options={LANGUAGE_OPTIONS}
                    onChange={(val) => setEditForm({ ...editForm, language: val })}
                    isDark={isDark}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className={`mt-1 w-full px-3 py-2 rounded-xl text-sm resize-none border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                />
              </div>

              {/* ✅ Featured Toggle - FIXED (no more overlap on narrow widths) */}
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex-shrink-0">
                  Featured Product
                </label>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, featured: !editForm.featured })}
                    className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${
                      editForm.featured ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        editForm.featured ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-6 flex-shrink-0">
                    {editForm.featured ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleEditSave} className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Add Product Modal ===== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 border-2 ${isDark ? 'bg-gray-900 border-purple-500/40' : 'bg-white border-purple-300'} shadow-2xl`}>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Add Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Product Name</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. Chocolate Fudge Cake"
                  className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={addForm.price}
                    onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                    placeholder="e.g. 2000"
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Sale Price</label>
                  <input
                    type="number"
                    value={addForm.salePrice}
                    onChange={(e) => setAddForm({ ...addForm, salePrice: e.target.value })}
                    placeholder="Optional"
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Category</label>
                  <CustomDropdown
                    value={addForm.category}
                    options={CATEGORY_OPTIONS}
                    onChange={(val) => setAddForm({ ...addForm, category: val })}
                    isDark={isDark}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Language</label>
                  <CustomDropdown
                    value={addForm.language}
                    options={LANGUAGE_OPTIONS}
                    onChange={(val) => setAddForm({ ...addForm, language: val })}
                    isDark={isDark}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Emoji / Image</label>
                <input
                  type="text"
                  value={addForm.image}
                  onChange={(e) => setAddForm({ ...addForm, image: e.target.value })}
                  placeholder="e.g. 🎂"
                  maxLength={4}
                  className={`w-20 px-3 py-2 rounded-xl text-lg text-center border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Description</label>
                <textarea
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  rows={3}
                  placeholder="Short description of the product"
                  className={`mt-1 w-full px-3 py-2 rounded-xl text-sm resize-none border-2 ${isDark ? 'bg-gray-800 border-purple-500/30 text-white hover:border-purple-500' : 'bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex-shrink-0">
                  Featured Product
                </label>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setAddForm({ ...addForm, featured: !addForm.featured })}
                    className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${
                      addForm.featured ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        addForm.featured ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-6 flex-shrink-0">
                    {addForm.featured ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleAddSave} className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
