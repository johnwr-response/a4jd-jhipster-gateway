import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SpeakerComponentsPage, SpeakerDeleteDialog, SpeakerUpdatePage } from './speaker.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Speaker e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let speakerComponentsPage: SpeakerComponentsPage;
  let speakerUpdatePage: SpeakerUpdatePage;
  let speakerDeleteDialog: SpeakerDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Speakers', async () => {
    await navBarPage.goToEntity('speaker');
    speakerComponentsPage = new SpeakerComponentsPage();
    await browser.wait(ec.visibilityOf(speakerComponentsPage.title), 5000);
    expect(await speakerComponentsPage.getTitle()).to.eq('Speakers');
    await browser.wait(ec.or(ec.visibilityOf(speakerComponentsPage.entities), ec.visibilityOf(speakerComponentsPage.noResult)), 1000);
  });

  it('should load create Speaker page', async () => {
    await speakerComponentsPage.clickOnCreateButton();
    speakerUpdatePage = new SpeakerUpdatePage();
    expect(await speakerUpdatePage.getPageTitle()).to.eq('Create or edit a Speaker');
    await speakerUpdatePage.cancel();
  });

  it('should create and save Speakers', async () => {
    const nbButtonsBeforeCreate = await speakerComponentsPage.countDeleteButtons();

    await speakerComponentsPage.clickOnCreateButton();

    await promise.all([
      speakerUpdatePage.setFirstNameInput('firstName'),
      speakerUpdatePage.setLastNameInput('lastName'),
      speakerUpdatePage.setEmailInput('email'),
      speakerUpdatePage.setTwitterInput('twitter'),
      speakerUpdatePage.setBioInput(absolutePath)
      // speakerUpdatePage.sessionsSelectLastOption(),
    ]);

    expect(await speakerUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await speakerUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await speakerUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await speakerUpdatePage.getTwitterInput()).to.eq('twitter', 'Expected Twitter value to be equals to twitter');
    expect(await speakerUpdatePage.getBioInput()).to.endsWith(fileNameToUpload, 'Expected Bio value to be end with ' + fileNameToUpload);

    await speakerUpdatePage.save();
    expect(await speakerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await speakerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Speaker', async () => {
    const nbButtonsBeforeDelete = await speakerComponentsPage.countDeleteButtons();
    await speakerComponentsPage.clickOnLastDeleteButton();

    speakerDeleteDialog = new SpeakerDeleteDialog();
    expect(await speakerDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Speaker?');
    await speakerDeleteDialog.clickOnConfirmButton();

    expect(await speakerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
