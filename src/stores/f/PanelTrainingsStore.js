import {defineStore} from "pinia";
import {ref, watch} from "vue";
import {logError} from "src/f-utils";
import {useLoginStore} from "stores/LoginStore";
import {api, postConfig} from "boot/axios";
import {useUserStore} from "stores/f/UserStore";

export const useTrainingsStore = defineStore(
  'trainings',
  () => {
    const user = useLoginStore()
    const userTrainings = useUserStore().trainings
    const filter = ref('')
    const loading = ref(true)
    const categorizedTrainings = ref([])
    const selectedTrainings = ref([])

    const selectCategorized = ref([])
    watch([() => filter.value, () => categorizedTrainings.value],  ([filter, list]) => {
      load(async () => {
        if (!filter?.length) return
        selectCategorized.value = mapToTrainings(list.filter(it => it['IOS'] === filter))
      })
    })
    const uncategorizedTrainings = ref([])
    watch(() => categorizedTrainings.value, (list) => {
      load(async () => {
        const setIDs = new Set(list.map(it => it['TrainingID']))
        uncategorizedTrainings.value = userTrainings.filter(it => !setIDs.has(it.id))
      })
    })


    // region // MAPPERS
    const mapToTrainings = (data) => data.map(
      ({ ID: id, TrainingID: trainingId }) => {
        const { title } = userTrainings.find(it => trainingId === it.id)
        return { id, trainingId, title }
      }
    ) // endregion

    function load(longRunning) {
      loading.value = true
      longRunning()
      loading.value = false
    }

    async function getTrainings (onLoad, onFail = logError) {
      load(async () =>{
        api.post('trainingIOSget.php', {
          controlno: user.controlno,
        }, postConfig)
          .then(response => {
            categorizedTrainings.value = response.data['TrainingIOS']
          })
          .catch(error => onFail(error))
          .finally(onLoad)
      })
    }

    async function createTraining (items, onLoad, onFail = logError) {
      load(async () => {
        for (const it of items) {
          try {
            const response = await api.post('trainingIOSpost.php', {
              controlno: user.controlno,
              trainingid: it.id,
              ios: filter.value,
              type: 'add',
            }, postConfig)
          } catch (error) { onFail(error) } finally { onLoad() }
        }
        await getTrainings(() => {}) // refresh
      })
    }

    async function deleteTraining (items, onLoad, onFail = logError) {
      load(async () => {
        for (const it of items) {
          try {
            const response = await api.post('trainingIOSpost.php', {
              type: 'delete', id: it.id,
            }, postConfig)
          } catch (error) { onFail(error) } finally { onLoad() }
        }
        await getTrainings(() => {}) // refresh
      })
    }


    return {
      loading,
      selectedUncategorizedTrainings: selectedTrainings,
      categorizedTrainings: selectCategorized,
      uncategorizedTrainings,
      filterTrainings: filter,
      getTrainings,
      createTraining,
      deleteTraining,
    }
  },
)
