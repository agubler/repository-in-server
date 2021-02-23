import * as AWS from 'aws-sdk';
import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';

const development = process.env.NODE_ENV === 'dev';

if (development) {
	AWS.config.update({ region: 'local' });
}

async function bootstrap() {
	try {
		$log.debug('Start server...');
		const server = await PlatformExpress.bootstrap(Server);

		await server.listen();
		$log.debug('Server initialized');
	} catch (er) {
		$log.error(er);
	}
}

bootstrap();
