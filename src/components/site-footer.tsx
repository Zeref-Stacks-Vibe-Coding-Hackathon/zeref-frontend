import { Twitter, Github, MessageCircle } from "lucide-react";
import { copy } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-sora font-light text-slate-900 mb-4 tracking-wide">{copy.site.brand}</h3>
            <p className="text-slate-500 font-light text-sm max-w-xs leading-relaxed">
              Next-generation cross-chain yield optimization protocol
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-sora font-light text-slate-900 mb-4">Protocol</h4>
            <ul className="space-y-3">
              {copy.nav.links.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-slate-500 hover:text-slate-900 transition-colors font-light text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-sora font-light text-slate-900 mb-4">Open App</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <ul className="space-y-3">
              {copy.footer.links.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-slate-500 hover:text-slate-900 transition-colors font-light text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm font-light">
            {copy.footer.copyright}
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-400 text-sm font-light">Protocol Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}