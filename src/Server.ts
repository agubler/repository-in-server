import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import '@tsed/platform-express';
import '@tsed/swagger';
import '@tsed/typeorm';
import '@tsed/passport';
import { join } from 'path';
import { User } from './entities/User';
import { UserRepository } from './repositories/UserRepository';

export const rootDir = __dirname;

@Configuration({
	rootDir,
	httpPort: 3000,
	httpsPort: false,
	acceptMimes: ['application/json'],
	mount: {
		'/api/': [`${rootDir}/controllers/*Controller.{ts,js}`]
	},
	typeorm: [
		{
			type: 'mysql',
			name: 'default',
			host: process.env.databaseHost || 'localhost',
			port: parseInt(process.env.databasePort || '3306', 10),
			username: process.env.databaseUser || 'root',
			password: process.env.databasePassword || 'password',
			database: process.env.databaseName || 'test',
			entities: [join(__dirname, 'entities', '*.{ts,js}')],
			logging: ['schema', 'error', 'warn', 'info'],
			synchronize: true,
			dropSchema: false
		}
	],
	exclude: [`${rootDir}/**/*.spec.{js,ts}`, `${rootDir}/**/test/**/*`],
	logger: {
		logRequest: false,
		logStart: false,
		logEnd: false
	},
	swagger: [
		{
			path: '/api-docs',
			spec: {
				securityDefinitions: {
					'auth:basic': {
						type: 'basic'
					}
				}
			}
		}
	],
	passport: {
		userInfoModel: User
	}
})
export class Server {
	constructor(private userRepository: UserRepository) {}

	@Inject()
	app: PlatformApplication;

	$beforeRoutesInit() {
		// uncomment to see the repo working in the service
		// this.userRepository.save({});
	}
}
