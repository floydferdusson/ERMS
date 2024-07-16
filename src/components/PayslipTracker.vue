<template>
  <div class="track">
    <q-card style="height: auto;" class="q-ml-md q-pa-sm q-mt-sm">
      <p class="title">PAYROLL TRACKER</p>
      <q-card-section>
        <table
          style="width: 100%"
          virtual-scroll
          :rows-per-page-options="[0]"
        >
          <tr>
            <th colspan=""><p>TRACKING NO.</p></th>
            <th><p>PAYROLL TYPE</p></th>
            <th><p>PAYROLL PERIOD</p></th>
            <th><p>EtAl</p></th>
          </tr>
          <!-- <tr v-for="row in HR_kunuhay" :key="row.id"> -->
          <tr
            @click="trackpayroll(payroll.yearcover, payroll.tracknum)"
            v-for="(payroll, index) in payroll"
            :key="index"
          >
            <td>{{ Number(payroll.tracknum) }}</td>
            <td>{{ payroll.report }}</td>
            <td>{{ payroll.payrollperiod }}</td>
            <td>{{ payroll.EtAl }}</td>
          </tr>
        </table>
      </q-card-section>
    </q-card>
    <q-dialog v-model="trackerDialog">
      <q-card style="width: 120%">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">TRACKING NO. {{ trackingNumber }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset class="q-mt-sm"></q-separator>

        <q-card-section>
          <table>
            <tr>
              <th colspan=""><p>DATE</p></th>
              <th><p>OFFICE</p></th>
              <th><p>STATUS</p></th>
              <th><p>REMARKS</p></th>
            </tr>
            <!-- <tr v-for="row in HR_kunuhay" :key="row.id"> -->
            <tr v-for="(record, index) in records" :key="index">
              <td>{{ record.trackdate }} - {{ record.tracktime }}</td>
              <td>{{ record.Office }}</td>
              <td>{{ record.TType }}</td>
              <td>{{ record.Remarks }}</td>
            </tr>
          </table>
        </q-card-section>
      </q-card></q-dialog
    >
  </div>
</template>
<script>
import { useDashboardStore } from "src/stores/DashboardStore";
import { useLoginStore } from "src/stores/LoginStore";
export default {
  data() {
    return {
      trackerDialog: false,
      payroll: [],
      records: [],
      trackingNumber: "",
    };
  },
  created() {
    const store = useDashboardStore();
    const loginstore = useLoginStore();
    let data = new FormData();
    data.append("ControlNo", loginstore.controlno);
    store.getpayroll(data).then((res) => {
      this.payroll = store.payroll;
      console.log("pauroll=", this.payroll);
    });
  },
  methods: {
    trackpayroll(yearcover, tracknum) {
      this.trackingNumber = yearcover + "-" + tracknum;
      const store = useDashboardStore();
      let data = new FormData();
      data.append("yearcover", yearcover);
      data.append("tracknum", Number(tracknum));
      store.trackpayroll(data).then((res) => {
        this.records = store.records;
        this.trackerDialog = true;
      });
    },
  },
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  /* padding: 2px; */
}
table {
  width: 100%;
}
tr {
  text-align: center;
}
.title {
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 5px 10px 5px 10px;
  margin-bottom: -5px;
}
.track {
  font-size: 12px;
}
</style>
