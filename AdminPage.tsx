import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Save, LogOut, Plus, Trash2, AlertCircle, CheckCircle, Loader, ArrowLeft } from 'lucide-react';
import { MenuCategory, OpeningHourData, MenuData, FavoriteItem } from './types';

// Admin password - stored in client-side code
// For a small business site, this is acceptable as it only protects against casual changes
// For higher security needs, consider implementing proper authentication with a backend
const ADMIN_PASSWORD = 'DeWulk2025!';
const GITHUB_REPO = 'kevinb42O/DeWulk_website';
const DATA_FILE_PATH = 'public/data.json';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [githubToken, setGithubToken] = useState('');
  
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Load current data from static JSON
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setMenuData({ menu: [], openingsuren: [], favorieten: [] });
      });

    // Check for stored token
    const stored = localStorage.getItem('gh_token');
    if (stored) setGithubToken(stored);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setPassword('');
    } else {
      setLoginError('Fout wachtwoord!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSave = async () => {
    if (!menuData) return;
    
    if (!githubToken) {
      setSaveStatus('error');
      setSaveMessage('❌ GitHub token is vereist! Zie instructies hieronder.');
      return;
    }

    setLoading(true);
    setSaveStatus('saving');
    setSaveMessage('');

    try {
      // Get current file SHA
      const fileRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!fileRes.ok) {
        const error = await fileRes.json();
        throw new Error(error.message || 'Kon data.json niet ophalen');
      }
      
      const fileData = await fileRes.json();
      const currentSha = fileData.sha;

      // Prepare new content
      const newContent = {
        menu: menuData.menu,
        openingsuren: menuData.openingsuren,
        favorieten: menuData.favorieten || []
      };
      // Encode to base64 with proper UTF-8 handling
      const contentString = JSON.stringify(newContent, null, 2);
      const encoder = new TextEncoder();
      const data = encoder.encode(contentString);
      const contentBase64 = btoa(String.fromCharCode(...new Uint8Array(data)));

      // Update file via GitHub API
      const updateRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Update menu en openingsuren via admin panel',
            content: contentBase64,
            sha: currentSha,
          }),
        }
      );

      if (!updateRes.ok) {
        const error = await updateRes.json();
        throw new Error(error.message || 'Update mislukt');
      }

      setSaveStatus('success');
      setSaveMessage('✅ Opgeslagen! Site wordt binnen 1-2 minuten bijgewerkt.');
      localStorage.setItem('gh_token', githubToken);

      setTimeout(() => {
        setSaveStatus('idle');
        setSaveMessage('');
      }, 5000);

    } catch (error: any) {
      console.error(error);
      setSaveStatus('error');
      setSaveMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
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
      name: '',
      price: '',
      unit: ''
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

  const updateFavorite = (index: number, field: 'name' | 'price', value: string) => {
    if (!menuData || !menuData.favorieten) return;
    
    const newFavorites = [...menuData.favorieten];
    newFavorites[index] = {
      ...newFavorites[index],
      [field]: value
    };
    
    setMenuData({ ...menuData, favorieten: newFavorites });
  };

  const deleteFavorite = (index: number) => {
    if (!menuData || !menuData.favorieten) return;
    if (!confirm('Weet je zeker dat je dit favoriet wilt verwijderen?')) return;
    
    const newFavorites = [...menuData.favorieten];
    newFavorites.splice(index, 1);
    
    setMenuData({ ...menuData, favorieten: newFavorites });
  };

  const addFavorite = () => {
    if (!menuData) return;
    
    const maxId = menuData.favorieten && menuData.favorieten.length > 0
      ? Math.max(...menuData.favorieten.map(f => f.id))
      : 0;
    
    const newFavorites = [
      ...(menuData.favorieten || []),
      {
        id: maxId + 1,
        name: '',
        price: ''
      }
    ];
    
    setMenuData({ ...menuData, favorieten: newFavorites });
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
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
                onKeyPress={(e) => e.key === 'Enter' && handleLogin}
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
              className="w-full bg-marine text-white py-4 rounded-xl font-bold text-lg hover:bg-salmon hover:text-marine transition-all"
            >
              Inloggen
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-marine">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Terug naar site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-marine text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Uitloggen
            </button>
          </div>
        </div>

        {/* GitHub Token Setup */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-lg mb-3">⚙️ GitHub Token (eenmalig instellen)</h3>
          <p className="text-sm text-gray-700 mb-3">
            Om wijzigingen op te slaan heb je een GitHub Personal Access Token nodig:
          </p>
          <ol className="text-sm text-gray-700 mb-4 space-y-1 ml-4 list-decimal">
            <li>Ga naar <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">github.com/settings/tokens</a></li>
            <li>Klik "Generate new token (classic)"</li>
            <li>Vink aan: <code className="bg-gray-200 px-2 py-1 rounded">repo</code> (volledige repo toegang)</li>
            <li>Kopieer de token en plak hieronder</li>
          </ol>
          <input
            type="password"
            placeholder="ghp_xxxxxxxxxxxx"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 font-mono text-sm"
          />
        </div>

        {/* Save Status */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-xl text-center font-semibold ${
            saveStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Openingsuren */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-marine mb-6">📅 Openingsuren</h2>
          <div className="space-y-4">
            {menuData?.openingsuren.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-32">{item.dag}:</span>
                <input
                  type="text"
                  value={item.uren}
                  onChange={(e) => updateOpeningHour(item.id, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-xl p-3"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-marine">🍤 Menu & Prijzen</h2>
            <button
              onClick={addCategory}
              className="flex items-center gap-2 bg-marine text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-all"
            >
              <Plus className="w-5 h-5" />
              Nieuwe Categorie
            </button>
          </div>

          {menuData?.menu.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                <button
                  onClick={() => deleteCategory(catIndex)}
                  className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700 transition-all text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Verwijder categorie
                </button>
              </div>
              
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={item.id || itemIndex} className="grid grid-cols-12 gap-3 items-center">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateMenuItem(catIndex, itemIndex, 'name', e.target.value)}
                      className="col-span-6 border border-gray-300 rounded-xl p-3"
                      placeholder="Naam"
                    />
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateMenuItem(catIndex, itemIndex, 'price', e.target.value)}
                      className="col-span-3 border border-gray-300 rounded-xl p-3"
                      placeholder="Prijs"
                    />
                    <input
                      type="text"
                      value={item.unit || ''}
                      onChange={(e) => updateMenuItem(catIndex, itemIndex, 'unit', e.target.value)}
                      className="col-span-2 border border-gray-300 rounded-xl p-3"
                      placeholder="/kg"
                    />
                    <button
                      onClick={() => deleteMenuItem(catIndex, itemIndex)}
                      className="col-span-1 bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addMenuItem(catIndex)}
                  className="text-marine font-semibold hover:underline"
                >
                  + Nieuw item toevoegen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Favorites */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-marine">⭐ Favorieten van 't huis</h2>
            <button
              onClick={addFavorite}
              className="flex items-center gap-2 bg-marine text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-all"
            >
              <Plus className="w-5 h-5" />
              Nieuw Favoriet
            </button>
          </div>

          <div className="space-y-3">
            {menuData?.favorieten?.map((favorite, index) => (
              <div key={favorite.id} className="grid grid-cols-12 gap-3 items-center">
                <input
                  type="text"
                  value={favorite.name}
                  onChange={(e) => updateFavorite(index, 'name', e.target.value)}
                  className="col-span-8 border border-gray-300 rounded-xl p-3"
                  placeholder="Naam (bijv. Paling in 't groen)"
                />
                <input
                  type="text"
                  value={favorite.price}
                  onChange={(e) => updateFavorite(index, 'price', e.target.value)}
                  className="col-span-3 border border-gray-300 rounded-xl p-3"
                  placeholder="Prijs (bijv. €49/kg)"
                />
                <button
                  onClick={() => deleteFavorite(index)}
                  className="col-span-1 bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {(!menuData?.favorieten || menuData.favorieten.length === 0) && (
            <p className="text-gray-500 text-center py-8">
              Geen favorieten toegevoegd. Klik op "Nieuw Favoriet" om te beginnen.
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="sticky bottom-6">
          <button
            onClick={handleSave}
            disabled={loading || saveStatus === 'saving'}
            className="w-full bg-marine text-white py-6 rounded-2xl font-black text-2xl hover:bg-salmon hover:text-marine transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading || saveStatus === 'saving' ? (
              <>
                <Loader className="w-8 h-8 animate-spin" />
                Bezig met opslaan...
              </>
            ) : (
              <>
                <Save className="w-8 h-8" />
                💾 ALLES OPSLAAN
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
