import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecipesProvider} from './context/RecipeContext';
import { AuthContextProvider } from './context/AuthContext';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RecipesProvider>
      <App />
    </RecipesProvider>
  </AuthContextProvider>



);

