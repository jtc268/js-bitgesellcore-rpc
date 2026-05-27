
/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');
const should = require('should');

/**
 * Test package metadata and contributor-facing docs.
 */

describe('Package metadata', () => {
  it('should point package metadata at the official Bitgesell RPC client repository', () => {
    const metadata = require('../package.json'); // eslint-disable-line global-require
    const lock = require('../package-lock.json'); // eslint-disable-line global-require

    should(metadata.homepage).equal('https://github.com/BitgesellOfficial/js-bitgesellcore-rpc#readme');
    should(metadata.bugs).equal('https://github.com/BitgesellOfficial/js-bitgesellcore-rpc/issues');
    should(metadata.repository.url).equal('https://github.com/BitgesellOfficial/js-bitgesellcore-rpc.git');
    should(lock.name).equal(metadata.name);
    should(lock.version).equal(metadata.version);
    should(lock.packages[''].name).equal(metadata.name);
    should(lock.packages[''].version).equal(metadata.version);
  });

  it('should not document retired fork or Docker image URLs', done => {
    fs.readFile(path.join(__dirname, '..', 'README.md'), 'utf8', (error, readme) => {
      if (error) {
        done(error);

        return;
      }

      try {
        should(readme).not.containEql('github.com/naftalimurgor/bitgesell-core');
        should(readme).not.containEql('ruimarinho/bitgesell-core');
        should(readme).containEql('BitgesellOfficial/js-bitgesellcore-rpc');
        should(readme).containEql('port `8454`');
        should(readme).containEql('`BGL.conf`');
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    });
  });
});
