import { EntitySubscriberInterface, InsertEvent, SoftRemoveEvent, UpdateEvent } from "typeorm";
export declare class AuditSubscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<any>): void;
    beforeUpdate(event: UpdateEvent<any>): void;
    afterSoftRemove(event: SoftRemoveEvent<any>): Promise<any>;
}
