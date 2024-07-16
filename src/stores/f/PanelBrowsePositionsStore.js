import {computed, ref} from "vue";
import {api} from "boot/axios";
import {initStore, logError} from "src/f-utils";
import {defineStore} from "pinia";


export const usePanelBrowsePositionsStore = defineStore(
  'panelBrowsePositions',
  () => {
    const _response = ref(null)

    const offices = ref([])
    const filteredOffices = ref([])
    const { loading: loadingOffices } = initStore(getOffices)
    const filterOfficeVal = ref('')
    const filterOfficeStr = ref('')
    const viewingPosition = ref({})

    const positions = ref([])
    const filteredPositions = computed(() => {
      let temp = positions.value
      if (!!filterPositionVal.value) {
        const filterByName = filterPositionVal.value.trim()
        temp = !filterByName ? temp : temp.filter(
          ({name}) => name.toUpperCase().includes(filterByName)
        )
      }
      if (!!filterOfficeVal.value) {
        const filterByOffice = filterOfficeVal.value.trim()
        temp = !filterByOffice ? temp : temp.filter(
          ({ officeName }) => officeName.toUpperCase().includes(filterByOffice)
        ).sort( (a, b) => {
          return parseInt(a.itemNumber) - parseInt(b.itemNumber);
        })
      }
      return temp
    })
    const { loading: loadingPositions } = initStore(getPositions)
    const filterPositionVal = ref('')



    function filterOffices (val, update, abort) {
      const filter = val.toUpperCase()
      update(() => {
        filterOfficeStr.value = filter
        filteredOffices.value = !filter ? offices.value : offices.value.filter(({ name }) => name.includes(filter))
      })
    }

    async function fetch (onFail = logError) {
      try {
        const response = await api.get('plantilla.php')
        _response.value = response.data
      } catch (error) { onFail(error) }
    }

    async function getOffices (onLoad, onFail = logError) {
      if (!_response.value) await fetch(onFail) // Dependency #1
      offices.value = _response.value['office']
        .map( ({ officeid: id, officename: name }) => ({ id, name }) )
        .sort( (a, b) => (a.name).localeCompare(b.name) )
    }

    async function getPositions (onLoad, onFail = logError) {
      if (!_response.value) await fetch(onFail) // Dependency #1
      if (!offices.value?.length) await getOffices(onLoad, onFail) // Dependency #2
      positions.value = _response.value['position']
        .map( ({ itemno: itemNumber, id, positionid: infoId, position: name, officeid: officeId }) => {
          const officeName = offices.value.find( it => it.id === officeId)?.name
          return ({itemNumber, id, infoId, name, officeId, officeName});
        })
        .sort( (a, b) => (a.name).localeCompare(b.name) )
    }

    return {
      offices: filteredOffices,
      loadingOffices,
      filterOffices,
      filterOfficeVal,
      filterOfficeStr,
      positions: filteredPositions,
      loadingPositions,
      filterPositionVal,
      viewingPosition,
    }
  },
)
