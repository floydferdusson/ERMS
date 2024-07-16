<script setup>
import {computed, onMounted, ref, watch} from "vue"
import {useQuasar} from "quasar"
import {usePlantillaStore} from "stores/PlantillaStore"
import {useLoginStore} from "stores/LoginStore"
import DocumentApplication from "components/DocumentApplication.vue"
import DocumentDataPrivacy from "components/DocumentDataPrivacy.vue"
import {jsPDF} from "jspdf"
import DocumentWorkExperience from "components/DocumentWorkExperience.vue"
import html2canvas from "html2canvas"
import DocumentPersonalData from "components/DocumentPersonalData.vue";
import {createDate, getMaxDateOfMonth, monthNames, padLeadingZero, splitStringWithParentheses} from "src/f-utils";
import PanelTrainings from "components/f/PanelTrainings.vue";
import PanelBrowsePositions from "components/f/PanelBrowsePositions.vue";
import {isDevServer, server} from "boot/axios";

//--------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ INITIAL SETUP -----------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
const $q = useQuasar()
const user = useLoginStore()
const store = usePlantillaStore()

onMounted(async () => {
  await store.getOrganizationalData();
  await store.getProspectPositions(user.controlno);
  await store.getIsPublishPeriod();
}); // onMounted

const dialogOptions = {
  delete: { cancel: true, persistent: true, title: "Confirm Delete" },
}; // dialogOptions
const notifyOptions = {
  success: { icon: "thumb_up", position: "center", timeout: 1000 },
  warning: {
    icon: "report",
    position: "center",
    timeout: 1800,
    color: "warning",
    textColor: "dark",
  },
};
const applicantInfo = computed(() => {
  const {
    Firstname: givenName,
    MIddlename: middleName,
    Surname: familyName,
    designation: position,
    Office: office,
    SG: salaryGrade,
  } = user.userinfo[0];
  return { givenName, familyName, middleName, position, office, salaryGrade };
}); // applicantInfo
//--------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------- UI STATE --------------------------------------------------------//
//region--------------------------------------------------------------------------------------------------------------//
const isProspect = ref(false)
const isDuties = ref(false)
const filteredIndexedPositions = ref(store.indexedPositions) // see filterIndexedPositionsFn()
const openedPosition = ref({})
const openedWorkExperience = ref({})
const editingWorkExperience = ref({
  isOthers: false,
});

const editingWesDuration = ref({})
const dialog = ref({})
const loading = ref({
  btnApply: false,
  wesMoreInfo: false,
}); // loading
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 20,
  // rowsNumber : 10,
}); // pagination
const tabs = ref({
  prospect: 'qualifications',
  printPreview: !!store.countApplicationPositions && store.countApplicationPositions > 0 ? 'applicationForm': 'personalDataSheet',
}); // tabs
const wesForm = ref({
  position: "",
  status: "",
  office: "",
  supervisor: "",
  location: "",
}); // wesForm
const wesFormDurationFrom = ref({
  month: monthNames[0],
  date: null,
  year: new Date().getFullYear(),
});
const wesFormDurationTo = ref({
  month: monthNames[0],
  date: null,
  year: new Date().getFullYear(),
});

/* internal */ function mapDurationToForm ({ durationFrom, durationTo }) {
  const { month: fMonth, date: fDate, year: fYear } = createDate(durationFrom).values;
  // console.log('DEBUG from', createDate(durationFrom).values);
  const temp = createDate(durationTo).values;
  const { month: tMonth, date: tDate, year: tYear } = (!!temp.error) ? {
    month: 1, date: null, year: new Date().getFullYear(),
  } : { month: temp.month, date: temp.date, year: temp.year };
  // console.log('DEBUG to', createDate(durationTo).values);
  editingWesDuration.value = {
    fMonth: monthNames[fMonth], fDate, fYear,
    tMonth: monthNames[tMonth], tDate, tYear,
    isPresent: durationTo.includes('Present'),
  };
}

/* internal */ function mapDuration ({ date, year, month: strMonth }) {
  const month = monthNames.indexOf(strMonth);
  return `${padLeadingZero(month+1)}/${date? padLeadingZero(date):'01'}/${year}`;
}

const wesFormDurationFromStr = computed(() => {
  return mapDuration(wesFormDurationFrom.value);
});
const wesFormDurationToStr = computed(() => {
  return mapDuration(wesFormDurationTo.value);
});
const wesEditDurations = computed(() => {
  const { fMonth, fDate, fYear, tMonth, tDate, tYear } = editingWesDuration.value;
  return [
    mapDuration({ date: fDate, year: fYear, month: fMonth }),
    mapDuration({ date: tDate, year: tYear, month: tMonth }),
  ];
});

const checked = ref({
  untilPresent: true,
  isOthers: false,
});
const expanded = ref({
  wesForm: false,
}); // expanded
const inputWesMoreInfo = ref("");
const isWesFormInvalid = computed(() => {
  const { position, office, supervisor, location } = wesForm.value;
  return [ position, office, supervisor, location ].some((value) => !value);
});
const maxDateOfMonthDurationTo = computed(() => {
  const { year, month } = wesFormDurationTo.value;
  return getMaxDateOfMonth(year, monthNames.indexOf(month));
});
const maxDateOfMonthDurationFrom = computed(() => {
  const { year, month } = wesFormDurationFrom.value;
  return getMaxDateOfMonth(year, monthNames.indexOf(month));
});
function editIsOthers (position) {
  const list = Object.values(filteredIndexedPositions.value).map(({ name }) => name);
  console.log('DEBUG editIsOthers', !list.includes(position), list.indexOf(position), { position, list});
  return !list.includes(position);
}
//endregion-----------------------------------------------------------------------------------------------------------//
//------------------------------------------------ STYLE-RELATED -----------------------------------------------------//
//region--------------------------------------------------------------------------------------------------------------//
function colorize({ value }) {
  switch (value) {
    case "PENDING":
      return "warning";
    case "QUALIFIED":
      return "positive";
    case "UNQUALIFIED":
      return "negative";
  }
}
//endregion-----------------------------------------------------------------------------------------------------------//
//----------------------------------------------- USER INTERACTION ---------------------------------------------------//
//region--------------------------------------------------------------------------------------------------------------//
function filterIndexedPositionsFn(val, update, abort) {
  update(() => {
    const byName = position => position.name.indexOf(val.toUpperCase()) > -1
    filteredIndexedPositions.value = val === '' ? store.indexedPositions : store.indexedPositions.filter(byName);
  });
}

