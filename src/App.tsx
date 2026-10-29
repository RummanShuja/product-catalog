import { Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import FeedbackPage from "./pages/FeedbackPage";
import SavedFeedbackPage from "./pages/SavedFeedbackPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="feedbacks" element={<SavedFeedbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
