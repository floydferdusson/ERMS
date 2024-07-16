<script setup>
import {usePlantillaStore} from "stores/PlantillaStore";
import {ref} from "vue";
import {useQuasar} from "quasar";
import {monthNames} from "src/f-utils";
import {useWorkExperienceStore} from "stores/f/PanelWorkExperienceStore";

const $q = useQuasar()
const store = usePlantillaStore()
const state = useWorkExperienceStore()
const dialogOptions = {
  delete: { cancel: true, persistent: true, title: "Confirm Delete" },
}; // dialogOptions
const columns = [
  { name: 'duration' },
  { name: 'position', label: 'POSITION', field: 'position', align: 'left' },
  { name: 'relevant', label: 'RELEVANT DETAILS', align: 'left' },
  { name: 'actions' },
]; // columns
const dialogCreateUpdate = ref(false)

async function attemptDelete (item) {
  $q.dialog({
    ...dialogOptions.delete,
    message: `Would you like to delete ${item.position} (${item.durationFrom}-${item.durationTo})?`,
  }).onOk(async () => {
    const i = store.workExperiences.indexOf(item)
    if (i !== -1) store.workExperiences.splice(i, 1)
    await store.deleteWorkExperience(item.id, (e) => {
      $q.notify({message: 'Failed to delete', type: 'negative'})
      store.workExperiences.splice(i, 0, item)
    })
  });
}

const emit = defineEmits(['printClick'])
</script>

<template>
<div class="column no-wrap" style="height: 414px; max-height: 414px; max-width: inherit">
  <div class="col column no-wrap" >
    <q-scroll-area class="fit col">
      <q-timeline class="q-pa-lg">
        <q-timeline-entry v-for="(it, i) in store.workExperiences" :key="`we${i}`" color="primary"
                          :subtitle="`${it.durationFrom} – ${it.durationTo}`">
          <template #title>
            <div class="row no-wrap items-center">
              <div class="col text-weight-bold">{{ it.position }}</div>
              <q-space />
              <div class="col-shrink row no-wrap">
                <div class="col q-pr-xs">
                  <q-btn flat round dense icon="edit" color="primary" size="md" @click="state.selectedExperience = [it]; dialogCreateUpdate = true">
                    <q-tooltip class="text-weight-bold" style="font-size: small"
                               anchor="bottom middle" self="top middle" :offset="[10, 2]">EDIT
                    </q-tooltip>
                  </q-btn>
                </div>
                <div class="col q-pr-xs">
                  <q-btn flat round dense icon="delete" color="negative" size="md" @click="attemptDelete(it)">
                    <q-tooltip class="text-weight-bold" style="font-size: small"
                               anchor="bottom middle" self="top middle" :offset="[10, 2]">DELETE
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-separator class="bg-primary q-mt-sm q-mb-xs" />
          </template>
          <div class="column no-wrap">
            <q-input :model-value="it.office" class="col" dense borderless label-slot readonly>
              <template #prepend><q-icon size="sm" color="primary" name="account_balance"/></template>
              <template #label><div class="text-weight-bold">OFFICE/UNIT</div></template>
            </q-input>
            <q-input :model-value="it.supervisor" class="col" dense borderless label-slot readonly>
              <template #prepend><q-icon size="sm" color="primary" name="perm_contact_calendar"/></template>
              <template #label><div class="text-weight-bold">IMMEDIATE SUPERVISOR</div></template>
            </q-input>
            <q-input :model-value="it.location" class="col" dense borderless label-slot readonly>
              <template #prepend><q-icon size="sm" color="primary" name="place"/></template>
              <template #label><div class="text-weight-bold">ORGANIZATION LOCATION</div></template>
            </q-input>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-scroll-area>
  </div>
</div>
<q-page-sticky position="bottom-right" class="z-max" :offset="[18, 8]">
  <div class="row no-wrap">
    <div class="col row items-center">
      <q-btn push round dense icon="print" color="primary" padding="sm" size="md"
             @click="emit('printClick')">
        <q-tooltip class="bg-accent text-white text-weight-bold" style="font-size: small"
                   anchor="top middle" self="bottom middle" :offset="[10, 2]">
          PRINT
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col q-pr-xs">
      <q-btn push round dense icon="add" color="primary" padding="sm" size="xl" @click="state.selectedExperience = []; dialogCreateUpdate = true">
        <q-tooltip class="bg-accent text-white text-weight-bold" style="font-size: small"
                   anchor="top middle" self="bottom middle" :offset="[10, 2]">
          ADD
        </q-tooltip>
      </q-btn>
    </div>

  </div>
</q-page-sticky>


