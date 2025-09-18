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
        },
        applyTheme() {
            const theme = this.isLight ? 'light' :'dark' ;
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
})
