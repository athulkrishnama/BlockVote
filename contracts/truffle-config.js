module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  compilers:{
    solc:{
      version: "0.8.13"
    }
  },
  
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id:5777
    }
  }
};
