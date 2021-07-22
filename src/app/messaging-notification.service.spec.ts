import { TestBed } from '@angular/core/testing';

import { MessagingNotificationService } from './messaging-notification.service';

describe('MessagingNotificationService', () => {
  let service: MessagingNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
