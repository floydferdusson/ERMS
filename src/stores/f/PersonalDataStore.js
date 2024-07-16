import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useLoginStore} from "stores/LoginStore";
import {logError, splitArray} from "src/f-utils";
import {useUserInfoStore} from "stores/AdditionalStore";
import {api, postConfig} from "boot/axios";

export const usePersonalDataStore = defineStore(
  'personalData',
  () => {
    const login = useLoginStore();
    const userData = useUserInfoStore();
    const maxMain = {
      children: 12,
      education: 5,
      eligibilities: 10,
      experiences: 28,
      volunteerings: 7,
      trainings: 21,
      otherInfo: 7,
      references: 3,
      skills: 7,
      nonAcademic: 7,
      organizations: 7,
    };
    const _maxExtra = 42;
    const maxExtra = {
      children: _maxExtra + 1,
      education: _maxExtra,
      eligibilities: _maxExtra,
      experiences: _maxExtra,
      volunteerings: _maxExtra,
      trainings: _maxExtra,
      otherInfo: _maxExtra,
      skills: _maxExtra,
      nonAcademic: _maxExtra,
      organizations: _maxExtra,
    };

    const pageCount = ref(['1', '2', '3', '4']);
    const children = computed(() => {
      return splitArray(
        login.userchildren.slice().sort((a, b) => {
          return new Date(b.BirthDate) - new Date(a.BirthDate);
        }),
        maxMain.children,
      );
    })
    const education = computed(() => {
      return splitArray(
        login.usereducation.slice().sort((a, b) => {
          return new Date(a.DateAttend.slice(0, 4)) - new Date(b.DateAttend.slice(0, 4));
        }),
        maxMain.education,
      );
    })
    const eligibilities = computed(() => {
      return splitArray(
        login.usereligibility.slice().sort((a, b) => {
          return new Date(a.Dates) - new Date(b.Dates);
        }),
        maxMain.eligibilities,
      );
    })
    const consolidatedExperiences = ref([]);
    const experiences = computed(() => {
      return splitArray(consolidatedExperiences.value, maxMain.experiences);
    })
    const volunteerings = computed(() => {
      const reversed = login.uservoluntary.slice().sort((a, b) => {
        return new Date(b.DateFrom) - new Date(a.DateFrom);
      });
      return splitArray(reversed, maxMain.volunteerings);
    })
    const trainings = computed(() => {
      const withDates = login.usertraining.filter(({ DateFrom }) => {
        return DateFrom !== '' && !isNaN(Date.parse(DateFrom));
      }).sort((a, b) => new Date(b.DateFrom) - new Date(a.DateFrom));
      const withoutDates = login.usertraining.filter(({ DateFrom }) => {
        return DateFrom === '' || isNaN(Date.parse(DateFrom));
      });
      return splitArray([ ...withDates, ...withoutDates ], maxMain.trainings);
      // const reversed = login.usertraining.slice().sort((a, b) => {
      //   if () return new Date(b.DateFrom) - new Date(a.DateFrom);
      // })
      // return splitArray(reversed, maxMain.trainings);
    })
    const otherInfo = login
    const references = computed(() => {
      return login.userreference.map(({ Names: name, Address: address, TelNo: telNo }) => ({name, address, telNo}));
    })
    const skills = computed(() => {
      return splitArray(login.userskills, maxMain.skills);
    });
    const nonAcademic = computed(() => {
      return splitArray(login.useracademic, maxMain.nonAcademic);
    });
    const organizations = computed(() => {
      return splitArray(login.userorganization, maxMain.organizations);
    });

    const pages = computed(() => {
      const defaultPages = ['1', '2', '3', '4'];
      const extraItems = {
        children: children.value[1],
        education: education.value[1],
        eligibilities: eligibilities.value[1],
        experiences: experiences.value[1],
        volunteerings: volunteerings.value[1],
        trainings: trainings.value[1],
      };
      Object.entries(extraItems).forEach(([key, value]) => {
        if (!value.length) return
        defaultPages.push(key)
      });
      return defaultPages;
    })

    async function getWorkExperiences (onLoad, onFail = logError) {
      try {
        const { data } = await api.post('serviceRecord.php', {
          controlno: login.controlno
        }, postConfig);
        consolidatedExperiences.value = [...(login.userexperience ?? []), ...(data.WorkExp ?? [])]
          .sort((a, b) => new Date(b.wfrom) - new Date(a.wfrom));
      } catch (error) { onFail(error) }
    }

    return {
      getWorkExperiences,
      maxMain,
      maxExtra,
      pageCount: pages,
      children,
      education,
      eligibilities,
      experiences,
      volunteerings,
      trainings,
      otherInfo,
      skills,
      nonAcademic,
      organizations,
      references,
    };
  },
)