async function createProspect(position) {
  await store.createProspectPosition(
    { controlno: user.controlno, id: position.id },
    async (r) => {
      await store.getProspectPositions(user.controlno);
      $q.notify({
        ...notifyOptions.success,
        message: "Added to application list",
      });
    } // onSuccess
  ); // store.createProspect
  setTimeout(() => (loading.value["btnApply"] = false), 800);
}

function deleteProspect({ row: item }) {
  $q.dialog({
    ...dialogOptions.delete,
    message: `Would you like to delete your application for ${item.name}?`,
  }).onOk(async () => {
    const i = store.prospectPositions.indexOf(item);
    if (i !== -1) store.prospectPositions.splice(i, 1); // remove item from client list, optimistic
    await store.deleteProspectPosition(item.id, (e) => {
      $q.notify({ message: "Failed to delete", type: "negative" });
      store.prospectPositions.splice(i, 0, item); // return item to client lift, if fail
    });
  });
}

// TODO implement reordering
async function sortProspectPositions (isUpwards, item) {
  await store.reorderProspectPosition(user.controlno, isUpwards? 'UP': 'DOWN', item.order, item.id,
    async (r) => {
      await store.getProspectPositions(user.controlno);
    }
  );
}

watch(store, async (store) => {
  if (dialog.value['positions'] && store.countApplicationPositions >= 3) {
    $q?.notify({ ...notifyOptions.warning, message: 'Number of applied positions limit reached!' })
    dialog.value = {}
  }
});

async function createWorkExperience () {
  const { position, status, office, supervisor, location } = wesForm.value
  console.log({position, status, office, supervisor, location})
  await store.createWorkExperience({
      controlno: user.controlno,
      position: typeof position === 'string'? position.toUpperCase(): position?.["name"].toUpperCase(),
      status,
      office,
      supervisor,
      location,
      durationFrom: wesFormDurationFromStr.value,
      durationTo: checked.value["untilPresent"]
        ? "Present"
        : wesFormDurationToStr.value,
    },
    () => {
      $q?.notify({ ...notifyOptions.success, message: "Successfully added!" });
      return store.getWorkExperiences(user.controlno);
    }
  );
  wesForm.value = { durationTo: "Present", location: "" };
}

async function updateWorkExperience () {
  const { position, status, office, supervisor, location, id } = editingWorkExperience.value
  const [ durationFrom, durationTo ] = wesEditDurations.value
  const tPosition = (typeof position === 'string'? position : position?.name).toUpperCase();
  const { isPresent } = editingWesDuration.value;
  console.log('DEBUG durations', { durationFrom, durationTo: isPresent ? 'Present': durationTo, position: tPosition, status, office, supervisor, location, id })
  await store.updateWorkExperience({
      controlno: user.controlno, status,
      office, supervisor, location, id, position: tPosition,
      durationFrom, durationTo: isPresent? 'Present': durationTo,
    },
    async () => {
      $q?.notify({...notifyOptions.success, message: 'Successfully updated!'})
      await store.getWorkExperiences(user.controlno);
    },
  );
}

async function deleteWorkExperience (item) {
  $q.dialog({
    ...dialogOptions.delete,
    message: `Would you like to delete ${item.position} (${item.durationFrom}-${item.durationTo})?`,
  }).onOk(async () => {
    const i = store.workExperiences.indexOf(item);
    if (i !== -1) store.workExperiences.splice(i, 1);
    await store.deleteWorkExperience(item.id, (e) => {
      $q.notify({ message: "Failed to delete", type: "negative" });
      store.workExperiences.splice(i, 0, item);
    });
  });
}

async function createWesMoreInfo(isDuties, { id }) {
  await store.createWorkExperienceInformation(isDuties, id, inputWesMoreInfo.value);
  await store.getWorkExperienceInformation(id, user.controlno, isDuties);
  inputWesMoreInfo.value = "";
}

async function deleteWesMoreInfo(item) {
  const i = store.workExperienceInformation.indexOf(item);
  if (i !== -1) store.workExperienceInformation.splice(i, 1);
  await store.deleteWorkExperienceInformation(isDuties.value, item.ID, (e) => {
    $q.notify({ message: "Failed to delete", type: "negative" });
    store.workExperienceInformation.splice(i, 0, item);
  });
}

async function prefetchWesInfo({ id }) {
  loading.value["wesMoreInfo"] = true;
  await store.getWorkExperienceInformation(id, user.controlno, isDuties.value);
  loading.value["wesMoreInfo"] = false;
}

async function preloadUserData(category) {
  switch (category) {
    case "workExperience":
      await store.getWorkExperiences(user.controlno);
      break;
  }
}

const mappings = {
  dataPrivacy: { id: "contentDataPrivacy", pdfName: "nda" },
  applicationForm: {
    id: "contentApplication", pdfName: "applicationForm",
    fetch: () => store.getApplicationPositions(user.controlno),
    options: { margin: [25, 0, 25, 0] },
  },
  workExperience: {
    id: "contentWorkExperience", pdfName: "wes",
    fetch: () => store.getWorkExperiences(user.controlno),
    options: { margin: [13, 0] },
  },
  personalDataSheet: {
    id: "contentPersonalDataSheet", pdfName: "pds",
    options: {
      margin: [ 2, 0, 2, 0 ],
      format: [ 215.9, 330.2 ],
    },
  },
};
async function preloadPdfViewer (printable) {
  pdf.value = {};
  const { id, pdfName, fetch, options } = mappings[printable];
  isPdfVisible.value[pdfName] = true;
  if (!!fetch) await fetch();
  else await new Promise(resolve => setTimeout(resolve, 2000));
  await generatePdf(id, pdfName, options ?? {}, (doc) => {
    pdf.value[pdfName] = doc.output('bloburi');
    isPdfVisible.value[pdfName] = false;
  });
}


