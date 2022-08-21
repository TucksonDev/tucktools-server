import { Controller, Get } from "@nestjs/common";

@Controller("healthcheck")
export class HealthcheckController {
    @Get("/")
    async index(): Promise<string> {
        return "OK";
    }
}
