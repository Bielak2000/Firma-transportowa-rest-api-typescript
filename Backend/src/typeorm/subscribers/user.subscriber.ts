import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import {hashPassword} from "../../services/password";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {

    listenTo() {
        return UserEntity;
    }
    async beforeInsert(event: InsertEvent<UserEntity>) {
        const entity = event.entity!;
        if (entity.password) {
            entity.password = await hashPassword(
                entity.password,
            );
        }
    }
    async beforeUpdate(event: UpdateEvent<UserEntity>) {
        const entity = event.entity!;
        if (entity.password && entity.password !== event.databaseEntity.password) {
            entity.password = await hashPassword(
                entity.password,
            );
        }
    }
}
