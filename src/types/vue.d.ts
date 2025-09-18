// Vue component module augmentation
import type { DefineComponent } from 'vue';

declare module 'vue' {
  interface ComponentOptions {
    __file?: string;
  }
}

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}