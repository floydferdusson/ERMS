<script setup>

import {useLibrariesStore} from "stores/f/LibrariesStore";
import {onMounted, ref} from "vue";
import {useUserStore} from "stores/f/UserStore";
import {useTrainingsStore} from "stores/f/PanelTrainingsStore";

const libraries = useLibrariesStore()
const user = useUserStore()
const crud = useTrainingsStore()

const loading = ref({
  selectCategories : !libraries.iosCategories.length,
  selectPositions  : !libraries.iosPositions.length,
  selectTrainings  : !crud.categorizedTrainings.length,
  infoCategory  : false,
  dataTrainings : true,
})
const info = ref(null)

const form = ref({
  selectedCategorizedTraining: [],
  ios : null,
})

const select = ref(null)
const scrollInfo = ref(null)
const pagination = ref({ rowsPerPage: 0 })
onMounted(async () => {

  await new Promise(resolve => setTimeout(resolve, 2000))
  await libraries.getIosCategories(() => {
    loading.value.selectCategories = false
  })
  await crud.getTrainings(() => {})
})

async function getIosCategoriesLevel2 (general) {
  loading.value.infoCategory = true
  await libraries.getIosCategoriesLevel2(general, () => {
    loading.value.infoCategory = false
  })
  crud.filterTrainings = general
}
const table = {
  trainings: [ { field: 'title', align: 'left', style: 'text-transform: uppercase'  } ],
}
</script>

<template>
<div class="row no-wrap" style="height: 380px; max-height: 380px; max-width: inherit">

  <!-- region LEFT SECTION -->
  <div class="col column no-wrap q-pr-sm q-py-xs">
    <!-- region HEADER -->
    <div class="col-1 row items-center">
      <div class="text-subtitle1 text-weight-bolder ellipsis">L&D Programs Attended</div>
    </div>
    <q-separator color="primary" /> <!-- endregion HEADER -->

    <!-- region UNCATEGORIZED TRAININGS -->
    <div class="col-11 column no-wrap q-pt-sm">
      <q-skeleton v-if="crud.loading" class="col-12 bg-grey-5"/>
      <q-table v-else :rows="crud.uncategorizedTrainings" :columns="table.trainings"
               class="col-12 bg-grey-3" dense virtual-scroll wrap-cells
               hide-header :rows-per-page-options="[0]"
               hide-pagination :pagination="pagination"
               v-model:selected="crud.selectedUncategorizedTrainings" selection="multiple">
      </q-table>
    </div> <!-- endregion UNCATEGORIZED TRAININGS -->

  </div> <!-- endregion LEFT SECTION -->

  <!-- region VERTICAL BUTTON BAR -->
  <div class="col-2 column no-wrap justify-end q-py-xs" style="max-width: 40px">
    <q-btn dense icon="chevron_left" color="primary" padding="lg none" class="q-ma-xs"
           :disable="loading.selectCategories || !form.ios || crud.loading || !form.selectedCategorizedTraining.length"
           @click="() => {
             crud.deleteTraining(form.selectedCategorizedTraining, () => {})
             form.selectedCategorizedTraining = []
           }"/>
    <q-btn dense icon="chevron_right" color="primary" padding="lg none" class="q-ma-xs"
           :disable="loading.selectCategories || !form.ios || crud.loading || !crud.selectedUncategorizedTrainings.length"
           @click="() => {
             crud.createTraining(crud.selectedUncategorizedTrainings, () => {})
             crud.selectedUncategorizedTrainings = []
           }"/>
  </div> <!-- endregion VERTICAL BUTTON BAR -->

  <!-- region RIGHT SECTION -->
  <div class="col column no-wrap q-pl-sm q-py-xs">
    <!-- region CUSTOM SELECT -->
    <div class="col-1 row items-start">
      <div class="col-shrink relative-position full-width" style="height: fit-content">
        <div class="absolute full-width bg-white" style="z-index: 7; max-height: 40px; height: 40px"/>
        <q-input dense outlined v-model="form.ios" style="z-index: 8; max-height: 100%; height: 100%" placeholder="Filter by Category"
                 :disable="loading.selectCategories" class="absolute full-width"
                 clearable @clear="form.ios = null; select?.showPopup()"
                 @click="select?.showPopup()">
          <template #prepend><q-icon name="filter_alt" /></template>
        </q-input>
        <q-select ref="select" dense outlined use-input class="absolute full-width" hide-selected clearable
                  v-model="form.ios" @update:model-value="getIosCategoriesLevel2"
                  :disable="loading.selectCategories" popup-content-style="width: 100px; height: 220px"
                  :options="libraries.iosCategoriesLevel1" option-label="value" emit-value>
        </q-select>
      </div>
    </div> <!-- endregion CUSTOM SELECT -->

    <!-- region RELEVANT IOS INFORMATION -->
    <div v-if="!!form.ios" class="col-5 column no-wrap q-pt-md">
      <q-skeleton v-if="loading.infoCategory" class="col-12 bg-grey-5"/>
      <q-card v-else class="col column no-wrap bg-grey-3">
        <q-card-section class="col column no-wrap q-px-none q-py-xs">
          <q-scroll-area ref="scrollInfo" class="col column no-wrap">
            <ul class="q-ma-none q-px-lg">
              <li v-for="(it, i) in libraries.iosCategoriesLevel2" :key="`iosLv2${i}`">{{ it }}</li>
            </ul>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div> <!-- endregion RELEVANT IOS INFORMATION -->

    <!-- region CATEGORIZED TRAININGS -->
    <div class="col-6 column no-wrap" :class="!!form.ios ? 'col-6 q-pt-sm':'col-11 q-pt-md'">
      <q-skeleton v-if="crud.loading" class="col-12 bg-grey-5"/>
      <q-table v-else-if="!!form.ios && !crud.loading" :rows="crud.categorizedTrainings" :columns="table.trainings"
               class="col-12 bg-grey-3" dense virtual-scroll wrap-cells
               hide-header :rows-per-page-options="[0]"
               hide-pagination :pagination="pagination"
               v-model:selected="form.selectedCategorizedTraining" selection="multiple">

      </q-table>
      <q-card v-else class="col-12 bg-grey-5"/>
    </div> <!-- endregion CATEGORIZED TRAININGS -->

  </div> <!-- endregion RIGHT SECTION -->

</div>
</template>

<style scoped>
:deep(.q-select) .q-field__native > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
