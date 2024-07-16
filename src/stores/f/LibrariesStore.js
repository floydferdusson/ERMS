import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {logError} from "src/f-utils";
import {api} from "boot/axios";


export const useLibrariesStore = defineStore(
  'libraries',
  () => {
    const iosCategories = ref([])
    const iosPositions = ref([])
    const iosCategoriesLevel1 = computed(() => {
      const unique = new Set(
        iosCategories.value.map(it => it['general'])
      )
      return Array.from(unique).map(it => ({ value : it }))
    })
    const iosCategoriesLevel2 = ref([])

    // region // MAPPERS
    const mapIosCategories = (data) => data.map(it => {
      return {
        general: it['ios'].trim(),
        specific: it['ios2'].trim(),
      }
    }) // endregion


    async function getIosCategories (onLoad, onFail = logError) {
      api.get('/IOSselect.php')
        .then(response => {
          iosCategories.value = mapIosCategories(response.data['IOS'])
        })
        .catch(error => onFail(error))
        .finally(onLoad)
    }

    async function getIosPositions (onLoad, onFail = logError) {
      api.get('/IOSpositions.php')
        .then(response => {
          iosPositions.value = response.data['IOS_positions']
        })
        .catch(error => onFail(error))
        .finally(onLoad)
    }


    async function getIosCategoriesLevel2 (general, onLoad, onFail = logError) {
      try {
        iosCategoriesLevel2.value = iosCategories.value
          .filter(it => it['general'] === general)
          .map(it => it['specific'])
      } catch (error) { onFail(error) } finally { onLoad() }
    }

    return {
      iosCategories,
      getIosCategories,
      iosCategoriesLevel1,
      iosCategoriesLevel2,
      getIosCategoriesLevel2,
      iosPositions,
      getIosPositions,
    }
  },
)