const isPdfVisible = ref({
  nda: null,
  wes: null,
  pds: null,
  applicationForm: null,
});
const pdf = ref({
  nda: null,
  wes: null,
  pds: null,
  applicationForm: null,
});
const anyPdfVisible = computed(() => {
  const isAnyFalsy = (acc, value) => acc || value;
  return Object.values(isPdfVisible.value).reduce(isAnyFalsy, false);
});

async function generatePdf(id, pdfName, {margin = 0, format = "letter"}, callback) {
  const pdfGenerator = new jsPDF({ orientation: 'p', format });
  pdfGenerator.setProperties({ title: pdfName }); pdfGenerator.setLineHeightFactor(1);
  pdfGenerator.html(document.getElementById(id), {
    autoPaging: 'text', width: 216, windowWidth: 816, x: 0, y: 0,
    html2canvas: { allowTaint: true, letterRendering: true, windowWidth: 816 },
    margin, callback,
  });
}

</script>

<template>
  <q-page class="column no-wrap justify-start" :class="'q-ma-'+($q?.screen.lt.md?'sm':'lg')">
    <div class="col-shrink row no-wrap justify-start" :class="'q-pb-'+($q?.screen.lt.md?'xs':'md')">
      <div class="col-xs-grow col-sm-grow col-md-grow col-lg-grow q-mx-none q-mt-none q-mb-sm"
           :class="$q?.screen?.lt.lg?'text-h6':'text-h4'">
        Your Applications
      </div>
      <div class="col-xs-shrink col-sm-shrink col-md-shrink col-lg-shrink q-pr-sm">
        <q-btn color="primary" label="Print Preview" icon="print"
               v-if="!$q.platform.is.mobile && !$q?.screen?.lt.md" @click="dialog['printPreview'] = true"/>
      </div>
      <div class="col-xs-shrink col-sm-shrink col-md-shrink col-lg-shrink">
        <q-btn color="primary" label="Browse Open Positions" icon="manage_search"
               v-if="!$q?.screen?.lt.md && (isDevServer()? true:!store.hasExpired)"
               :disable="store.countApplicationPositions >= 3"
               @click="dialog['positions'] = true"/>
      </div>
    </div>
    <div class="col bg-orange row no-wrap">
      <q-table class="col-12" table-header-class="text-uppercase text-body2" wrap-cells :dense="$q?.screen?.lt.md"
               :rows-per-page-options="[20]" hide-pagination :rows="store.prospectPositions" row-key="'ID'"
               @row-click="(evt, row, index) => {openedPosition = row; isProspect = true; dialog['qualifications'] = true;}"
               :columns="[
       {name: 'sort', style: 'min-width: 36px; max-width: 36px'},
       {name: 'item', field:'itemNumber', align: 'right', style: 'padding: 0'},
       {name: 'position', label: 'Position Title', field:'name', align: 'left'},
       {name: 'office', label: 'Office', field: 'office',   align: 'left' },
       {name: 'status', label: 'Status', field:'status', align: 'left'},
       {name: 'actions', style: 'min-width: 80px; max-width: 120px'},
     ]">
        <template #body-cell-sort="props">
          <q-td :props="props" auto-width style="padding: 0">
            <div v-if="props.row['status'] !== 'UNQUALIFIED'" class="row q-px-sm">
              <q-btn class="col-12 self-start" icon="expand_less" size="sm" padding="none" flat dense rounded
                     :disable="parseInt(props.row['order']) === store.minProspectOrder"
                     :color="parseInt(props.row['order']) === store.minProspectOrder?'grey':'primary'"
                     @click.stop="sortProspectPositions(true, props.row)"/>
              <q-btn class="col-12 self-end" icon="expand_more" size="sm" padding="none" flat dense rounded
                     :disable="parseInt(props.row['order']) === store.maxProspectOrder"
                     :color="parseInt(props.row['order']) === store.maxProspectOrder?'grey':'primary'"
                     @click.stop="sortProspectPositions(false, props.row)"/>
            </div>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge v-if="$q.screen.gt.sm" class="text-weight-bold" outline :color="colorize(props)" :label="props.value"/>
            <q-badge v-else rounded :color="colorize(props)">
              <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]" style="font-size: small"
                         :class="`bg-${colorize(props)}`" class="text-weight-medium text-body1">
                {{ props.value }}
              </q-tooltip>
            </q-badge>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props" auto-width style="padding: 0">
            <div class="row reverse justify-end" style="min-width: 80px; max-width: 80px">
              <q-btn class="col-shrink" icon="delete" size="md" color="negative" flat dense rounded padding="none"
                     v-if="(isDevServer()? true:!store.hasExpired) && props.row['status'] === 'PENDING'"
                     @click.stop="deleteProspect(props)"/>
              <div class="col-shrink" :class="'q-px-'+($q.screen?.lt.md?'none':'xs')"/>
              <q-btn class="col-shrink" icon="info_outline" size="md" color="primary" flat dense rounded padding="none xs"
                     @click="openedPosition = props.row; isProspect = true; dialog['qualifications'] = true"/>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky style="z-index: 10" class="row" v-if="$q?.screen?.lt.md" position="bottom-right" :offset="[$q.platform.is.mobile? 2: 18, 18]">
      <q-btn class="q-mx-xs" label="Browse Positions" icon="manage_search" color="primary" padding="md" rounded push
             :disable="store.countApplicationPositions >= 3"
             v-if="(isDevServer()? true:!store.hasExpired)"
             @click="dialog['positions'] = true"/>
      <q-btn class="q-mx-xs" icon="print" color="primary" padding="md" rounded push
             v-if="!$q.platform.is.mobile" :label="(isDevServer()? true:!store.hasExpired)? '': 'Print Documents'"
             @click="dialog['printPreview'] = true"/>
    </q-page-sticky>
  </q-page>


<!--------------------------------------------------------------------------------------------------------------------->
<!------------------------------------------- DIALOG VIEW POSITIONS --------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['positions']" :position="$q.platform.is.mobile? 'top': 'standard'" persistent>
    <q-layout container view="Lhh lpR fff" class="bg-white text-dark f-dialog1">
      <q-header>
        <q-toolbar>
          <q-icon name="manage_search" size="md" />
          <q-toolbar-title>Open Positions</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <PanelBrowsePositions @item-click="(row) => { openedPosition = row;  dialog['qualifications'] = true }"/>
      </q-page-container>
    </q-layout>
  </q-dialog>


