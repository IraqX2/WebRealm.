
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">WebRealm</Link>
            <p className="max-w-xs mb-8 text-sm leading-relaxed">
              Crafting premium, high-performance websites for modern brands. We prioritize technical excellence, security, and elite conversion design.
            </p>
            <div className="flex space-x-6">
              {/* Facebook */}
              <a href="#" className="text-slate-500 hover:text-blue-500 transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.615 6.771 6.981 6.97 1.28.059 1.689.072 4.947.072s3.667-.013 4.947-.072c4.351-.2 6.77-2.614 6.97-6.97.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.352-2.612-6.77-6.97-6.97C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-slate-500 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Hub</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home Base</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-400 transition-colors">Work Gallery</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing Tiers</Link></li>
              <li><Link to="/order" className="hover:text-blue-400 transition-colors">Start Project</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="https://iraqhome.netlify.app/#home" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Builder Portfolio</a></li>
              <li><a href="https://wa.me/8801939888381" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase font-bold">
          <p>© {new Date().getFullYear()} WebRealm. Elite Digital Standards.</p>
          <p className="mt-4 md:mt-0 text-slate-600">Pure Custom Code. No Templates.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
