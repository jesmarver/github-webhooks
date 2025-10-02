import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubService } from './presentation/services/github.service';
import { DiscordService } from './presentation/services/discord.service';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha253.middleware';

(() => {
    main();
})();


function main() {
    const app = express();

    const discordService= new DiscordService();
    const githubService = new GithubService();
    const controller = new GithubController(githubService, discordService);

    app.use(express.json());

    app.use(GithubSha256Middleware.verifyGithubSignature);

    app.post('/api/github', controller.webhookHandler)

    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`);
    });
}