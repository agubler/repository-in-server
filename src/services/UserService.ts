import { Service } from '@tsed/common';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async get() {
		await this.userRepository.save({});
		return this.userRepository.findAndCount();
	}
}
