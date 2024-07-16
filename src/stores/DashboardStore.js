import {defineStore} from "pinia";
import {api} from "boot/axios";

export const useDashboardStore = defineStore("Dashboard", {
  state: () => ({
    reptype: [],
    payslip: [],
    payrollperiod: [],
    dtr: [],
    payroll: [],
    records: [],
    announcements: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async getreptype() {
      let res = await api.post(`/reptype.php`);
      // console.log("data=",res.data);

      const value = Object.values(res.data.reptype);
      this.reptype = Object.values(value);
      //   console.log("userinfo=",this.degree);
    },
    async getpayslip(payload) {
      let res = await api.post(`/payslip.php`, payload);
      // console.log("data=",res.data);\

      this.payslip = res.data;

      //   console.log("userinfo=",this.degree);
    },
    async getpayrollperiod(payload) {
      let res = await api.post(`/payrollperiod.php`, payload);
      // console.log("data=",res.data);

      // const value =Object.values( res.data.payrollperiod);
      // this.payrollperiod=Object.values(value);
      this.payrollperiod = res.data.payrollperiod;
      //   console.log("userinfo=",this.degree);
    },
    async getpayslipJO(payload) {
      let res = await api.post(`/payslipJO.php`, payload);
      console.log("data payslip JO=", res.data);

      this.payslip = res.data;

      //   console.log("userinfo=",this.degree);
    },
    async getdtr(payload) {
      let res = await api.post(`/dtr.php`, payload);
      // console.log("data=",res.data);\

      this.dtr = res.data;

      //   console.log("userinfo=",this.degree);
    },

    async getpayroll(payload) {
      let res = await api.post(`/JOpayroll.php`, payload);
      // console.log("data=",res.data);\

      this.payroll = res.data.payroll;

      //   console.log("userinfo=",this.degree);
    },
    async trackpayroll(payload) {
      let res = await api.post(`/trackJOpayroll.php`, payload);
      // console.log("data=",res.data);\

      this.records = res.data.records;

      //   console.log("userinfo=",this.degree);
    },
    async getannouncements() {

      let res = await api.get(`/announcement.php`);
      this.announcements = res.data.announcement;
      // console.log("data=",res.data);
      // this.request=res.data.request;
      // this.users=Object.values(res.data.users);
      // console.log("user users=",this.users);
      console.log("Annoucement", res.data);
    },
  },
});
