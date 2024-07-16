<template>
  <div>
    <q-card style="height: auto" class="q-ml-md q-pa-sm q-mt-sm">
      <p class="title">DAILY TIME RECORD</p>
      <q-card-section>
        <label for="month">Select Month: </label>
        <select
          id="month"
          v-model="selectedMonth"
          @change="loadData"
          class="q-mr-sm"
        >
          <option
            v-for="(month, index) in months"
            :key="index"
            :value="index + 1"
          >
            {{ month }}
          </option>
        </select>

        <label for="year">Select Year: </label>
        <select id="year" v-model="selectedYear" @change="loadData">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </q-card-section>
      <q-card-section>
        <table class="dense-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Time In</th>
              <th>Time Out</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in daysInMonth" :key="index">
              <td>{{ record }}</td>
              <td :colspan="4" v-if="getRecord(index+1).dayevent !== ''"> {{ getRecord(index+1).dayevent }}</td>
              <td v-if="getRecord(index+1).dayevent == ''" :style="{'font-weight': getRecord(index+1).AMINremarks !== '' ? 'bold' : 'normal', 'color': getRecord(index+1).AMLate == '1' ? 'red' : 'black'}">{{ getRecord(index + 1).AMIN || "-" }}</td>
              <td v-if="getRecord(index+1).dayevent == ''" :style="{'font-weight': getRecord(index+1).AMOUTremarks !== '' ? 'bold' : 'normal'}">{{ getRecord(index + 1).AMOUT || "-" }}</td>
              <td v-if="getRecord(index+1).dayevent == ''" :style="{'font-weight': getRecord(index+1).PMINremarks !== '' ? 'bold' : 'normal', 'color': getRecord(index+1).PMLate == '1' ? 'red' : 'black'}">{{ getRecord(index + 1).PMIN || "-" }}</td>
              <td v-if="getRecord(index+1).dayevent == ''" :style="{'font-weight': getRecord(index+1).PMOUTremarks !== '' ? 'bold' : 'normal'}">{{ getRecord(index + 1).PMOUT || "-" }}</td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useDashboardStore } from 'src/stores/DashboardStore';
import { useLoginStore } from 'src/stores/LoginStore';
export default {
  data() {
    return {
      controlno:'',
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: [
        ...Array.from(
          { length: new Date().getFullYear() - 2009 },
          (_, index) => 2010 + index
        ).reverse(),
      ],
      records: [],
    };
  },
  computed: {
    daysInMonth() {
      const [year, month] = [this.selectedYear, this.selectedMonth];
      const daysInMonth = new Date(year, month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, index) => index + 1);
    },
  },
  methods: {


    getRecord(day) {
      const dtdate=new Date(this.selectedYear,this.selectedMonth-1,day);

      const formattedDate = `${dtdate.getFullYear()}-${(dtdate.getMonth() + 1).toString().padStart(2, '0')}-${dtdate.getDate().toString().padStart(2, '0')}`;

      return (
        this.records[formattedDate] || {
          timeIn: "",
          timeOut: "",
        }
      );

      const timeInRecord = recordsOnDate.find(
        (record) => record.timetype === "IN"
      ) || { trdatetime: "", remarks: "" };

      const timeOutRecord = recordsOnDate.find(
        (record) => record.timetype === "OUT"
      ) || { trdatetime: "", remarks: "" };

      return {
        timeIn: timeInRecord.trdatetime,
        timeOut: timeOutRecord.trdatetime,
      };
    },

    
    loadData() {
      const store=useDashboardStore();
      let data=new FormData;
    data.append('ControlNo',this.controlno);
    data.append('month',this.selectedMonth);
    data.append('year',this.selectedYear);
    store.getdtr(data).then(res=>{
      this.records=store.dtr;
      console.log("records=",this.records)
    })
    },
  },
  created() {

    // console.log("month=",this.selectedMonth);
    // console.log("year=",this.selectedYear);
    // this.loadData(); // Load initial data

    const loginstore=useLoginStore();
    this.controlno=loginstore.controlno;
    this.loadData();

    // let data=new FormData;
    // data.append('ControlNo',loginstore.controlno);
    // data.append('month',this.selectedMonth);
    // data.append('year',this.selectedYear);
    // store.getdtr(data).then(res=>{
    //   this.records=store.dtr;
    //   // console.log("records=",this.records)

    // })
  },

};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 5px 10px 5px 10px;
  margin-bottom: -5px;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
/* .dense-table {
    border-collapse: collapse;
    width: 100%;
  } */

.dense-table th,
.dense-table td {
  border: 1px solid black;
  padding: 0px; /* Adjust the padding as needed */
  text-align: center;
}

.dense-table th {
  background-color: #f8f8f8;
}
</style>
