import {defineStore} from "pinia";
import {api} from "boot/axios";


export const useLoginStore = defineStore("LoginStore", {
  state: () => ({
    userinformation:[],
    controlno: "",
    userinfo: [],
    userchildren: [],
    usereducation: [],
    userexperience: [],
    usereligibility: [],
    uservoluntary: [],
    usertraining: [],
    userskills: [],
    useracademic: [],
    userorganization: [],
    userreference: [],
    pics: false,
    img: "",
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async userlogin(payload) {
      let res = await api.post(`/login.php`, payload);
      // console.log("data=",res.data);
      if (res.data["auth"] == "failed") return 0;
      if (res.data["auth"] == "none") return 2;
      if (res.data["auth"] == "inactive") return 3;
      if (res.data["auth"] == undefined) return 0;
      this.controlno = res.data.controlno;
      this.userinfo = res.data.User;
      this.userinformation = res.data.User.map((item) => ({ ...item }));
      this.pics = res.data.pics;
      this.userchildren = res.data["User"][0]['children']
      this.usereducation = res.data.Education;
      this.userexperience = res.data.Experience;
      this.usereligibility = res.data.Eligibility;
      this.uservoluntary = res.data.Voluntary;
      this.usertraining = res.data.Training;
      this.userskills = res.data.Skills;
      this.useracademic = res.data.Academic;
      this.userorganization = res.data.Organization;
      this.userreference = res.data.Reference;
      this.img = res.data.img;
      // console.log("userinfo=",res.data);
      return 1;
    },
    async userdetails(payload) {
      let res = await api.post(`/employeedetails.php`, payload);
      // console.log("data=",res.data);
      // console.log("old userinfo=", this.userinfo);

      this.userinfo = res.data.User;
      console.log("new userinfo=", this.userinfo);

      this.usereducation = res.data.Education;
      this.userexperience = res.data.Experience;
      this.usereligibility = res.data.Eligibility;
      this.uservoluntary = res.data.Voluntary;
      this.usertraining = res.data.Training;
      this.userskills = res.data.Skills;
      this.useracademic = res.data.Academic;
      this.userorganization = res.data.Organization;
      this.userreference = res.data.Reference;

      console.log("usercontrolno=", this.controlno);
    },
  },

  persist: true,
});
