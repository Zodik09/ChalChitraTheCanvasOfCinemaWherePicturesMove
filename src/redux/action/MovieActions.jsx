import axios from "axios";
import { useEffect } from "react";
// export { removeMovies } from "../counter/moviesSlice";
// import { loadMovies } from "../counter/moviesSlice";

export const MovieActions = () => {
    try {
        useEffect(() => {
            const fetchMovies = async () => {
                try {
                    const res = await axios.get(
                        "https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev?path=discover/movie",
                        {
                            params: {
                                path: "movie/popular",
                                language: "en",
                            },
                        }
                    );
                    const data = res.data;
                    console.log(data.results);
                } catch (err) {
                    console.error("Worker fetch failed", err);
                }
            };
            fetchMovies();
        }, []);
    } catch (error) {
        console.log("Error: ", error.message);
    }
};

// const details = await axios.get(`/movie/${id}`);
//     const externalIds = await axios.get(`/movie/${id}/external_ids`);
//     const recommendations = await axios.get(`/movie/${id}/recommendations`);
//     const similar = await axios.get(`/movie/${id}/similar`);
//     const videos = await axios.get(`/movie/${id}/videos`);
//     const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
//     let allMovieDetails = {
//       details: details.data,
//       externalIds: externalIds.data,
//       recommendations: recommendations.data.results,
//       similar: similar.data.results,
//       videos: videos.data.results.filter(
//         (v) =>
//           v.type.toLowerCase() === "trailer" &&
//           (v.name.toLowerCase() === "official trailer" ||
//             "trailer" ||
//             "final trailer")
//       ),
//       watchProviders: watchProviders.data.results.IN,
//     };
//     dispatch(loadMovies(allMovieDetails));
