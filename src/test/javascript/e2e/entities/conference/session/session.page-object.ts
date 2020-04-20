import { element, by, ElementFinder } from 'protractor';

export class SessionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-session div table .btn-danger'));
  title = element.all(by.css('jhi-session div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class SessionUpdatePage {
  pageTitle = element(by.id('jhi-session-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('file_description'));
  startDateTimeInput = element(by.id('field_startDateTime'));
  endDateTimeInput = element(by.id('field_endDateTime'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setStartDateTimeInput(startDateTime: string): Promise<void> {
    await this.startDateTimeInput.sendKeys(startDateTime);
  }

  async getStartDateTimeInput(): Promise<string> {
    return await this.startDateTimeInput.getAttribute('value');
  }

  async setEndDateTimeInput(endDateTime: string): Promise<void> {
    await this.endDateTimeInput.sendKeys(endDateTime);
  }

  async getEndDateTimeInput(): Promise<string> {
    return await this.endDateTimeInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SessionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-session-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-session'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
