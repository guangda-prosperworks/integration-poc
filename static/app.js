/* global axios */
(function () {

  if (window.top === window) {
    // return
  }

  const sdk = new window.PwSdk()

  const modalBtn = document.getElementById('modal')
  const modalParams = document.getElementById('modal-params')

  modalBtn.addEventListener('click', () => {
    sdk.showModal({
      foo: modalParams.value,
    })
  }, false)

  const fetchBtn = document.getElementById('fetch')

  fetchBtn.addEventListener('click', async function() {
    const data = await sdk.fetchData()
    sdk.log(data)
  }, false)

  const clearBtn = document.getElementById('clear')
  clearBtn.addEventListener('click', () => {
    sdk.clearLog()
  }, false)

  async function showConversations() {
    const data = await sdk.fetchData()
    const email = data.model.primary_email
    const resp = await axios({
      method: 'get',
      url: '/api/conversations', 
      params: { email },
    })
    sdk.log(resp.data)
  }

  showConversations()



})()
