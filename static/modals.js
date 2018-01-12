(function () {
  const sdk = new window.PwSdk()
  const btn = document.getElementById('btn')
  btn.addEventListener('click', () => {
    sdk.informApp()
  }, false)
  const close = document.getElementById('close')
  close.addEventListener('click', () => {
    sdk.closeModal()
  }, false)

  const foo = sdk.getParameterByName('foo')
  const paramsP = document.getElementById('params')
  paramsP.innerHTML = `foo=${foo}`
})()
