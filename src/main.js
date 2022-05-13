import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClose, faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faClose, faAngleRight)

createApp(App)
.component('fa', FontAwesomeIcon)
.mount('#app')