<!--------------------------------------------------------------------------------------------------------------------->
<!----------------------------------------- DIALOG VIEW QUALIFICATIONS ------------------------------------------------>
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['qualifications']" @hide="isProspect = false; tabs['prospect'] = 'qualifications'" persistent
            :position="$q.platform.is.mobile? 'top': 'standard'" transition-show="scale" transition-hide="scale"
            @before-show="store.getPositionInformation(openedPosition.infoId, openedPosition[isProspect? 'positionId':'id'])">
    <q-layout container view="Lhh lpR fff" class="bg-grey-4 text-dark" :class="'f-dialog'+(isProspect?'1':'2')">
      <q-header>
        <q-toolbar>
          <q-icon name="checklist" size="md" />
          <q-toolbar-title>Position Qualifications</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-footer v-if="!isProspect" class="transparent q-pb-sm">
        <div class="q-px-sm full-width">
          <q-btn label="Apply for Position" icon="bookmark_add" color="primary" padding="xs md" class="full-width" push stack
                 @click="loading['btnApply'] = true; createProspect(openedPosition)" :loading="loading['btnApply']"
                 :disable="store.prospectPositions.some(({ positionId }) => positionId === openedPosition.id)" />
        </div>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-none bg-grey-4 column no-wrap">
          <q-scroll-area style="flex: 1 1 1px">

              <div class="q-pl-sm q-pb-md q-pt-sm q-pr-md row">
                <div class="col-12 text-body1 text-weight-bolder ellipsis">
                  Basic Information
                  <q-separator color="primary" spaced class="col-12" />
                </div>

                <div class="col-12 row no-wrap">
                  <div class="col q-pr-sm q-mb-sm">
                    <q-card class="q-pa-none fit" square bordered>
                      <q-card-section class="q-px-sm q-py-none">
                        <div class="text-weight-bold text-uppercase" style="font-size:0.82em">POSITION</div>
                        <div class="column no-wrap">
                          <div class="col">{{ splitStringWithParentheses(openedPosition.name)[0] }}</div>
                          <div class="col text-grey-7">{{ splitStringWithParentheses(openedPosition.name)[1] }}</div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-shrink q-mb-sm" style="min-width: 50px">
                    <q-card class="q-pa-none fit" square bordered>
                      <q-card-section class="q-px-sm q-py-none">
                        <div class="text-weight-bold text-uppercase" style="font-size:0.82em">SG</div>
                        <div class="text-right">{{ store.salaryGrade }}</div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>

                <q-card class="col-12 q-pa-none column" square bordered>
                  <q-card-section class="q-px-sm q-py-none">
                    <div class="text-weight-bold text-uppercase" style="font-size:0.82em">OFFICE</div>
                    <div>{{ store.organization['office'] }}</div>
                  </q-card-section>
                </q-card>
                <div v-for="[key, value] in Object.entries(store.organization)" :key="`mainOrg${key}`" class="col-12">
                  <q-card v-if="!!value && key.toString() !== 'office'" class="q-mt-sm q-pa-none column" square bordered>
                    <q-card-section class="q-px-sm q-py-none">
                      <div class="text-weight-bold text-uppercase" style="font-size:0.82em">{{ key }}</div>
                      <div>{{ value }}</div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>

              <div class="row q-pr-md">
                <div class="col-12 q-pl-sm">
                  <div class="text-body1 text-weight-bolder ellipsis">Minimum Qualifications</div>
                  <q-separator color="primary" class="col-12" />
                </div>

                <div v-if="Object.keys(store.qualifications).filter(key => key !== 'education').every(key => !store.qualifications[key])"
                     class="col-12 q-pl-sm">
                  <q-card class="q-my-sm q-pa-none column" square bordered>
                    <q-card-section class="q-px-sm q-py-xs">
                      <div class="text-justify">{{ store.qualifications['education'] }}</div>
                    </q-card-section>
                  </q-card>
                </div>
                <div v-else class="col-12 q-pl-sm">
                  <q-card v-for="[key, value] in Object.entries(store.qualifications)" :key="`mainQuali${key}`"
                          class="q-my-sm q-pa-none column" square bordered>
                    <q-card-section class="q-px-sm q-py-xs">
                      <div class="text-weight-bold text-uppercase" style="font-size:0.82em">{{ key }}</div>
                      <div>{{ value }}</div>
                    </q-card-section>
                  </q-card>
                </div>

                <div v-if="isProspect" class="col-12 q-mt-md q-pl-sm">
                  <div class="text-body1 text-weight-bolder">Remarks:</div>
                  <q-separator color="primary" />
                  <q-input class="q-mt-sm" v-model="openedPosition.remarks" outlined autogrow readonly
                           :error="openedPosition.status === 'UNQUALIFIED'" />
                </div>
              </div>
            </q-scroll-area>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>


