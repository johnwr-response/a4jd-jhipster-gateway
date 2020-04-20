import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BlogComponentsPage, BlogDeleteDialog, BlogUpdatePage } from './blog.page-object';

const expect = chai.expect;

describe('Blog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogComponentsPage: BlogComponentsPage;
  let blogUpdatePage: BlogUpdatePage;
  let blogDeleteDialog: BlogDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Blogs', async () => {
    await navBarPage.goToEntity('blog');
    blogComponentsPage = new BlogComponentsPage();
    await browser.wait(ec.visibilityOf(blogComponentsPage.title), 5000);
    expect(await blogComponentsPage.getTitle()).to.eq('Blogs');
    await browser.wait(ec.or(ec.visibilityOf(blogComponentsPage.entities), ec.visibilityOf(blogComponentsPage.noResult)), 1000);
  });

  it('should load create Blog page', async () => {
    await blogComponentsPage.clickOnCreateButton();
    blogUpdatePage = new BlogUpdatePage();
    expect(await blogUpdatePage.getPageTitle()).to.eq('Create or edit a Blog');
    await blogUpdatePage.cancel();
  });

  it('should create and save Blogs', async () => {
    const nbButtonsBeforeCreate = await blogComponentsPage.countDeleteButtons();

    await blogComponentsPage.clickOnCreateButton();

    await promise.all([
      blogUpdatePage.setTitleInput('title'),
      blogUpdatePage.setAuthorInput('author'),
      blogUpdatePage.setPostInput('post')
    ]);

    expect(await blogUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await blogUpdatePage.getAuthorInput()).to.eq('author', 'Expected Author value to be equals to author');
    expect(await blogUpdatePage.getPostInput()).to.eq('post', 'Expected Post value to be equals to post');

    await blogUpdatePage.save();
    expect(await blogUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await blogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Blog', async () => {
    const nbButtonsBeforeDelete = await blogComponentsPage.countDeleteButtons();
    await blogComponentsPage.clickOnLastDeleteButton();

    blogDeleteDialog = new BlogDeleteDialog();
    expect(await blogDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Blog?');
    await blogDeleteDialog.clickOnConfirmButton();

    expect(await blogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
