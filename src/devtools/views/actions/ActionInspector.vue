<template>
  <scroll-pane>
    <div v-if="activeAction" slot="scroll">
      <state-inspector :state="{ 'action info': sortedActionsData }" />
    </div>
    <div v-else slot="scroll" class="no-action-data">
      No action selected
    </div>
  </scroll-pane>
</template>

<script>
import ScrollPane from 'components/ScrollPane.vue'
import ActionHeader from 'components/ActionHeader.vue'
import StateInspector from 'components/StateInspector.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    ScrollPane,
    ActionHeader,
    StateInspector
  },
  computed: {
    ...mapGetters('actions', [
      'activeActions'
    ]),
    sortedActionsData () {
      if (!this.activeAction) {
        return {}
      }
      return {
        name: this.activeAction.actionName,
        type: this.activeAction.type,
        source: '<' + this.activeEAction.instanceName + '>',
        payload: this.activeAction.payload
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../variables"

section:not(:last-child)
  border-bottom 1px solid $border-color
  .app.dark &
    border-bottom 1px solid $dark-border-color

.component-name
  margin 0 10px

.string
  color: #c41a16

.literal
  color: #03c

.no-action-data
  color: #ccc;
  text-align: center;
  margin-top: 50px;
  line-height: 30px;
</style>
