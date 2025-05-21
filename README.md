# 🎬 ChalChitra: The Canvas of Cinema Where Pictures Move

> “From sketching pixels to fighting APIs, this is the journey of a developer who refused to back down.”

## 📌 The Vision

It all began with a wireframe — a bold, minimalist design sketched for my app **ChalChitra**, a modern cinematic experience built on top of the [TMDB API](https://www.themoviedb.org/documentation/api). 

I envisioned an elegant app with seamless genre filtering, detailed cast pages, modern transitions, and multiple languages — all powered by **React, TailwindCSS, Redux, and TMDB**.

## 🎨 The Design Phase

- Designed the core wireframes and layout using **Figma**, drawing inspiration from platforms like **IMDb, JioCinema, and Disney+**.
- Focused on **UI/UX patterns**, **clean typography**, **genre-based browsing**, and **responsive grid systems**.

## 💻 Development Arsenal

| Tool / Tech         | Purpose                                  |
|---------------------|------------------------------------------|
| React + Vite        | Frontend SPA Framework                   |
| Tailwind CSS        | Utility-first styling                    |
| TMDB API            | Core movie & TV data                     |
| Axios               | API calls with flexible error handling   |
| Redux Toolkit       | State management                        |
| React Router DOM    | Client-side routing                      |
| React Hook Form     | Form management                         |
| Cloudflare Workers  | Proxy server to bypass ISP limitations   |

## 🤕 The Obstacle

Everything worked great—**except on Jio SIM or broadband**.

> Turns out, **Jio blocks or throttles access to TMDB’s API**, causing my app to fail for a huge chunk of Indian users. I tested everything: changing IPs, using VPNs, tweaking headers, crying in the corner. Nothing worked.

## 🧠 The Breakthrough: Cloudflare Workers

I built a **Cloudflare Worker** to act as a secure, global **proxy** for all TMDB API requests.

### ✅ Features:
- Accepts `path` and `language` as query parameters
- Builds the TMDB API URL server-side
- Adds necessary headers (like CORS)
- Hides the API key from frontend
- Hosted serverlessly, no cold starts

### 🚀 Final Worker Code (Simplified):
```js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.searchParams.get('path');
    const language = url.searchParams.get('language') || 'en';

    if (!path) return new Response("Missing 'path'", { status: 400 });

    const TMDB_API_KEY = 'your_tmdb_key';
    const tmdbUrl = `https://api.themoviedb.org/3/${path}?api_key=${TMDB_API_KEY}&language=${language}`;

    const response = await fetch(tmdbUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
