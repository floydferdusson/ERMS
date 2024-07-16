<script setup>
import {computed, ref} from "vue";
import {usePanelBrowsePositionsStore} from "stores/f/PanelBrowsePositionsStore";
import {splitStringWithParentheses} from "src/f-utils";
import {useQuasar} from "quasar";

const $q = useQuasar()
const state = usePanelBrowsePositionsStore()
const pagination = ref({ rowsPerPage: 0 })
function highlightText (target, text) {
  const [ main, sub ] = splitStringWithParentheses(text)
  const highlight = (text) => text.replace(target, (match) => `<span class="bg-teal-2">${match}</span>`)
  if (!sub) return highlight(main);
  return `<div>${highlight(main)}</div><div class="text-grey-7">${highlight(sub)}</div>`;
}

const columns = [
  { name: 'item', label: '#', field:'itemNumber', align: 'right' },
  { name: 'position', label: 'Position Title', field: 'name', align: 'left' },
  { name: 'office', label: 'Office', field:'officeName', align: 'left' },
  { name: 'actions', align: 'center' },
];
const iconColor = ref({
  office: 'grey-7',
  position: 'grey-7',
});

const visibleColumns = computed(() => {
  const temp = [ 'item', 'position', 'office' ]
  if ($q.platform.is.mobile && !!state.filterOfficeVal) temp.pop()
  temp.push('actions')
  return temp
})

const emit = defineEmits(['itemClick'])
</script>

<template>
<q-page>
  <div class="column no-wrap bg-grey-4 q-py-sm" style="height: 450px; max-height: 450px; max-width: inherit">
    <div class="col-shrink q-px-sm row items-start" :class="'q-pb-' + ($q.platform.is.mobile? 'xs': 'sm')">
      <q-skeleton v-if="state.loadingOffices" class="col-12 bg-grey-6" type="QInput"/>
      <q-select v-else class="col-12" bg-color="white" dense outlined hide-dropdown-icon hide-selected clearable
                use-input fill-input input-class="text-uppercase" input-debounce="0" placeholder="ALL OFFICES"
                transition-show="jump-down" transition-hide="jump-up"
                @focus="iconColor.office = 'primary'" @blur="iconColor.office = 'grey-7'"
                v-model="state.filterOfficeVal" @filter="state.filterOffices"
                @update:model-value="(v) => state.filterOfficeVal = v?.name"
                :options="state.offices" option-label="name"
                popup-content-style="height: 220px">
        <template #prepend><q-icon name="filter_alt" :color="iconColor.office"/></template>
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section><div v-html="highlightText(state.filterOfficeStr, scope.opt.name)"/></q-item-section>
          </q-item>
        </template>
        <template #no-option>
          <q-item><q-item-section class="text-italic text-grey">No matching offices</q-item-section></q-item>
        </template>
      </q-select>
    </div>

    <div class="col-shrink q-px-sm row no-wrap" :class="'q-pb-' + ($q.platform.is.mobile? 'xs': 'sm')">
      <q-skeleton v-if="state.loadingPositions" class="col-12 bg-grey-6" type="QInput"/>
      <q-input v-else class="col-12" bg-color="white" dense outlined standout placeholder="Search by Position" clearable
               @focus="iconColor.position = 'primary'" @blur="iconColor.position = 'grey-7'"
               :model-value="state.filterPositionVal"
               @update:model-value="(v) => state.filterPositionVal = v?.toUpperCase()">
        <template #prepend><q-icon name="search" :color="iconColor.position"/></template>
      </q-input>
    </div>

    <div class="col q-px-sm q-pb-sm row no-wrap">
      <q-skeleton v-if="state.loadingPositions" class="col-12 bg-grey-6 fit"/>
      <q-table bordered v-else class="col-12 my-sticky-virtscroll-table" table-header-class="text-uppercase" wrap-cells
               virtual-scroll :rows-per-page-options="[0]" v-model:pagination="pagination" hide-pagination dense
               :rows="state.positions" :columns="columns" :visible-columns="visibleColumns"
               @row-click="(evt, row, index) => emit('itemClick', row)">
        <template #body-cell-position="props">
          <q-td :props="props"><div v-html="highlightText(state.filterPositionVal, props.value)"/></q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn padding="xs" icon="info" color="primary" dense rounded flat
                   @click="emit('itemClick', props.row)"/>
          </q-td>
        </template>
      </q-table>
    </div>

  </div>
</q-page>
</template>

<style scoped>
:deep(.q-select) .q-field__native > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.f-dialog1 {
  height: 500px;
  min-height: 300px;
  max-height: 500px;
  width: 700px;
  max-width: 1000px;
  min-width: 320px;
}
</style>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: $primary
    color: white

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