<!--------------------------------------------------------------------------------------------------------------------->
<!------------------------------------------------- DIALOG PRINT ------------------------------------------------------>
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['printPreview']" @show="preloadPdfViewer(tabs['printPreview']); store.getIndexedPositions()" persistent>
    <q-layout container view="Lhh lpR fff" class="bg-white text-dark f-dialog1">
      <q-header>
        <q-toolbar>
          <q-icon name="print" size="md"/>
          <q-toolbar-title>Application Documents</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-px-none column no-wrap">
          <q-tabs v-model="tabs['printPreview']" class="col-shrink text-grey" active-color="primary" align="justify" narrow-indicator dense
                    @update:model-value="(v) => { preloadPdfViewer(v); preloadUserData(v); expanded['wesForm'] = false }" indicator-color="primary">
              <q-tab v-if="store.countApplicationPositions > 0" name="applicationForm" label="Application Form" />
              <q-tab name="personalDataSheet" label="Personal Data Sheet" />
              <q-tab name="workExperience" label="Work Experience" />
              <q-tab name="dataPrivacy" label="Non-Disclosure"/>
              <q-tab v-if="/*isDevServer() && */true" name="trainings" label="Learning & Development" />
            </q-tabs>

          <div class="col row no-wrap bg-orange">
            <q-tab-panels class="col column no-wrap q-pb-none" v-model="tabs['printPreview']" animated>

              <q-tab-panel name="applicationForm" class="q-pa-sm column no-wrap">
                <div v-if="!pdf.applicationForm" class="col flex flex-center"><q-spinner size="lg" /></div>
                <iframe v-else :src="pdf['applicationForm']+'#toolbar=1'" style="flex: 1 1 1px" />
              </q-tab-panel>

              <q-tab-panel name="personalDataSheet" class="q-pa-sm column no-wrap">
                <div v-if="!pdf.pds" class="col flex flex-center"><q-spinner size="lg" /></div>
                <iframe v-else :src="pdf.pds+'#toolbar=1'" style="flex: 1 1 1px" />
              </q-tab-panel>


              <q-tab-panel name="workExperience" class="bg-grey-2 q-pl-sm q-pr-none q-pt-xs q-pb-none">
                <q-btn dense flat color="primary" no-caps padding="none" label="See files for reference (Duties and functions per position)"
                       @click="dialog['wesReferences'] = true"/>
                <q-scroll-area class="f-scroll" style="height: 380px; max-height: 380px;">
                  <div class="row q-pl-xs q-pr-md q-pb-lg">
                    <q-card bordered class="col-12 q-py-sm q-mt-xs">
                      <q-slide-transition>
                        <div v-show="expanded['wesForm']">
                          <q-card-section class="q-py-none q-px-sm">
                            <div class="row no-wrap items-stretch q-mb-xs">
                              <q-card class="col column shadow-2" bordered>
                                <div class="col-shrink q-pl-sm text-grey-7">Duration From:</div>
                                <div class="col-auto row no-wrap items-center q-px-sm">
                                  <q-input class="col-shrink" input-class="text-right" dense borderless type="number"
                                           style="max-width: 80px" input-style="font-family: monospace"
                                           label="Year" stack-label :max="new Date().getFullYear()"
                                           v-model="wesFormDurationFrom['year']">
                                    <template #prepend><q-icon name="work_history" /></template>
                                  </q-input>
                                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                                  <q-select class="col-grow q-pl-xs" dense borderless :options="monthNames" options-dense
                                            transition-show="jump-down" transition-hide="jump-up"
                                            @update:model-value="wesFormDurationFrom['date'] = null"
                                            v-model="wesFormDurationFrom['month']" label="Month" stack-label/>
                                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                                  <q-input class="col" input-class="text-right" type="number" dense borderless
                                           input-style="font-family: monospace" style="max-width: 80px" min="1"
                                           label="Date (optional)" stack-label placeholder="--"
                                           v-model="wesFormDurationFrom['date']"
                                           :max="maxDateOfMonthDurationFrom"/>
                                </div>
                                <div class="col-1 q-px-sm text-grey-7" style="font-size: 0.8em">
                                  Please leave the field for 'Date' blanked out, if unsure
                                </div>
                              </q-card>

                              <div class="col-shrink self-center q-px-xs">—</div>

                              <q-card class="col column shadow-2" bordered>
                                <div class="col-shrink row no-wrap q-pl-sm text-grey-7">
                                  <div>Duration To:</div><q-space/>
                                  <q-btn v-if="!checked['untilPresent']" rounded flat dense padding="none sm"
                                         icon="replay" size="sm" color="primary" label="Reset"
                                         @click="checked['untilPresent'] = true"/>
                                </div>
                                <div v-if="checked['untilPresent']" class="col-auto row no-wrap items-center q-px-sm">
                                  <q-checkbox v-model="checked['untilPresent']" label="Present"/>
                                </div>
                                <div v-else class="col-auto row no-wrap items-center q-px-sm">
                                  <q-input class="col-shrink" input-class="text-right" dense borderless type="number"
                                           style="max-width: 80px" input-style="font-family: monospace"
                                           label="Year" stack-label :max="new Date().getFullYear()"
                                           v-model="wesFormDurationTo['year']">
                                    <template #prepend><q-icon name="work_history" /></template>
                                  </q-input>
                                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                                  <q-select class="col-grow q-pl-xs" dense borderless :options="monthNames" options-dense
                                            transition-show="jump-down" transition-hide="jump-up"
                                            @update:model-value="wesFormDurationTo['date'] = null"
                                            v-model="wesFormDurationTo['month']" label="Month" stack-label/>
                                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                                  <q-input class="col" input-class="text-right" type="number" dense borderless
                                           input-style="font-family: monospace" style="max-width: 80px" min="1"
                                           label="Date (optional)" stack-label placeholder="--"
                                           v-model="wesFormDurationTo['date']"
                                           :max="maxDateOfMonthDurationTo"/>
                                </div>
                                <div v-if="!checked['untilPresent']" class="col-1 q-px-sm text-grey-7" style="font-size: 0.8em">
                                  Please leave the field for 'Date' blanked out, if unsure
                                </div>
                              </q-card>
                            </div>


                            <div class="full-width row no-wrap">
                              <q-select v-if="!checked['isOthers']" class="col q-py-xs" dense outlined clearable
                                        label="Position" transition-show="jump-down" transition-hide="jump-up"
                                        use-input input-class="text-uppercase" input-debounce="0"
                                        v-model="wesForm['position']" @filter="filterIndexedPositionsFn"
                                        :options="filteredIndexedPositions" option-label="name" option-value="id" options-dense >
                                <template #prepend><q-icon name="assignment_ind" /></template>
                              </q-select>
                              <q-input v-else class="col q-py-xs" v-model="wesForm['position']" clearable dense outlined
                                       label="Position (Others, please specify)" input-class="text-uppercase">
                                <template #prepend><q-icon name="assignment_ind" /></template>
                              </q-input>
                              <q-checkbox v-model="checked['isOthers']" label="Others, please specify"/>
                            </div>

                            <q-input class="q-py-xs" v-model="wesForm['status']" label="Status" clearable dense outlined
                                     @update:model-value="(v) => { wesForm['status'] = v.toUpperCase() }"
                                     stack-label placeholder="PERMANENT" input-class="text-uppercase">
                              <template #prepend><q-icon name="bookmarks" /></template>
                            </q-input>

                            <q-input class="q-py-xs" v-model="wesForm['office']" label="Office/Unit" clearable dense outlined autogrow>
                              <template #prepend><q-icon name="account_balance" /></template>
                            </q-input>

                            <q-input class="q-py-xs" v-model="wesForm['supervisor']" label="Immediate Supervisor (include Position)" clearable dense outlined>
                              <template #prepend><q-icon name="perm_contact_calendar" /></template>
                            </q-input>

                            <q-input class="q-py-xs" v-model="wesForm['location']" label="Organization Location" clearable dense outlined autogrow>
                              <template #prepend><q-icon name="place" /></template>
                            </q-input>
                          </q-card-section>
                          <q-separator class="q-mb-sm" />
                        </div>
                      </q-slide-transition>

                      <div class="q-px-sm">
                        <q-btn v-if="!expanded['wesForm']" class="full-width" color="primary" label="Add new item" icon="add_box"
                               @click="expanded['wesForm'] = !expanded['wesForm']" />
                        <q-btn v-else class="full-width" color="primary" label="Add to list" icon="add_box"
                               @click="createWorkExperience" :disable="isWesFormInvalid" />
                      </div>
                    </q-card>

                    <q-card bordered v-for="(item, index) in store.workExperiences" class="col-12 q-py-sm q-mt-sm" :key="`mainWes${index}`">
                      <div class="row q-px-xs">
                        <q-input class="col-grow q-pa-xs" mask="##/##/####" label="From (mm/dd/yyyy)" dense outlined readonly
                                 :model-value="item.durationFrom">
                          <template #prepend><q-icon name="work_history"/></template>
                        </q-input>
                        <div class="col-shrink self-center">—</div>
                        <q-input class="col-grow q-pa-xs" label="To (mm/dd/yyyy)" dense outlined readonly
                                 :model-value="item.durationTo" >
                          <template #prepend><q-icon name="work_history" /></template>
                        </q-input>
                      </div>
                      <q-input class="q-px-sm q-py-xs" :model-value="item.position" label="Position" dense outlined readonly>
                        <template #prepend><q-icon name="assignment_ind" /></template>
                      </q-input>
                      <q-input class="q-px-sm q-py-xs" :model-value="item.status" label="Status" dense outlined readonly
                               stack-label placeholder="PERMANENT" >
                        <template #prepend><q-icon name="bookmarks" /></template>
                      </q-input>
                      <q-input class="q-px-sm q-py-xs" :model-value="item.office" label="Office/Unit" dense outlined autogrow readonly>
                        <template #prepend><q-icon name="account_balance" /></template>
                      </q-input>
                      <q-input class="q-px-sm q-py-xs" :model-value="item.supervisor" label="Immediate Supervisor (include Position)" dense outlined readonly>
                        <template #prepend><q-icon name="perm_contact_calendar" /></template>
                      </q-input>
                      <q-input class="q-px-sm q-py-xs" :model-value="item.location" label="Organization Location" dense outlined autogrow readonly>
                        <template #prepend><q-icon name="place" /></template>
                      </q-input>
                      <q-separator class="q-my-sm" />
                      <div class="row q-px-sm q-gutter-sm">
                        <q-btn class="col-shrink" color="primary"  @click=" () => {
                        const { id, location, office, supervisor, position, durationFrom, durationTo } = item;
                        mapDurationToForm( {durationFrom, durationTo });
                        editingWorkExperience = { position, id, location, office, supervisor };
                        editingWorkExperience.isOthers = editIsOthers(position);
                        dialog['wesEdit'] = true;
                      }">
                          <div class="row no-wrap justify-start full-width">
                            <q-icon class="col-2" name="edit"/>
                            <div class="col q-pl-sm full-width ellipsis text-left">Edit</div>
                          </div>
                        </q-btn>
                        <q-btn class="col" color="primary" @click="isDuties = false; openedWorkExperience = item; prefetchWesInfo(openedWorkExperience); dialog['wesMoreInfo'] = true">
                          <div class="row no-wrap justify-start full-width">
                            <q-icon class="col-2" name="add_box"/>
                            <div class="col q-pl-sm full-width ellipsis">Accomplishments</div>
                          </div>
                        </q-btn>
                        <q-btn class="col" color="primary" @click="isDuties = true; openedWorkExperience = item; prefetchWesInfo(openedWorkExperience); dialog['wesMoreInfo'] = true">
                          <div class="row no-wrap justify-start full-width">
                            <q-icon class="col-2" name="add_box"/>
                            <div class="col q-pl-sm full-width ellipsis">Duties/Functions</div>
                          </div>
                        </q-btn>
                        <q-btn class="col" color="negative"  @click="deleteWorkExperience(item)">
                          <div class="row no-wrap justify-start full-width">
                            <q-icon class="col-2" name="delete"/>
                            <div class="col q-pl-sm full-width ellipsis text-left">Delete</div>
                          </div>
                        </q-btn>
                      </div>
                    </q-card>

                  </div>
                  <div style="height: 50px"/>
                </q-scroll-area>
                <q-page-sticky position="bottom-right" class="z-max" :offset="[6, 8]">
                  <q-btn push rounded dense icon="print" color="primary" padding="md" label="Print"
                         @click="dialog['wesPrintPreview'] = true; preloadPdfViewer('workExperience')"/>
                </q-page-sticky>
              </q-tab-panel>

              <q-tab-panel name="dataPrivacy" class="q-pa-sm column no-wrap">
                <div v-if="!pdf.nda" class="col flex flex-center"><q-spinner size="lg" /></div>
                <iframe v-else :src="pdf.nda+'#toolbar=1'" style="flex: 1 1 1px" />
              </q-tab-panel>

              <q-tab-panel name="trainings" class="q-px-sm q-pt-sm q-pb-none">
                <PanelTrainings>
                </PanelTrainings>
              </q-tab-panel>
            </q-tab-panels>

          </div>

        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>

