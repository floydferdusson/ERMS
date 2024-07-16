import {defineStore} from "pinia";
import {computed, ref, watch, watchEffect} from "vue";
import {monthNames, splitDateString} from "src/f-utils";
import {usePlantillaStore} from "stores/PlantillaStore";
import _ from "lodash";

export const useWorkExperienceStore = defineStore(
  'workExperience',
  () => {
    const store = usePlantillaStore()
    const selectedExperience = ref([])
    const freezeSelectedExperience = ref([])
    const form = ref({})

    watchEffect(() => {
      if (!selectedExperience.value.length) {
        form.value = {
          fromYear: new Date().getFullYear(),
          fromMonth: monthNames[0],
          fromDay: null,
          isPresent: true,
          toYear: new Date().getFullYear(),
          toMonth: monthNames[0],
          toDay: null,
          position: '',
          office: '',
          supervisor: '',
          location: '',
        };
      } else {
        const _selected = selectedExperience.value[0]
        form.value = {
          fromYear: from.value.year,
          fromMonth: monthNames[from.value.month],
          fromDay: from.value.date,
          isPresent: _selected.durationTo.includes('Present'),
          toYear: to.value.year,
          toMonth: monthNames[to.value.month],
          toDay: to.value.date,
          position: _selected.position,
          office: _selected.office,
          supervisor: _selected.supervisor,
          location: _selected.location,
        }
        freezeSelectedExperience.value = {...form.value}
      }
    })


    const from = computed(() => splitDateString(selectedExperience.value[0].durationFrom))
    const to = computed(() => splitDateString(selectedExperience.value[0].durationTo))

    const isFormInvalid = computed(() => {
      if (!selectedExperience.value.length) {
        const { fromYear, fromMonth, isPresent, toYear, toMonth, position, office, supervisor, location } = form.value
        const temp = { fromYear, fromMonth, position, office, supervisor, location }
        const requiredFields = isPresent ? temp : { ...temp, toYear, toMonth }
        return Object.values(requiredFields).some(field => !field)
      } else {
        console.log(form.value, freezeSelectedExperience.value, _.isEqual(form.value, freezeSelectedExperience.value))
        return _.isEqual(form.value, freezeSelectedExperience.value)
      }
    })
    const isDirty = ref(false)
    watch(form, () => {
      isDirty.value = !_.isEqual(form.value, freezeSelectedExperience.value)
    })

    return {
      selectedExperience,
      form,
      isFormInvalid,
      positions: store.indexedPositions,
    };
  },
)
