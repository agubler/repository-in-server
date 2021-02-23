import { Controller, Get, Req } from '@tsed/common';
import { UserService } from '../services/UserService';

@Controller('/test')
export class TestController {
	constructor(private userService: UserService) {}

	@Get()
	test(@Req() _req: Req) {
		return this.userService.get();
	}
}
