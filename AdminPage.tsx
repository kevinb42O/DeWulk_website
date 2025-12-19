import React, { useState, useEffect } from 'react';
import { Lock, Save, LogOut, Plus, Trash2, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { MenuCategory, OpeningHourData, MenuData } from './types';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadMenuData();
    }
  }, [isLoggedIn]);

  const loadMenuData = async () => {
    try {
      const response = await fetch('/api/getMenu.php');
      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error('Error loading menu data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setPassword('');
      } else {
        setLoginError(data.error || 'Onjuist wachtwoord');
      }
    } catch (error) {
      setLoginError('Fout bij verbinding met server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout.php', { method: 'POST' });
      setIsLoggedIn(false);
      setMenuData(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSave = async () => {
    if (!menuData) return;
    
    setSaveStatus('saving');
    setSaveMessage('');

    try {
      const response = await fetch('/api/updateMenu.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuData)
      });

      const data = await response.json();

      if (data.success) {
        setSaveStatus('success');
        setSaveMessage('Data succesvol opgeslagen!');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setSaveMessage(data.error || 'Fout bij opslaan');
      }
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage('Fout bij verbinding met server');
    }
  };

  const updateOpeningHour = (id: number, uren: string) => {
    if (!menuData) return;
    
    setMenuData({
      ...menuData,
      openingsuren: menuData.openingsuren.map(hour =>
        hour.id === id ? { ...hour, uren } : hour
      )
    });
  };

  const updateMenuItem = (categoryIndex: number, itemIndex: number, field: 'name' | 'price' | 'unit', value: string) => {
    if (!menuData) return;
    
    const newMenu = [...menuData.menu];
    newMenu[categoryIndex].items[itemIndex] = {
      ...newMenu[categoryIndex].items[itemIndex],
      [field]: value
    };
    
    setMenuData({ ...menuData, menu: newMenu });
  };

  const deleteMenuItem = (categoryIndex: number, itemIndex: number) => {
    if (!menuData) return;
    if (!confirm('Weet je zeker dat je dit item wilt verwijderen?')) return;
    
    const newMenu = [...menuData.menu];
    newMenu[categoryIndex].items.splice(itemIndex, 1);
    
    setMenuData({ ...menuData, menu: newMenu });
  };

  const addMenuItem = (categoryIndex: number) => {
    if (!menuData) return;
    
    const newMenu = [...menuData.menu];
    const maxId = Math.max(
      ...menuData.menu.flatMap(cat => cat.items.map(item => item.id || 0)),
      0
    );
    
    newMenu[categoryIndex].items.push({
      id: maxId + 1,
      name: 'Nieuw item',
      price: '€0,00',
      unit: '/st'
    });
    
    setMenuData({ ...menuData, menu: newMenu });
  };

  const addCategory = () => {
    if (!menuData) return;
    
    const categoryName = prompt('Naam van nieuwe categorie:');
    if (!categoryName) return;
    
    const newMenu = [...menuData.menu, {
      title: categoryName,
      items: []
    }];
    
    setMenuData({ ...menuData, menu: newMenu });
  };

  const deleteCategory = (categoryIndex: number) => {
    if (!menuData) return;
    if (!confirm('Weet je zeker dat je deze categorie wilt verwijderen?')) return;
    
    const newMenu = [...menuData.menu];
    newMenu.splice(categoryIndex, 1);
    
    setMenuData({ ...menuData, menu: newMenu });
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-marine to-blue-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="flex justify-center mb-8">
            <div className="bg-marine/10 p-6 rounded-full">
              <Lock className="w-12 h-12 text-marine" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-marine text-center mb-2">Admin Login</h1>
          <p className="text-gray-600 text-center mb-8">De Wulk - Beheerportaal</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-marine focus:ring-2 focus:ring-marine/20 transition-all text-lg"
                placeholder="Vul wachtwoord in"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{loginError}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-marine text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Inloggen...
                </>
              ) : (
                'Inloggen'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-marine text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">De Wulk - Admin Dashboard</h1>
              <p className="text-blue-200 text-sm">Beheer menu en openingsuren</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              Uitloggen
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Save Button - Sticky */}
        <div className="sticky top-20 z-40 mb-6">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saveStatus === 'saving' ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Alles Opslaan
              </>
            )}
          </button>
          
          {saveStatus === 'success' && (
            <div className="mt-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{saveMessage}</span>
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{saveMessage}</span>
            </div>
          )}
        </div>

        {/* Openingsuren Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-marine mb-6">Openingsuren</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {menuData?.openingsuren.map((hour) => (
              <div key={hour.id} className="flex items-center gap-4">
                <label className="font-bold text-gray-700 w-32">{hour.dag}:</label>
                <input
                  type="text"
                  value={hour.uren}
                  onChange={(e) => updateOpeningHour(hour.id, e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-marine focus:ring-2 focus:ring-marine/20 transition-all"
                  placeholder="09:00 - 18:00"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-marine">Menu Items</h2>
            <button
              onClick={addCategory}
              className="flex items-center gap-2 bg-marine text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-all"
            >
              <Plus className="w-5 h-5" />
              Nieuwe Categorie
            </button>
          </div>

          <div className="space-y-8">
            {menuData?.menu.map((category, catIndex) => (
              <div key={catIndex} className="border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-marine">{category.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addMenuItem(catIndex)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Item Toevoegen
                    </button>
                    <button
                      onClick={() => deleteCategory(catIndex)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Categorie Verwijderen
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={item.id || itemIndex} className="grid md:grid-cols-12 gap-3 items-center bg-gray-50 p-4 rounded-xl">
                      <div className="md:col-span-5">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Naam</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateMenuItem(catIndex, itemIndex, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-marine focus:ring-1 focus:ring-marine/20"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Prijs</label>
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => updateMenuItem(catIndex, itemIndex, 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-marine focus:ring-1 focus:ring-marine/20"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Eenheid</label>
                        <input
                          type="text"
                          value={item.unit || ''}
                          onChange={(e) => updateMenuItem(catIndex, itemIndex, 'unit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-marine focus:ring-1 focus:ring-marine/20"
                          placeholder="/kg, /st"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end">
                        <button
                          onClick={() => deleteMenuItem(catIndex, itemIndex)}
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                          title="Item verwijderen"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Button */}
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saveStatus === 'saving' ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              Opslaan...
            </>
          ) : (
            <>
              <Save className="w-6 h-6" />
              Alles Opslaan
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
