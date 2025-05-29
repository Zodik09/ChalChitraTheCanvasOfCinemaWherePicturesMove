// ✅ Clean version — no useRoutes
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TVShows from "../pages/TVShows";
import Movies from "../pages/Movies";
import Sports from "../pages/Sports";
import Search from "../pages/Search";
import NotFound from "../components/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tvShows" element={<TVShows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
