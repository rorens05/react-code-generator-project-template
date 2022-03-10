const Logger = {
  info: (message) => {
    console.log(`%c ${message} `, 'color: cyan; font-weight: bold;');
  }
}

export default Logger