<q-dialog v-model="dialogCreateUpdate">
  <q-layout container view="Lhh lpR fff" class="bg-white text-dark f-dialog1">
    <q-header>
      <q-toolbar>
        <q-icon name="edit" size="md"/>
        <q-toolbar-title>Work Experience</q-toolbar-title>
        <q-btn flat v-close-popup round dense icon="close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-px-none">
        <q-scroll-area class="items-stretch" style="height: 450px; max-height: 450px; max-width: inherit">
          <div class="row no-wrap q-pa-xs">
            <q-card class="col column shadow-2" bordered> <!-- region Duration From -->
              <div class="col-shrink q-pl-sm text-grey-7">Duration From:</div>
              <div class="col-auto row no-wrap items-center q-px-sm">
                <q-input class="col-sm-shrink col-xs" input-class="text-right" dense borderless type="number"
                         style="width: 80px; max-width: 80px" input-style="font-family: monospace"
                         label="Year" stack-label :max="new Date().getFullYear()"
                         v-model="state.form.fromYear">
                  <template #prepend><q-icon name="work_history"/></template>
                </q-input>
                <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                <q-select class="col-sm-grow col-xs q-pl-xs" dense borderless :options="monthNames" options-dense
                          transition-show="jump-down" transition-hide="jump-up"
                          label="Month" stack-label v-model="state.form.fromMonth"
                />
                <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical v-if="$q?.screen?.gt.xs"/>
                <q-input class="col-sm col-xs-0" input-class="text-right" type="number" dense borderless
                         input-style="font-family: monospace" style="max-width: 80px" min="1"
                         label="Date (optional)" stack-label placeholder="--"
                         v-model="state.form.fromDay"
                />
              </div>
              <div class="col-1 q-px-sm text-grey-7 full-width ellipsis" style="font-size: 0.8em; min-height: 1.5em">
                Please leave the field for 'Date' blanked out, if unsure
              </div><!-- endregion Duration From -->
            </q-card>
            <div class="col-shrink self-center q-px-xs">—</div>

            <q-card class="col column shadow-2" bordered><!-- region Duration To -->
              <div class="col-shrink row no-wrap q-pl-sm text-grey-7">
                <div>Duration To:</div><q-space/>
                <q-btn v-if="!state.form.isPresent" rounded flat dense padding="none sm"
                       icon="replay" size="sm" color="primary" label="Reset"
                       @click="state.form.isPresent = true"/>
              </div>
              <div v-if="state.form.isPresent" class="col-auto row no-wrap items-center q-px-sm">
                <q-checkbox v-model="state.form.isPresent" label="Present"/>
              </div>
              <div v-else class="col-auto row no-wrap items-center q-px-sm">
                <q-input class="col-sm-shrink col-xs" input-class="text-right" dense borderless type="number"
                         style="width: 80px; max-width: 80px" input-style="font-family: monospace"
                         label="Year" stack-label :max="new Date().getFullYear()"
                         v-model="state.form.toYear">
                  <template #prepend><q-icon name="work_history"/></template>
                </q-input>
                <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                <q-select class="col-sm-grow col-xs q-pl-xs" dense borderless :options="monthNames" options-dense
                          transition-show="jump-down" transition-hide="jump-up" label="Month" stack-label
                          v-model="state.form.toMonth" />
                <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical v-if="$q?.screen?.gt.xs"/>
                <q-input class="col-sm col-xs-0" input-class="text-right" type="number" dense borderless
                         input-style="font-family: monospace" style="max-width: 80px" min="1"
                         label="Date (optional)" stack-label placeholder="--"
                         v-model="state.form.toDay"
                />
              </div>
              <div v-if="!state.form.isPresent" class="col-1 q-px-sm text-grey-7 full-width ellipsis"
                   style="font-size: 0.8em; min-height: 1.5em">
                Please leave the field for 'Date' blanked out, if unsure
              </div><!-- endregion Duration To -->
            </q-card>

          </div>
          <q-select class="q-pa-xs" label="Position" dense outlined clearable
                    transition-show="jump-down" transition-hide="jump-up" hide-selected hide-dropdown-icon
                    use-input fill-input input-class="text-uppercase" input-debounce="500"
                    option-label="name" option-value="id" options-dense :options="state.positions"
                    v-model="state.form.position">
            <template #prepend><q-icon name="assignment_ind" /></template>
          </q-select>

          <q-input class="q-pa-xs" label="Office/Unit" clearable dense outlined autogrow
                    v-model="state.form.office">
            <template #prepend><q-icon name="account_balance" /></template>
          </q-input>

          <q-input class="q-pa-xs" label="Immediate Supervisor (include Position)" clearable dense outlined
                    v-model="state.form.supervisor">
            <template #prepend><q-icon name="perm_contact_calendar" /></template>
          </q-input>

          <q-input class="q-pa-xs" label="Organization Location" clearable dense outlined autogrow
                    v-model="state.form.location">
            <template #prepend><q-icon name="place" /></template>
          </q-input>
<!--          <pre>{{ !state.selectedExperience.length }} {{ !!state.selectedExperience.length }}</pre>-->
<!--          <pre>{{ state.selectedExperience }}</pre>-->

          <div style="height: 80px"/>
        </q-scroll-area>
      </q-page>

      <q-page-sticky position="bottom-right" class="z-max" :offset="[12, 14]">
        <q-btn :disable="state.isFormInvalid" push rounded label="Save Changes" icon="save" padding="md" color="primary"/>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</q-dialog>
</template>

<style scoped>
:deep(.q-timeline) .q-timeline__title {
  margin-bottom: 0;
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