<!--------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------------- DIALOG ACCOMPLISHMENTS ------------------------------------------------>
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['wesMoreInfo']" persistent>
    <q-layout container view="Lhh lpR fff" class="bg-white text-dark f-dialog2">
      <q-header>
        <q-toolbar>
          <q-icon :name="!isDuties?'emoji_events':'business_center'" size="md"/>
          <q-toolbar-title>{{ !isDuties ? 'Accomplishments' : 'Duties & Functions'}}</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="column no-wrap">
          <div class="col-grow">
            <q-btn v-if="isDuties" class="q-mx-sm q-mt-sm" dense flat color="primary" no-caps padding="none"
                   label="See files for reference (Duties and functions per position)"
                   @click="dialog['wesReferences'] = true"/>
            <div class="text-subtitle2 q-px-sm" :class="'q-pt-'+(!isDuties?'sm':'none')">
              <span v-if="!isDuties">Accomplishments and contributions made</span>
              <span v-else>Summary of actual duties and functions</span>
              as {{ openedWorkExperience.position }} ({{ openedWorkExperience.durationFrom }} - {{ openedWorkExperience.durationTo }})
            </div>
            <q-card class="q-ma-sm q-px-sm column justify-start">
              <q-input ref="qInputMore" v-model="inputWesMoreInfo" class="col-shrink"
                       dense borderless autogrow autofocus maxlength="400"
                       @keydown.enter.prevent="() => {
                         if (!inputWesMoreInfo?.trim()) return;
                         createWesMoreInfo(isDuties, openedWorkExperience);
                         inputWesMoreInfo = '';
                       }">
                <template #append>
                  <div v-if="inputWesMoreInfo?.length < 32" class="text-body2">Press 'Enter' to add</div>
                  <q-btn flat dense round color="primary" icon="send" @click="() => {
                         if (!inputWesMoreInfo?.trim()) return;
                         createWesMoreInfo(isDuties, openedWorkExperience);
                         inputWesMoreInfo = '';
                       }" />
                </template>
              </q-input>
            </q-card>
            <q-separator />
          </div>
          <div class="col bg-grey-3 column no-wrap"> <!--TODO important for responsiveness: column no-wrap -->
            <q-scroll-area style="flex: 1 1 1px"> <!-- TODO: implement responsiveness flex: 1 1 1px -->
              <div v-if="!loading['wesMoreInfo']">
                <q-card class="q-ma-sm q-px-sm row justify-between items-center"
                        v-for="item in store.workExperienceInformation" :key="`mainWesInfo${item.ID }`">
                  <div class="col-shrink self-start q-pt-sm q-pr-sm">●</div>
                  <q-input class="col-grow q-pr-xs" dense borderless autogrow readonly
                           v-model="item[!isDuties ? 'Accomplishment': 'Duties']" />
                  <q-separator vertical />
                  <div class="col-auto q-pl-sm">
                    <q-btn icon="delete" color="negative" flat dense @click="deleteWesMoreInfo(item)" />
                  </div>
                </q-card>
              </div>
              <q-spinner v-else class="full-width q-mt-lg" size="md" />
            </q-scroll-area>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>


