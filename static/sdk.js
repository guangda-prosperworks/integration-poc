(function () {

  class PwSdk {
    constructor() {
      this.origin = this.getParameterByName('origin')
      this.uuid = this.getParameterByName('uuid')
      this.deferred = {}

      window.addEventListener('message', event => {
        if (event.origin === this.origin) {
          if (this.deferred.fetchData) {
            this.deferred.fetchData.resolve(event.data)
            this.deferred.fetchData = null
          }
        }

        this.log(event.data.event)
      }, false)

      document.addEventListener('DOMContentLoaded', () => {
        this.logArea = document.createElement('div')
        this.logArea.id = 'log'
        document.body.appendChild(this.logArea)
      })
    }

    getParameterByName(name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }

    postMessage(message) {
      window.top.postMessage({
        uuid: this.uuid,
        iframeOrigin: location.origin,
        ...message,
      }, this.origin)
    }

    fetchData() {
      return new Promise((resolve) => {
        this.deferred.fetchData = { resolve }
        this.postMessage({
          event: 'fetchData',
        })
      })
    }

    showModal(params) {
      this.postMessage({
        event: 'showModal',
        params,
      })
    }

    closeModal() {
      this.postMessage({
        event: 'closeModal',
      })
    }

    log(data) {
      if (!this.logArea) return

      const p = document.createElement('p')
      p.innerHTML = JSON.stringify(data)
      this.logArea.appendChild(p)
    }

    clearLog() {
      if (!this.logArea) return

      this.logArea.innerHTML = ''
    }

    informApp() {
      this.postMessage({
        event: 'informApp',
      })
    }
  }

  window.PwSdk = PwSdk

})()
