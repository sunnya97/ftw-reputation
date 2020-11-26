import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', async function() {
    var results
    var web3 = window.web3

    var injected = (typeof web3 !== 'undefined')

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (injected) {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      if (web3.version.network != 3) {
        injected = false;
      } else {
        results = {
          web3: web3
        }
  
        console.log('Injected web3 detected.');
  
        resolve(results)
      }
    }

    if (!injected) {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/8896ec9242ae472aae0e50b0e48ebfc1')
      //var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
      window.fallback = true;

      web3 = new Web3(provider)

      results = {
        web3: web3,
        provider: provider
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
    }
  })
})

export default getWeb3
