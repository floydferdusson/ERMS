import {defineStore} from "pinia";
import {api} from "boot/axios";

export const useUserInfoStore = defineStore("UserInfo", {
  state: () => ({
    degree: "",
    civilservice: [],
    children: [],
    workexp: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async getworkexp(payload) {
      let res = await api.post(`/servicerecord.php`, payload);
      // console.log("data=",res.data);
      this.WorkExp = "";
      this.workexp = res.data.WorkExp;
      //   console.log("userinfo=",this.degree);
    },
    async getcivilservice() {
      let res = await api.get(`/civilservice.php`);
      //   console.log("data=",res.data);
      this.civilservice = res.data.civil;
      //   console.log("userinfo=",this.degree);
    },
    async educationdegree() {
      let res = await api.get(`/degrees.php`);
      //   console.log("data=",res.data);
      this.degree = res.data.degrees;
      //   console.log("userinfo=",this.degree);
    },
    async saveTraining(payload) {
      let res = await api.post(`/saveupdatetraining.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async saveOrganization(payload) {
      let res = await api.post(`/saveupdateOrganization.php`, payload);
      // console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async saveNonAcademic(payload) {
      let res = await api.post(`/saveupdateNonAcademic.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async saveSkills(payload) {
      let res = await api.post(`/saveupdateskills.php`, payload);
      // console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async saveVoluntary(payload) {
      let res = await api.post(`/saveupdateVoluntary.php`, payload);
      // console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async saveWorkExperience(payload) {
      let res = await api.post(`/saveupdateworkexperience.php`, payload);
      // console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async saveeducation(payload) {
      let res = await api.post(`/saveupdateeducation.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async savechildren(payload) {
      let res = await api.post(`/saveupdatechild.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async savecivilservice(payload) {
      let res = await api.post(`/saveupdatecivilservice.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async savereference(payload) {
      let res = await api.post(`/saveupdateReference.php`, payload);
      // console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async savePic(payload) {
      let res = await api.post(`/saveupdatePic.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
    async deletedata(payload) {
      let res = await api.post(`/deleteddata.php`, payload);
      console.log("data=", res.data);
      //  this.degree=res.data.degrees;
      //   console.log("userinfo=",this.degree);
      if (res.data == "done") {
        return 1;
      } else if (res.data == "Duplicate") {
        return 2;
      } else {
        return 0;
      }
    },
  },
});