<!--------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------------- DIALOG WES PREVIEW ---------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['wesPrintPreview']" persistent>
    <q-layout container view="hHh Lpr lff" class="bg-white text-dark f-dialog2">
      <q-header>
        <q-toolbar>
          <q-icon name="print" size="md"/>
          <q-toolbar-title>Work Experience Sheet</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="column no-wrap">
          <div v-if="!pdf.wes" class="col flex flex-center"><q-spinner size="lg" /></div>
          <iframe v-else :src="pdf.wes+'#toolbar=1'" style="flex: 1 1 1px" />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>

<!--------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------------- DIALOG WES EDIT ------------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['wesEdit']" persistent>
    <q-layout container view="hHh Lpr lff" class="bg-white text-dark f-dialog2">
      <q-header>
        <q-toolbar>
          <q-icon name="edit" size="md"/>
          <q-toolbar-title>Work Experience Sheet</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-xs column no-wrap">
          <q-scroll-area style="flex: 1 1 1px">
            <div class="row no-wrap items-stretch q-mb-xs">


              <q-card class="col column shadow-2" bordered>
                <div class="col-shrink q-pl-sm text-grey-7">Duration From:</div>
                <div class="col-auto row no-wrap items-center q-px-sm">
                  <q-input class="col-shrink" input-class="text-right" dense borderless type="number"
                           style="max-width: 80px" input-style="font-family: monospace"
                           label="Year" stack-label :max="new Date().getFullYear()"
                           v-model="editingWesDuration['fYear']">
                    <template #prepend><q-icon name="work_history" /></template>
                  </q-input>
                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                  <q-select class="col-grow q-pl-xs" dense borderless :options="monthNames" options-dense
                            transition-show="jump-down" transition-hide="jump-up"
                            @update:model-value="editingWesDuration['fDate'] = null"
                            v-model="editingWesDuration['fMonth']" label="Month" stack-label/>
                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                  <q-input class="col" input-class="text-right" type="number" dense borderless
                           input-style="font-family: monospace" style="max-width: 80px" min="1"
                           label="Date (optional)" stack-label placeholder="--"
                           v-model="editingWesDuration['fDate']"
                           :max="maxDateOfMonthDurationFrom"/>
                </div>
                <div class="col-1 q-px-sm text-grey-7" style="font-size: 0.8em">
                  Please leave the field for 'Date' blanked out, if unsure
                </div>
              </q-card>


              <div class="col-shrink self-center q-px-xs">—</div>


              <q-card class="col column shadow-2" bordered>
                <div class="col-shrink row no-wrap q-pl-sm text-grey-7">
                  <div>Duration To:</div><q-space/>
                  <q-btn v-if="!editingWesDuration['isPresent']" rounded flat dense padding="none sm"
                         icon="replay" size="sm" color="primary" label="Reset"
                         @click="editingWesDuration['isPresent'] = true"/>
                </div>
                <div v-if="editingWesDuration['isPresent']" class="col-auto row no-wrap items-center q-px-sm">
                  <q-checkbox v-model="editingWesDuration['isPresent']" label="Present"/>
                </div>
                <div v-else class="col-auto row no-wrap items-center q-px-sm">
                  <q-input class="col-shrink" input-class="text-right" dense borderless type="number"
                           style="max-width: 80px" input-style="font-family: monospace"
                           label="Year" stack-label :max="new Date().getFullYear()"
                           v-model="editingWesDuration['tYear']">
                    <template #prepend><q-icon name="work_history" /></template>
                  </q-input>
                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                  <q-select class="col-grow q-pl-xs" dense borderless :options="monthNames" options-dense
                            transition-show="jump-down" transition-hide="jump-up"
                            @update:model-value="editingWesDuration['tDate'] = null"
                            v-model="editingWesDuration['tMonth']" label="Month" stack-label/>
                  <q-separator class="q-mx-xs q-my-sm bg-grey-5" vertical/>
                  <q-input class="col" input-class="text-right" type="number" dense borderless
                           input-style="font-family: monospace" style="max-width: 80px" min="1"
                           label="Date (optional)" stack-label placeholder="--"
                           v-model="editingWesDuration['tDate']"
                           :max="maxDateOfMonthDurationTo"/>
                </div>
                <div v-if="!editingWesDuration['isPresent']" class="col-1 q-px-sm text-grey-7" style="font-size: 0.8em">
                  Please leave the field for 'Date' blanked out, if unsure
                </div>
              </q-card>

            </div>

            <div class="full-width row no-wrap">
              <q-select v-if="!editingWorkExperience['isOthers']" class="col q-py-xs" dense outlined clearable
                        label="Position" transition-show="jump-down" transition-hide="jump-up"
                        use-input fill-input hide-selected input-class="text-uppercase" input-debounce="0"
                        v-model="editingWorkExperience['position']" @filter="filterIndexedPositionsFn"
                        :options="filteredIndexedPositions" option-label="name" option-value="id" options-dense >
                <template #prepend><q-icon name="assignment_ind" /></template>
              </q-select>
              <q-input v-else class="col q-py-xs" v-model="editingWorkExperience['position']" clearable dense outlined
                       label="Position (Others, please specify)" input-class="text-uppercase">
                <template #prepend><q-icon name="assignment_ind" /></template>
              </q-input>
              <q-checkbox :model-value="editingWorkExperience['isOthers']" label="Others, please specify" />
            </div>

            <q-input class="q-py-xs" v-model="editingWorkExperience['status']" label="Status" clearable dense outlined
                     @update:model-value="(v) => { editingWorkExperience['status'] = v?.toUpperCase() }"
                     stack-label placeholder="PERMANENT" input-class="text-uppercase">
              <template #prepend><q-icon name="bookmarks" /></template>
            </q-input>

            <q-input class="q-py-xs" v-model="editingWorkExperience['office']" label="Office/Unit" clearable dense outlined autogrow>
              <template #prepend><q-icon name="account_balance" /></template>
            </q-input>

            <q-input class="q-py-xs" v-model="editingWorkExperience['supervisor']" label="Immediate Supervisor (include Position)" clearable dense outlined>
              <template #prepend><q-icon name="perm_contact_calendar" /></template>
            </q-input>

            <q-input class="q-py-xs" v-model="editingWorkExperience['location']" label="Organization Location" clearable dense outlined autogrow>
              <template #prepend><q-icon name="place" /></template>
            </q-input>
          </q-scroll-area>

          <q-page-sticky position="bottom-right" class="z-max" :offset="[6, 8]">
            <q-btn push rounded dense icon="save" color="primary" padding="md" label="Save Changes" :loading="loading['wesEdit']"
                   @click="loading['wesEdit'] = true; updateWorkExperience(); loading['wesEdit'] = false; dialog['wesEdit'] = false"/>
          </q-page-sticky>
        </q-page>
      </q-page-container>

    </q-layout>
  </q-dialog>


