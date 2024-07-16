<template>
  <div>
    <q-card style="height: auto" class="q-ml-md q-pa-sm q-mt-sm">
      <p class="title">PAYSLIP</p>

      <q-card-section>
        <!-- <label for="type">Select Type: </label> -->
        <!--<select id="type" v-model="selectedType" @change="loadData" class="q-mr-sm">
          <option v-for="(type, index) in PayslipType" :key="index" :value="type">
            {{ type }}
          </option>
        </select> -->
        <!-- <q-select
        id="type"
          v-model="selectedType"

          @update:model-value="loadData"
          class="q-mr-sm"
          :options="PayslipType"
          :option-label="(item)=>item.reptype"
          :option-value="(item)=>item.reptype"
        >

        </q-select> -->

        <label for="year">Select Month: </label>
        <select
          class="q-mr-sm"
          id="year"
          v-model="selectedMonth"
          @change="loadData"
        >
          <option v-for="month in months" :key="month" :value="month">
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
              <p id="move" style="margin-bottom: -10px">PAYSLIP</p>
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
              <p id="moves">MONTHLY SALARY: {{ Gross }}</p>
              <p id="moves">I.D. No. : {{ controlno }}</p>
              <p id="moves" style="margin-bottom: -8px">
                PAY PERIOD: {{ payrollperiod }}
              </p>
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
              <p>GROSS PAY</p>
            </td>
            <td colspan="1">
              <p>{{ Gross }}</p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p id="moves" style="margin-bottom: -2px">DEDUCTIONS:</p>
            </td>
          </tr>

          <tr v-for="(deduction, index) in Deductions" :key="index">
            <td colspan="1">
              <p
                style="
                  margin-left: 10px;
                  margin-right: 10px;
                  margin-bottom: 0px;
                "
              >
                {{ deduction.description }}
              </p>
            </td>
            <h1 class="watermark">PERSONAL USE ONLY</h1>
            <td colspan="1" class="sibugtotheleft">
              <p class="text-right" id="moves" style="margin-bottom: -20px">
                {{
                  shouldFormatCurrency(deduction)
                    ? Number(deduction.pshare).toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : Number(deduction.pshare).toFixed(2)
                }}
              </p>
            </td>
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
            <td colspan="2" style="">
              <hr
                style="
                  margin-top: 10px;
                  border: none;
                  border-top: 1px dotted #000;
                  height: 1px;
                  width: 100%;
                "
                id="moves"
              />
            </td>
          </tr>
          <tr>
            <td colspan="1"></td>
            <td colspan="1" class="q-mt-md" style="margin-top: -10px">
              TOTAL DEDUCTION
            </td>
            <td>
              {{
                Number(
                  Deductions.reduce(
                    (total, deduction) => total + parseFloat(deduction.pshare),
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
            <td>
              <p v-if="selectedType == 'DAILY WAGE PAYROLL'">1ST QUINCENA</p>
            </td>
            <td>
              <p>PAYROLL NO: {{ PayrollNo }} -</p>
            </td>
            <td>
              <p>{{ net }}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p id="moves" v-if="selectedType == 'DAILY WAGE PAYROLL'">
                2ND QUINCENA
              </p>
            </td>
            <td>
              <p id="moves">PAYROLL NO: {{ PayrollNo }} -</p>
            </td>
            <td>
              <p  id="moves">{{ net2 }}</p>
            </td>
          </tr>
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
      selectedYear: new Date().getFullYear(),
      selectedMonth: "",
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
      years: [
        ...Array.from(
          { length: new Date().getFullYear() - 2009 },
          (_, index) => 2010 + index
        ).reverse(),
      ],
    };
  },

  computed: {
    // Check if currency formatting is needed based on deduction description
    shouldFormatCurrency() {
      return (deduction) =>
        deduction.description === "PAG-IBIG PAYABLE PREMIUM";
    },
  },

  created() {
    const loginstore = useLoginStore();
    const store = useDashboardStore();
    this.controlno = loginstore.controlno;

    const monthindex = new Date().getMonth();
    this.selectedMonth = this.months[monthindex];
    this.selectedType = "DAILY WAGE PAYROLL";

    let Form = new FormData();
    Form.append("Controlno", loginstore.controlno);
    Form.append("reptype", this.selectedType);
    Form.append("month", this.selectedMonth);
    Form.append("year", this.selectedYear);
    store.getpayslip(Form).then((res) => {
      this.payslip = store.payslip;
      const gross = this.payslip.Incentive.filter(
        (item) => item.description == "GROSS PAY"
      );
      // console.log("gross=",gross)
      this.Gross = Number(gross[0].pshare).toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      console.log("DEDUCTION", store.payslip.Deduction);
      this.Deductions = store.payslip.Deduction;

      this.PayrollNo = gross[0].payno;
      const net = this.payslip.Incentive.filter((item) => item.types == "NET");

      this.net = Number(net[0].pshare).toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      if (this.payslip.Incentive.some((item) => item.types == "NET2")) {
        const net2 = this.payslip.Incentive.filter(
          (item) => item.types == "NET2"
        );
        this.net2 = Number(net2[0].pshare).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      // console.log("payslip=",this.payslip.Name[0])
      this.office = this.payslip.Name[0].tempoffice;
      this.fullname = this.payslip.Name[0].fullname;
      this.designation = this.payslip.Name[0].designation;

      const options = { month: "long" };
      this.payrollperiod =
        new Date(this.payslip.Name[0].prange1).toLocaleString(
          "en-US",
          options
        ) +
        " " +
        new Date(this.payslip.Name[0].prange1).getDate() +
        "-" +
        new Date(this.payslip.Name[0].prange2).getDate() +
        "," +
        new Date(this.payslip.Name[0].prange2).getFullYear();
      // this.payrollperiod=new Date(this.payslip.Name[0].prange1).getMonth()
    });
  },

  methods: {
    loadData() {
      this.net = "";
      this.net2 = "";
      this.PayrollNo = "";
      this.Gross = "";
      this.Deductions = [];
      // console.log("selected reptyp=", this.selectedType)
      const store = useDashboardStore();
      let Form = new FormData();
      Form.append("Controlno", this.controlno);
      Form.append("reptype", this.selectedType);
      Form.append("month", this.selectedMonth);
      Form.append("year", this.selectedYear);
      store.getpayslip(Form).then((res) => {
        this.payslip = store.payslip;
        const gross = this.payslip.Incentive.filter(
          (item) => item.description == "GROSS PAY"
        );
        // console.log("gross=",gross)
        this.Gross = Number(gross[0].pshare).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        // console.log("gross2=",this.Gross)
        this.Deductions = store.payslip.Deduction;
        this.PayrollNo = gross[0].payno;
        const net = this.payslip.Incentive.filter(
          (item) => item.types == "NET"
        );

        this.net = Number(net[0].pshare).toLocaleString("en-US", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        if (this.payslip.Incentive.some((item) => item.types == "NET2")) {
          const net2 = this.payslip.Incentive.filter(
            (item) => item.types == "NET2"
          );
          this.net2 = Number(net2[0].pshare).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        this.office = this.payslip.Name[0].tempoffice;
        this.fullname = this.payslip.Name[0].fullname;
        this.designation = this.payslip.Name[0].designation;

        const options = { month: "long" };
        this.payrollperiod =
          new Date(this.payslip.Name[0].prange1).toLocaleString(
            "en-US",
            options
          ) +
          " " +
          new Date(this.payslip.Name[0].prange1).getDate() +
          "-" +
          new Date(this.payslip.Name[0].prange2).getDate() +
          "," +
          new Date(this.payslip.Name[0].prange2).getFullYear();
      });
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

.downdown {
  padding-top: -10px;
}
.sibugtotheleft {
  padding-right: 80px;
}
</style>
