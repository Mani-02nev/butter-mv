import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CatalogProvider } from './context/CatalogContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { DownloadProvider } from './context/DownloadContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <CatalogProvider>
        <FavoritesProvider>
          <DownloadProvider>
            <AppRoutes />
          </DownloadProvider>
        </FavoritesProvider>
      </CatalogProvider>
    </BrowserRouter>
  );
}