<!--------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------------- DIALOG WES REFERENCE -------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------->
  <q-dialog v-model="dialog['wesReferences']" persistent>
    <q-layout container view="hHh Lpr lff" class="bg-white text-dark f-dialog2">
      <q-header>
        <q-toolbar>
          <q-icon name="print" size="md"/>
          <q-toolbar-title>References</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="column no-wrap q-pa-xs">
          <div class="flex flex-center" style="flex: 1 1 1px">
            <q-spinner v-if="!pdf['wes']" class="full-width" size="md" />
            <iframe v-else :src="`${server}/FINAL_DUTIES_AND_FUNCTIONS`" class="fit" />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
<!--------------------------------------------------------------------------------------------------------------------->
<!------------------------------------------- DOCUMENT NON-DISCLOSURE ------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------->

  <div class="full-width relative-position" style="height: fit-content">
    <div v-if="anyPdfVisible" class="bg-white full-width absolute" style="aspect-ratio: 1/1.52; z-index: 8"/>
    <DocumentDataPrivacy v-if="isPdfVisible['nda']" id="contentDataPrivacy" class="f-print absolute"
                         v-model:position="openedPosition" v-model:applicant="applicantInfo" />
    <DocumentApplication v-if="isPdfVisible['applicationForm']" id="contentApplication" class="f-print absolute"
                         v-model:applicant="applicantInfo" v-model:positions="store.applicationPositions" />
    <DocumentWorkExperience v-if="isPdfVisible['wes']" id="contentWorkExperience" class="f-print absolute"
                            v-model:applicant="applicantInfo" v-model:work-experiences="store.workExperiences" />
    <DocumentPersonalData v-if="isPdfVisible['pds']" id="contentPersonalDataSheet" class="f-print absolute" />
  </div>

</template>

<style scoped>
.f-print {
  font-family: "Avenir", Arial, sans-serif;
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

.f-dialog2 {
  height: 500px;
  min-height: 300px;
  max-height: 500px;
  width: 600px;
  max-width: 1000px;
  min-width: 320px;
}

.f-table {
  height: 320px;
  max-height: 320px;
}

.f-scroll {
  height: 320px;
  max-height: 380px;
  min-height: 300px;
  max-width: inherit;
}

.f-scroll1 {
  height: 320px;
  max-height: 250px;
  min-height: 200px;
  max-width: inherit;
}

.f-scroll2 {
  height: 320px;
  max-height: 250px;
  min-height: 200px;
  max-width: inherit;
}

.f-table1 {
  height: max-content;
  min-height: 200px;
  max-height: 480px;
  width: 100%;
  min-width: 200px;
  max-width: 1800px;
}

.label-max-width {
  min-width: 70px;
}
</style>

<style>
.f-table .q-table__top,
.f-table .q-table__bottom,
.f-table thead tr:first-child th {
  background-color: white;
}

.f-table thead tr th {
  position: sticky;
  z-index: 1;
}

.f-table thead tr:first-child th {
  top: 0;
}

.f-table&.q-table--loading thead tr:last-child th {
  top: 48px;
}

.f-table tbody {
  scroll-margin-top: 48px;
}

</style>
