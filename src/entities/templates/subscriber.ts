import {
  EventSubscriber,
  EntitySubscriberInterface,
  LoadEvent,
  Entity,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';

import { TransactionStartEvent } from 'typeorm/subscriber/event/TransactionStartEvent';
import { TransactionCommitEvent } from 'typeorm/subscriber/event/TransactionCommitEvent';
import { TransactionRollbackEvent } from 'typeorm/subscriber/event/TransactionRollbackEvent';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  // listenTo(){}

  afterLoad?(entity: typeof Entity, event?: LoadEvent<typeof Entity>) {}

  beforeInsert(event: InsertEvent<any>) {}

  afterInsert(event: InsertEvent<any>) {}

  beforeUpdate(event: UpdateEvent<any>) {}
  afterUpdate(event: UpdateEvent<any>) {}

  beforeRemove(event: RemoveEvent<any>) {}
  afterRemove(event: RemoveEvent<any>) {}

  beforeTransactionStart(event: TransactionStartEvent) {}
  afterTransactionStart(event: TransactionStartEvent) {}

  beforeTransactionCommit(event: TransactionCommitEvent) {}
  afterTransactionCommit(event: TransactionCommitEvent) {}

  beforeTransactionRollback(event: TransactionRollbackEvent) {}
  afterTransactionRollback(event: TransactionRollbackEvent) {}
}
