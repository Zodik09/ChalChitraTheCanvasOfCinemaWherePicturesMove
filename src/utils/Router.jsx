// ✅ Clean version — no useRoutes
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import TVShows from "../components/TVShows";
import Movies from "../components/Movies";
import Sports from "../components/Sports";
import Search from "../components/Search";
import NotFound from "../components/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tvShows" element={<TVShows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} /> {/* catch-all at the end */}
    </Routes>
  );
};

export default Router;
