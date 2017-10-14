<template>
  <div>
    <split-pane>
      <actions-history slot="left"></actions-history>
      <action-inspector slot="right"></action-inspector>
    </split-pane>
  </div>
</template>

<script>
import SplitPane from 'components/SplitPane.vue'
import ActionsHistory from './ActionsHistory.vue'
import ActionInspector from './ActionInspector.vue'

import { mapState } from 'vuex'

export default {
  computed: mapState('actions', [
    'enabled'
  ]),
  components: {
    SplitPane,
    ActionsHistory,
    ActionInspector
  }
}
</script>
