import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Caminhos relativos: o site funciona na raiz do domínio ou dentro de qualquer pasta da hospedagem.
  base: './',
});
