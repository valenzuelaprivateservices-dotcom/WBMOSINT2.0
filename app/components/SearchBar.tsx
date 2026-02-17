'use client';
import { useState } from 'react';

interface SearchBarProps {
 onSearch: (username: string, keywords: string) => void;
 loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
 const [username, setUsername] = useState('');
 const [keywords, setKeywords] = useState('');
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 onSearch(username, keywords);
 };
 return (
 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 <span className="text-purple-400 text-xl font-bold">@</span>
 </div>
 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ingresa un usuario" disabled={loading} className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border-2 border-purple-500 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-slate-800 transition-all disabled:opacity-50" />
 </div>
 <div>
 <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="palabras clave (opcional) - separadas por comas" disabled={loading} className="w-full px-4 py-3 bg-slate-800/50 border-2 border-purple-500 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-slate-800 transition-all disabled:opacity-50" />
 </div>
 <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50" >
 {loading ? 'Buscando...' : 'Buscar'}
 </button>
 </form>
); }