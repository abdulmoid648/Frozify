import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, TrendingUp, Users, Banknote, X, Check, AlertCircle, LayoutGrid, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../api/productService';
import { getCategories, createCategory, deleteCategory } from '../api/categoryService';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: 100,
        image: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            setProducts(productsRes.data);
            setCategories(categoriesRes.data);

            if (categoriesRes.data.length > 0 && !formData.category) {
                setFormData(prev => ({ ...prev, category: categoriesRes.data[0].name }));
            }

            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let imageUrl = formData.image;

            // 1. Upload image if a new file is selected
            if (selectedFile) {
                setUploading(true);
                const uploadFormData = new FormData();
                uploadFormData.append('image', selectedFile);

                try {
                    const uploadRes = await uploadImage(uploadFormData);
                    imageUrl = uploadRes.image;
                } catch (err) {
                    throw new Error(err.message || err.error || 'Image upload failed');
                } finally {
                    setUploading(false);
                }
            }

            const finalProductData = {
                ...formData,
                image: imageUrl
            };

            // 2. Create or Update Product
            if (editingProduct) {
                await updateProduct(editingProduct._id, finalProductData);
                setSuccess('Product updated successfully!');
            } else {
                await createProduct(finalProductData);
                setSuccess('Product created successfully!');
            }

            setIsModalOpen(false);
            setEditingProduct(null);
            setSelectedFile(null);
            resetForm();
            fetchData();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.name) return;
        setLoading(true);
        try {
            await createCategory(newCategory);
            setSuccess('Category added successfully!');
            setNewCategory({ name: '', description: '' });
            fetchData();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.error || 'Failed to add category');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure? This won\'t delete products in this category but might leave them uncategorized.')) {
            try {
                await deleteCategory(id);
                setSuccess('Category deleted successfully');
                fetchData();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Delete failed');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image: product.image
        });
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setSuccess('Product deleted successfully');
                fetchData();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Delete failed');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: categories.length > 0 ? categories[0].name : '',
            stock: 100,
            image: ''
        });
        setSelectedFile(null);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === 'no-photo.jpg' || imagePath === '') return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000${imagePath}`;
    };

    const stats = [
        { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500' },
        { label: 'Categories', value: categories.length, icon: Layers, color: 'text-orange-500' },
        { label: 'Total Users', value: '1', icon: Users, color: 'text-purple-500' },
        { label: 'Revenue', value: 'Rs. 0', icon: Banknote, color: 'text-yellow-500' },
    ];

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
                >
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Admin Dashboard</h1>
                        <p className="text-gray-500 font-medium">Welcome back, <span className="text-white capitalize">{user?.username}</span></p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => { resetForm(); setEditingProduct(null); setIsModalOpen(true); }}
                            className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-sm flex items-center gap-2 hover:bg-gray-100 transition-all shadow-xl active:scale-95"
                        >
                            <Plus size={20} /> Add Product
                        </button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-6 mb-8 border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all px-2 ${activeTab === 'products' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        Products Management
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all px-2 ${activeTab === 'categories' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        Categories
                    </button>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex items-center gap-6">
                            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Status Messages */}
                {success && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-500 px-6 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                        <Check size={18} /> {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                {activeTab === 'products' ? (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-2xl font-black">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Products Table */}
                        <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Product</th>
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Price</th>
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {products.map((product) => (
                                            <tr key={product._id} className="group hover:bg-white/5 transition-all">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex-shrink-0 overflow-hidden border border-white/5">
                                                            {getImageUrl(product.image) ? (
                                                                <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <Package size={20} className="text-gray-600" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white text-sm">{product.name}</p>
                                                            <p className="text-[10px] text-gray-500 truncate max-w-[150px]">{product.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 font-bold text-white text-sm">Rs. {product.price}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`font-bold text-sm ${product.stock < 20 ? 'text-red-500' : 'text-green-500'}`}>
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-white transition-all"><Edit2 size={16} /></button>
                                                        <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* Category Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8">
                                <h3 className="text-xl font-black uppercase italic italic tracking-tight mb-8">Add New Category</h3>
                                <form onSubmit={handleAddCategory} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Category Name</label>
                                        <input
                                            value={newCategory.name}
                                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                            required
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all"
                                            placeholder="e.g. Frozen Snacks"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            value={newCategory.description}
                                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                            rows="3"
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all resize-none"
                                            placeholder="Short description..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all outline-none"
                                    >
                                        {loading ? 'Adding...' : 'Create Category'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Categories List */}
                        <div className="lg:col-span-2">
                            <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Name</th>
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Description</th>
                                            <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {categories.map((cat) => (
                                            <tr key={cat._id} className="hover:bg-white/5 transition-all">
                                                <td className="px-8 py-6 font-bold text-white">{cat.name}</td>
                                                <td className="px-8 py-6 text-xs text-gray-500">{cat.description || '-'}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => handleDeleteCategory(cat._id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                        <div className="relative w-full max-w-2xl bg-zinc-900 rounded-[3rem] border border-white/10 p-10 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black italic uppercase italic tracking-tight">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-white transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Image Upload Component */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Product Image</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            {selectedFile ? (
                                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-cover" />
                                            ) : getImageUrl(formData.image) ? (
                                                <img src={getImageUrl(formData.image)} alt="Current" className="w-full h-full object-cover" />
                                            ) : (
                                                <Package size={32} className="text-zinc-800" />
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                id="product-image"
                                            />
                                            <label
                                                htmlFor="product-image"
                                                className="inline-block bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                                            >
                                                {selectedFile ? 'Change Photo' : 'Upload Photo'}
                                            </label>
                                            <p className="text-[10px] text-gray-500 mt-2 ml-1">JPG or PNG. Max size 2MB.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Product Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all"
                                            placeholder="e.g. Chicken Samosa"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all appearance-none"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Price (Rs.)</label>
                                        <input
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Stock Quantity</label>
                                        <input
                                            name="stock"
                                            type="number"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all resize-none"
                                        placeholder="Briefly describe the product..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || uploading}
                                    className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg shadow-xl active:scale-[0.98] transition-all mt-4 disabled:opacity-50 uppercase"
                                >
                                    {uploading ? 'Uploading Image...' : loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
