// ✅ Clean version — no useRoutes
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TVShows from "../pages/TVShows";
import Movies from "../pages/Movies";
import Sports from "../pages/Sports";
import Search from "../pages/Search";
import NotFound from "../components/NotFound";
import MovieDetails from "../pages/MovieDetails";
import Trailer from "../components/Trailer";
import TVShowDetails from "../pages/TVShowDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tvShows" element={<TVShows />} />
      <Route path="/tvShow/details/:id" element={<TVShowDetails />} />
      <Route path="/tvShow/details/:id/trailer" element={<Trailer />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/details/:id" element={<MovieDetails />} />
      <Route path="/movie/details/:id/trailer" element={<Trailer />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/search" element={<Search />} />
      {/* <Route path="/trending" element={<Trending />} /> */}
      {/* <Route path="/popular" element={<Popular />} /> */}
      {/* <Route path="/person" element={<Person />} /> */}
      {/* <Route path="/person/details/:id" element={<PersonDetails />} /> */}
      {/* <Route path="/genres" element={<Genres />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
