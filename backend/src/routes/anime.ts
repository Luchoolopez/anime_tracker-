import { Router } from "express";
import { AnimeController } from "../controllers/anime.controller";
import { AnimeService } from "../services/anime.service";
import { upload } from "../middlewares/multer.middleware";

const animeRouter = Router();
const animeService = new AnimeService();
const animeController = new AnimeController(animeService);

animeRouter.post("/", upload.single('image'), animeController.createAnime);
animeRouter.get("/:usuarioId", animeController.getAnimesByUserId);
animeRouter.put("/:animeId", animeController.updateAnime);
animeRouter.delete("/:animeId", animeController.deleteAnime);
animeRouter.patch("/:animeId/capitulo", animeController.updateCapituloEstado);

export default animeRouter;
export { animeRouter as router };