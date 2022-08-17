import { NestFactory } from "@nestjs/core";
import { UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // CORS
    const allowedURLs: string = configService.get("CORS_ALLOWED_URLS");
    app.enableCors({
        // TODO: For some reason, I can't specify the allowed origins like this,
        // instead I have to do it with a function
        // origin: allowedURLs.split(","),
        origin: function (origin, callback) {
            if (!allowedURLs) {
                // console.log('ALLOWED URLS env option not set');
                callback(null, true);
                return;
            }

            if (allowedURLs.split(",").indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new UnauthorizedException(origin + " is not allowed by CORS"));
            }
        },
    });

    // Validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );

    // Start listening
    await app.listen(configService.get("PORT"));
}
bootstrap();
