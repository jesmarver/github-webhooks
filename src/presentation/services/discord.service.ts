import { envs } from "../../config";


export class DiscordService {
    constructor() { }

    private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

    async notify(message: string) {
        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: {url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVka2FqNGUzOHhpMHo3N2s0YTRsc2IyaWx5dnZsaDFzb3VwazVlOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wz8CXwI55oagxhIpnn/giphy.gif"}
            //     }
            // ]
        };

        const response = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body),
        });

        if(!response.ok){
            console.log('Error sending message to Discord');
            return false;
        }

        return true;
    }
}