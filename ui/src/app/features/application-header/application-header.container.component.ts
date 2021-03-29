/*
 * Copyright (c) 2020 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Application } from '../../data/interfaces/application';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ApplicationHeaderFacade } from './application-header.facade';

@Component({
  selector: 'app-application-header-container',
  template: `<app-application-header
    class="app-list-container__header"
    [app]="app$ | async"
    [isLoading]="isLoading$ | async"
    [userRole]="userRole$ | async"
    (rename)="rename($event)"
    (delete)="delete($event)"
  >
  </app-application-header>`,
})
export class ApplicationHeaderContainerComponent implements OnInit {
  app$: Observable<Application>;
  userRole$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  maxHeaderLinkLength = 25;

  constructor(private applicationHeaderFacade: ApplicationHeaderFacade, private dialog: MatDialog, private translate: TranslateService) {}

  ngOnInit() {
    this.applicationHeaderFacade.initSubscriptions();
    this.app$ = this.applicationHeaderFacade.app$;
    this.userRole$ = this.applicationHeaderFacade.userRole$;
    this.isLoading$ = this.applicationHeaderFacade.isLoadingAppList$;
  }

  rename(name: string): void {
    const dialog = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {
        entityType: this.translate.instant('applications.header.title'),
        entityName: name,
      },
    });

    dialog
      .afterClosed()
      .pipe(
        first(),
        filter(result => result)
      )
      .subscribe(result => this.applicationHeaderFacade.rename(result));
  }

  delete(name: string) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        entityType: this.translate.instant('applications.header.title'),
        entityName: name,
      },
    });

    dialog
      .afterClosed()
      .pipe(
        first(),
        filter(result => result)
      )
      .subscribe(() => this.applicationHeaderFacade.delete());
  }
}
