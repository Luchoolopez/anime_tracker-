import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AnimeHome } from "../pages/animeHome";

export function AppRouter() {
    return(
        <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<AnimeHome />} />
        </Routes>
    )
}