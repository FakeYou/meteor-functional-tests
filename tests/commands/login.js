exports.command = function(username, password) {
  return this
    .waitForElementVisible('body', 1000)
    .click('a.login-link-text')
    .waitForElementVisible('input#login-email', 1000)
    .setValue('input#login-email', username)
    .setValue('input#login-password', password)
    .click('#login-buttons-password')
    .waitForElementVisible('a#login-name-link', 1000);
};