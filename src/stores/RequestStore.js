import {defineStore} from "pinia";
import {api} from "boot/axios";

export const useRequestStore = defineStore("Request", {
  state: () => ({
    request: [],
    requestChild: [],
    requestCivilService: [],
    requestEducation: [],
    requestTrainings: [],
    requestWorkExperience: [],
    requestNonAcademic: [],
    requestSkills: [],
    requestOrganization: [],
    requestVoluntary: [],
    images: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async getrequest(payload) {
      let res = await api.post(`/requests.php`, payload);
      console.log("data=", res.data);

      this.request = res.data.request;
      this.requestChild = res.data.Child;
      this.requestCivilService = res.data.Civilservice;
      this.requestEducation = res.data.Education;
      this.requestTrainings = res.data.Trainings;
      this.requestWorkExperience = res.data.WorkExperience;
      this.requestNonAcademic = res.data.NonAcademic;
      this.requestSkills = res.data.Skills;
      this.requestOrganization = res.data.Organization;
      this.requestVoluntary = res.data.Voluntary;
      //   console.log("userinfo=",this.degree);
    },

    async getimg(payload) {
      let res = await api.post(`/sessionimg.php`, payload);
      // console.log("data=",res.data);\

      this.images = res.data.img;

      //   console.log("userinfo=",this.degree);
    },
  },
});
