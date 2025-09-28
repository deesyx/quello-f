import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useToolStore = defineStore('tool', {
    state: () => ({
        mode: false, // 浅色true、深色false
        modeString: 'dark', // 浅色true、深色false
        isLight: false,
    }),
    getters: {
    },
    actions: {
        toggleMode() {
            this.mode = !this.mode;
            if (this.mode) {
                this.modeString = 'light';
            } else {
                this.modeString = 'dark';
            }

            this.isLight = !this.isLight;
            this.applyTheme();

            // Save to localStorage whenever theme changes
            this.saveToLocalStorage();
        },
        applyTheme() {
            const theme = this.isLight ? 'light' :'dark' ;
            document.documentElement.setAttribute('data-theme', theme);
        },
        saveToLocalStorage() {
            localStorage.setItem('theme-isLight', JSON.stringify(this.isLight));
            localStorage.setItem('theme-mode', JSON.stringify(this.mode));
            localStorage.setItem('theme-modeString', this.modeString);
        },
        loadFromLocalStorage() {
            const savedIsLight = localStorage.getItem('theme-isLight');
            const savedMode = localStorage.getItem('theme-mode');
            const savedModeString = localStorage.getItem('theme-modeString');
            
            if (savedIsLight !== null) {
                this.isLight = JSON.parse(savedIsLight);
            }
            
            if (savedMode !== null) {
                this.mode = JSON.parse(savedMode);
            }
            
            if (savedModeString !== null) {
                this.modeString = savedModeString;
            }
            
            this.applyTheme();
        }
    }
})
