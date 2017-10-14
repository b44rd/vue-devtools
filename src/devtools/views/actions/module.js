import storage from '../../storage'

const ENABLED_KEY = 'ACTIONS_ENABLED'
const enabled = storage.get(ENABLED_KEY)

const state = {
  enabled: enabled == null ? true : enabled,
  actions: [],
  inspectedIndex: -1,
  newActionCount: 0,
  filter: ''
}

const mutations = {
  'RECEIVE_ACTION' (state, payload) {
    state.actions.push(payload)
    if (!state.filter) {
      state.inspectedIndex = state.actions.length - 1
    }
  },
  'RESET' (state) {
    state.actions = []
    state.inspectedIndex = -1
  },
  'INSPECT' (state, index) {
    state.inspectedIndex = index
  },
  'RESET_NEW_ACTION_COUNT' (state) {
    state.newActionCount = 0
  },
  'INCREASE_NEW_ACTION_COUNT' (state) {
    state.newActionCount++
  },
  'UPDATE_FILTER' (state, filter) {
    state.filter = filter
  },
  'TOGGLE' (state) {
    storage.set(ENABLED_KEY, state.enabled = !state.enabled)
    bridge.send('actions:toggle-recording', state.enabled)
  }
}

const getters = {
  activeAction: state => {
    return state.actions[state.inspectedIndex]
  },
  filteredActions: state => {
    return state.actions.filter(e => e.actionName.indexOf(state.filter) > -1)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
