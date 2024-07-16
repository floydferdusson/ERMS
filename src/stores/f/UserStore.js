import {defineStore} from "pinia";
import {useLoginStore} from "stores/LoginStore";
import {computed} from "vue";


export const useUserStore = defineStore(
  'user',
  () => {
    const login = useLoginStore()
    const trainings = computed(() => {
      return login.usertraining.map(it => ({
        id: it['PMID'],
        title: it['Training'],
        facilitator: it['Conductor'],
        hours: it['NumHours'],
        inclusiveDates: `${it['DateFrom']} - ${it['DateTo']}`,
      }))
    })


    return {
      trainings,
    }
  },
)
