import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home.jsx';
import NotFound from './src/pages/NotFound.jsx';
import Blog from './src/pages/Blog.jsx';
import BlogPost from './src/pages/BlogPost.jsx';
import Impressum from './src/pages/Impressum.jsx';
import Privacy from './src/pages/Privacy.jsx';

export default function App() {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <main className="min-h-screen w-full overflow-x-hidden bg-white text-zinc-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </main>
      </Router>
    </Theme>
  );
}