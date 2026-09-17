// dotme CLI Terminal Loop - Data & Configuration Constants
// Used by js/script.js and tests/dotme.test.mjs

export const DOTME_PROMPT = '[vinicius@CachyOS ~]$ ';

export const DOTME_COMMAND = 'dotme --include=".config*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles';

export const DOTME_OUTPUT_LINES = [
    { text: '🔄 Cloning repository: https://github.com/rsvinicius/dotfiles', className: 'text-[#8B949E]' },
    { text: '✅ Repository cloned, using branch: main', className: 'text-[#3FB950]' },
    { text: '📋 Scanning for dotfiles...', className: 'text-[#8B949E]' },
    { text: '📦 Summary:', className: 'mt-2 text-[#F9FAFB] font-semibold' },
    { text: '✅ Copied 1 item:', className: 'text-[#3FB950]' },
    { text: '   - .config', className: 'text-[#8B949E] pl-4' },
    { text: '❌ Ignored 7 items:', className: 'mt-1 text-[#F85149]' },
    { text: '   - disable_mouse_acceleration.sh, firewall.sh, fonts, install.sh (+3 scripts)', className: 'text-[#8B949E] pl-4' },
    { text: '🔍 Active filters:', className: 'mt-2 text-[#F9FAFB] font-semibold' },
    { text: '   Include patterns: [.config*]', className: 'text-[#8B949E] pl-4' },
    { text: '   Exclude patterns: [.DS_Store]', className: 'text-[#8B949E] pl-4' },
    { text: '🎉 Done! Your dotfiles have been applied successfully.', className: 'mt-2 text-[#3FB950] font-medium' }
];

export const DOTME_TIMINGS = {
    typewriterCadence: 35,
    streamingLineCadence: 120,
    holdDuration: 5000,
    restartDelay: 400
};
