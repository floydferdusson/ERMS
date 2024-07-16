<template>
  <div>
    <q-card style="height: auto" class="q-ml-md q-mt-sm">
      <p class="title">PAYSLIP JOB ORDER</p>
      <q-card-section>
        <label for="year">Select Payroll Period: </label>
        <select id="year" v-model="selectedpayroll" @change="loadData">
          <option
            v-for="payroll in payrollperiod"
            :key="payroll"
            :value="payroll.payrollno"
          >
            {{ payroll.payrollperiod }}
          </option>
        </select>
      </q-card-section>
      <q-card-section>
        <table class="q-pa-sm" cellspacing="0">
          <tr>
            <th colspan="4" class="text-center justify-center">
              <p>CITY GOVERNMENT OF TAGUM</p>
              <p style="font-weight: 7" id="move">
                Tagum City Hall, Davao del Norte
              </p>
              <p id="move" style="font-size: 13px">
                {{ office }}
              </p>
              <p id="move" style="margin-bottom: 0px">PAYSLIP</p>
            </th>
          </tr>

          <tr>
            <td colspan="3">
              <hr
                style="
                  border: none;
                  border-top: 1px dotted #000;
                  height: 1px;
                  width: 100%;
                "
              />
            </td>
          </tr>

          <tr>
            <td colspan="3">
              <p id="">NAME: {{ fullname }}</p>
              <p id="moves">POSITION: {{ designation }}</p>
              <p id="moves">RATE: {{ rate }}</p>
              <p id="moves">I.D. No. : {{ controlno }}</p>
              <!-- <p id="moves" style="margin-bottom: -8px">PAY PERIOD: {{ selectedpayroll }} </p> -->
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <hr
                style="
                  border: none;
                  border-top: 1px dotted #000;
                  height: 1px;
                  width: 100%;
                "
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p>RATE</p>
            </td>
            <td colspan="1">
              <p>{{ rate }}</p>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p style="margin-top: -15px">No. of Days</p>
            </td>
            <td colspan="1">
              <p style="margin-top: -15px">{{ numdays }}</p>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p style="margin-top: -15px">GROSS PAY</p>
            </td>
            <td colspan="1">
              <p style="margin-top: -15px">{{ Gross }}</p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p id="moves" style="margin-bottom: 0px">DEDUCTIONS:</p>
            </td>
          </tr>
          <tr v-for="(deduction, index) in Deductions" :key="index">
            <td colspan="1" class="sibugtotheleft">
              <p
                style="margin-left: 5px; margin-right: 10px; margin-bottom: 0px"
              >
                {{ deduction.Head }}
              </p>
            </td>
            <h1 class="watermark">PERSONAL USE ONLY</h1>
            <td class="sibugtotheleft" colspan="1">
              <p class="text-right" id="moves" style="margin-bottom: -20px">
                {{ Number(deduction.amount) }}
              </p>
            </td>
            <td></td>
          </tr>

          <!-- <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">GSIS MPL</p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">GSIS PAYABLE PREMIUM</p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">LAND BANK</p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">PAG-IBIG MPL LOAN</p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">
                PAG-IBIG PAYABLE PREMIUM
              </p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">PHILHEALTH PAYABLE</p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="1">
              <p id="moves" style="margin-left: 5px">W/TAX PAYABLE</p>
            </td>
            <td colspan="1"><p id="moves">600.56</p></td>
            <td></td>
          </tr> -->

          <tr>
            <td colspan="1"></td>
            <td colspan="2">
              <hr
                style="
                  border: none;
                  border-top: 1px dotted #000;
                  height: 1px;
                  width: 100%;
                  margin-top: 2px;
                "
                id="moves"
              />
            </td>
          </tr>

          <tr>
            <td colspan="1"></td>

            <td colspan="1">TOTAL DEDUCTION</td>

            <td>
              {{
                Number(
                  Deductions.reduce(
                    (total, deduction) => total + parseFloat(deduction.amount),
                    0
                  )
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>

          <tr>
            <td colspan="2"></td>
            <td colspan="1">
              <hr
                style="
                  border: none;
                  border-top: 1px dotted #000;
                  height: 1px;
                  width: 100%;
                "
              />
            </td>
          </tr>

          <tr>
            <td colspan="3">
              <hr
                style="
                  border: none;
                  border-top: 1px dotted #000;
                  height: 1px;
                  width: 100%;
                "
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p>PAYROLL NO: {{ selectedpayroll }}</p>
            </td>
            <td>
              <p style="margin-left: -50px">NET:{{ net }}</p>
            </td>
          </tr>

          <!-- <tr>

            <td>
              <p id="moves">PAYROLL NO: {{ PayrollNo }} -</p>
            </td>
            <td>
              <p id="moves">{{ net2 }}</p>
            </td>
          </tr> -->
        </table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { useDashboardStore } from "../stores/DashboardStore";
import { useLoginStore } from "../stores/LoginStore";
export default {
  data() {
    return {
      numdays: "",
      rate: "",
      payrollperiod: "",
      office: "",
      fullname: "",
      designation: "",
      controlno: "",
      PayrollNo: "",
      Gross: "",
      Deductions: [],
      net: "",
      net2: "",
      payslip: [],
      selectedpayroll: "",
      selectedType: "",
      PayslipType: ["Payslip", "Bonus"],
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
    };
  },
  created() {
    console.log("payslipJO");
    const loginstore = useLoginStore();
    const store = useDashboardStore();
    this.controlno = loginstore.controlno;
    let Form2 = new FormData();
    Form2.append("Controlno", loginstore.controlno);
    store.getpayrollperiod(Form2).then((res) => {
      this.payrollperiod = store.payrollperiod;
      this.selectedpayroll = this.payrollperiod[0].payrollno;
      this.loadData();
      //   let Form = new FormData();
      //   Form.append("Controlno", loginstore.controlno);
      //   Form.append("payrollno", this.selectedpayroll);
      //   store.getpayslipJO(Form).then((res) => {

      //     this.payslip = store.payslip;

      //     this.Deductions = store.payslip.Deduction;
      //     this.office = this.payslip.Name[0].chargesoffice;
      //     this.fullname = this.payslip.Name[0].fullname;
      //     this.designation = this.payslip.Name[0].designation;
      //     const gross = this.payslip.Incentive.filter(
      //       (item) => item.Head == "RATE"
      //     );
      //     this.rate = Number(gross[0].amount).toLocaleString("en-US", {
      //       style: "currency",
      //       currency: "PHP",
      //       minimumFractionDigits: 2,
      //       maximumFractionDigits: 2,
      //     });
      //     const numdays = this.payslip.Incentive.filter(
      //       (item) => item.Head == "NO. OF DAYS"
      //     );
      //     this.numdays = Number(numdays[0].amount);
      //     const gross2 = this.payslip.Incentive.filter(
      //       (item) => item.Head == "GROSS"
      //     );
      //     this.Gross = Number(gross2[0].amount).toLocaleString("en-US", {
      //       style: "currency",
      //       currency: "PHP",
      //       minimumFractionDigits: 2,
      //       maximumFractionDigits: 2,
      //     });
      //     const net = this.payslip.Incentive.filter((item) => item.Head == "NET");
      //     console.log("NET=",net)
      //     this.net = Number(net[0].amount).toLocaleString("en-US", {
      //       style: "currency",
      //       currency: "PHP",
      //       minimumFractionDigits: 2,
      //       maximumFractionDigits: 2,
      //     });
      //   });
    });

    // let Form = new FormData();
    // Form.append('Controlno', loginstore.controlno);
    // Form.append('reptype', this.selectedType);
    // Form.append('month', this.selectedMonth);
    // store.getpayslip(Form).then(res => {
    //   this.payslip = store.payslip;
    //   const gross = this.payslip.Incentive.filter(item => item.description == 'GROSS PAY');
    //   // console.log("gross=",gross)
    //   this.Gross = Number(gross[0].pshare).toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'PHP',
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   })
    //   // console.log("gross2=",this.Gross)
    //   this.Deductions = store.payslip.Deduction
    //   this.PayrollNo=gross[0].payno
    //   const net = this.payslip.Incentive.filter(item => item.types == 'NET');

    //   this.net=Number(net[0].pshare).toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'PHP',
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   })

    //   if(this.payslip.Incentive.some(item=>item.types == 'NET2')){
    //     const net2 = this.payslip.Incentive.filter(item => item.types == 'NET2');
    //     this.net2=Number(net2[0].pshare).toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'PHP',
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   })

    //   }

    //   // console.log("payslip=",this.payslip.Name[0])
    //   this.office=this.payslip.Name[0].chargesoffice;
    //   this.fullname=this.payslip.Name[0].fullname;
    //   this.designation=this.payslip.Name[0].designation;

    //   const options = { month: 'long' };
    //    this.payrollperiod=new Date(this.payslip.Name[0].prange1).toLocaleString('en-US', options) + ' ' + new Date(this.payslip.Name[0].prange1).getDate() + '-' + new Date(this.payslip.Name[0].prange2).getDate() + ',' + new Date(this.payslip.Name[0].prange2).getFullYear()  ;
    //   // this.payrollperiod=new Date(this.payslip.Name[0].prange1).getMonth()
    // });
  },

  methods: {
    loadData() {
      const store = useDashboardStore();
      this.net = "";
      // this.net2='';
      // this.PayrollNo='';
      this.Gross = "";
      this.Deductions = [];
      this.numdays = "";
      this.rate = "";
      let Form = new FormData();
      Form.append("Controlno", this.controlno);
      Form.append("payrollno", this.selectedpayroll);
      store.getpayslipJO(Form).then((res) => {
        this.payslip = store.payslip;

        this.Deductions = store.payslip.Deduction;
        this.office = this.payslip.Name[0].chargesoffice;
        this.fullname = this.payslip.Name[0].fullname;
        this.designation = this.payslip.Name[0].designation;
        let gross = this.payslip.Incentive.filter(
          (item) => item.Head == "RATE"
        );
        console.log("gross=", gross);
        if (gross.length !== 0) {
          this.rate = Number(gross[0].amount).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }

        const numdays = this.payslip.Incentive.filter(
          (item) => item.Head == "NO. OF DAYS"
        );
        if (numdays.length !== 0) {
          this.numdays = Number(numdays[0].amount);
        }

        let gross2 = this.payslip.Incentive.filter(
          (item) => item.Head == "GROSS"
        );
        if (gross2.length !== 0) {
          this.Gross = Number(gross2[0].amount).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        } else {
          gross2 = this.payslip.Incentive.filter(
            (item) => item.Head == "GROSS PAY"
          );
          if (gross2.length !== 0) {
            this.Gross = Number(gross2[0].amount).toLocaleString("en-US", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }
        }

        const net = this.payslip.Incentive.filter((item) => item.Head == "NET");
        console.log("NET=", net);
        this.net = Number(net[0].amount).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      });
      // // console.log("selected reptyp=", this.selectedType)
      // const store = useDashboardStore();
      // let Form = new FormData();
      // Form.append('Controlno', this.controlno);
      // Form.append('reptype', this.selectedType);
      // Form.append('month', this.selectedMonth);
      // store.getpayslip(Form).then(res => {
      //   this.payslip = store.payslip;
      //   const gross = this.payslip.Incentive.filter(item => item.description == 'GROSS PAY');
      //   // console.log("gross=",gross)
      //   this.Gross = Number(gross[0].pshare).toLocaleString('en-US', {
      //     style: 'currency',
      //     currency: 'PHP',
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   })
      //   // console.log("gross2=",this.Gross)
      //   this.Deductions = store.payslip.Deduction
      //   this.PayrollNo=gross[0].payno
      //   const net = this.payslip.Incentive.filter(item => item.types == 'NET');

      //   this.net=Number(net[0].pshare).toLocaleString('en-US', {
      //     style: 'currency',
      //     currency: 'PHP',
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   })

      //   if(this.payslip.Incentive.some(item=>item.types == 'NET2')){
      //     const net2 = this.payslip.Incentive.filter(item => item.types == 'NET2');
      //     this.net2=Number(net2[0].pshare).toLocaleString('en-US', {
      //     style: 'currency',
      //     currency: 'PHP',
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   })
      //   }
      //   this.office=this.payslip.Name[0].tempoffice;
      //   this.fullname=this.payslip.Name[0].fullname;
      //   this.designation=this.payslip.Name[0].designation;

      //   const options = { month: 'long' };
      //    this.payrollperiod=new Date(this.payslip.Name[0].prange1).toLocaleString('en-US', options) + ' ' + new Date(this.payslip.Name[0].prange1).getDate() + '-' + new Date(this.payslip.Name[0].prange2).getDate() + ',' + new Date(this.payslip.Name[0].prange2).getFullYear()  ;
      // });
    },
  },
};
</script>
<style scoped>
.watermark {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-45%, -50%) rotate(-45deg); /* Adjust the rotation angle as needed */
  font-size: 35px;
  font-weight: bold; /* Make the text bold */
  color: rgba(43, 40, 40, 0.011); /* Adjust the color and opacity as needed */
  pointer-events: none; /* Allow interaction with underlying elements */
  white-space: nowrap; /* Prevent text from wrapping */
}

.title {
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 5px 10px 5px 10px;
  margin-bottom: -5px;
}

/* table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  border-spacing: 0;
} */
table {
  border-style: dotted;
  font-size: 11.5px;
}

/* td, th {
        padding: 1px;
    } */
#move {
  margin-top: -15px;
}

#moves {
  margin-top: -10px;
}

.sibugtotheleft {
  padding-right: 80px;
}
</style>
