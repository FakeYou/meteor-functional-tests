module.exports = {
  'Title': function testTitle(client) {
    client
      .url('http://127.0.0.1:3000')
      .waitForElementVisible('body', 1000)
      .assert.title('All Tomorrow\'s Parties');
  },

  'Create account': function testCreateAccount(client) {
    client
      .url('http://127.0.0.1:3000')
      .waitForElementVisible('body', 1000)
      .click('a.login-link-text')
      .waitForElementVisible('a#signup-link', 1000)
      .click('a#signup-link')
      .setValue('input#login-email', 'test@example.com')
      .setValue('input#login-password', 'tester')
      .click('#login-buttons-password')
      .waitForElementVisible('a#login-name-link', 1000)
      .assert.containsText('a#login-name-link', 'test@example.com')
  },

  'Logout': function testLogout(client) {
    client
      .url('http://127.0.0.1:3000')
      .waitForElementVisible('a.login-link-text', 1000)
      .click('a.login-link-text')
      .waitForElementVisible('.accounts-dialog', 1000)
      .click('#login-buttons-logout')
      .assert.containsText('.login-link-text', 'Sign in ▾');
  },

  'Create new party': function testCreateNewParty(client) {
    client
      .url('http://127.0.0.1:3000')
      .login('test@example.com', 'tester')
      .waitForElementVisible('.map', 100)
      .moveToElement('.map', 100, 100)
      .doubleClick()
      .waitForElementVisible('.modal input.title', 1000)
      .setValue('.modal input.title', 'Testing party')
      .setValue('.modal textarea.description', 'A party to test.')
      .click('a.btn.save')
      .waitForElementVisible('.details', 1000)
      .assert.containsText('.details h1', 'Testing party')
      .assert.containsText('.details .description', 'A party to test.');
  },

  'Rsvp to party': function testRsvpToParty(client) {
    client
      .url('http://127.0.0.1:3000')
      .waitForElementVisible('.rsvp-buttons', 1000)
      .click('input.btn.rsvp_yes')
      .assert.containsText('.attendance', 'test@example.com')
  },

  'Remove rsvp from party': function testRemoveRsvpToParty(client) {
    client
      .url('http://127.0.0.1:3000')
      .waitForElementVisible('.rsvp-buttons', 1000)
      .click('input.btn.rsvp_no')
      .assert.containsText('.attendance', 'test@example.com')
      .assert.containsText('.attendance .label:nth-child(1)', 'No')
  },

  'Delete party': function testDeleteParty(client) {
    client
      .url('http://127.0.0.1:3000')
      .waitForElementVisible('.alert', 1000)
      .click('.alert a.remove')
      .waitForElementVisible('.details .muted', 1000)
      .assert.containsText('.details .muted', 'Sign in and double click the map to post a party')
      .end();
  }
};