<template>
  <scroll-pane scroll-event="action:emit">
    <action-header slot="header">
      <div class="search">
        <i class="search-icon material-icons">search</i>
        <input placeholder="Filter actions" v-model.trim="filter">
      </div>
      <a class="button reset" :class="{ disabled: !actions.length }" @click="reset" title="Clear Log">
        <i class="material-icons small">do_not_disturb</i>
        <span>Clear</span>
      </a>
      <a class="button toggle-recording" @click="toggleRecording" :title="enabled ? 'Stop Recording' : 'Start Recording'">
        <i class="material-icons small" :class="{ enabled }">lens</i>
        <span>{{ enabled ? 'Recording' : 'Paused' }}</span>
      </a>
    </action-header>
    <div slot="scroll" class="history">
      <div v-if="filteredActions.length === 0" class="no-actions">
        No actions found<span v-if="!enabled"><br>(Recording is paused)</span>
      </div>
      <div class="entry"
        v-else
        v-for="(action, index) in filteredActions"
        :class="{ active: inspectedIndex === actions.indexOf(action) }"
        @click="inspect(actions.indexOf(action))">
        <span class="action-name">{{ action.actionName }}</span>
        <span class="time">{{ action.timestamp | formatTime }}</span>
      </div>
    </div>
  </scroll-pane>
</template>

<script>
import ScrollPane from 'components/ScrollPane.vue'
import ActionHeader from 'components/ActionHeader.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ScrollPane,
    ActionHeader
  },
  computed: {
    filter: {
      get () {
        return this.$store.state.actions.filter
      },
      set (filter) {
        this.$store.commit('actions/UPDATE_FILTER', filter)
      }
    },
    ...mapState('actions', [
      'enabled',
      'actions',
      'inspectedIndex'
    ]),
    ...mapGetters('actions', [
      'filteredActions'
    ])
  },
  methods: mapMutations('actions', {
    inspect: 'INSPECT',
    reset: 'RESET',
    toggleRecording: 'TOGGLE'
  }),
  filters: {
    formatTime (timestamp) {
      return (new Date(timestamp)).toString().match(/\d\d:\d\d:\d\d/)[0]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../variables"

.no-actions
  color #ccc
  text-align center
  margin-top 50px
  line-height 30px

.entry
  position relative;
  font-family Menlo, Consolas, monospace
  color #881391
  cursor pointer
  padding 10px 20px
  font-size 12px
  background-color $background-color
  box-shadow 0 1px 5px rgba(0,0,0,.12)
  .action-name
    font-weight 600
  &.active
    color #fff
    background-color $active-color
    .time, .event-type, .component-name
      color lighten($active-color, 75%)
    .action-name
      color: #fff
    .action-source
      color #ddd
  .app.dark &
    color #e36eec
    background-color $dark-background-color

.time
  font-size 11px
  color #999
  float right
  margin-top 3px
</style>
