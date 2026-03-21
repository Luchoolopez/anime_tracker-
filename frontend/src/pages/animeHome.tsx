import { AnimePanel } from "../components/anime/animePanel";
import { Navbar } from "../components/anime/navbar";
import { AnimeButtons } from "../components/anime/animeButtons";

export const AnimeHome = () => {
    return(
        <div className="anime-home">
            <Navbar />
            <AnimeButtons />
            <AnimePanel />

        </div>
    )
}