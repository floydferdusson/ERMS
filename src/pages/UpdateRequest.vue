<template>
  <div>
    <div>
      <h5 class="q-ml-lg">UPDATE HISTORY</h5>
      <div class="column items-center" style="">
        <!-- personal -->
        <div class="col" style="width: 90%">
          <div>
            <q-card
              v-if="request.length"
              class="q-pa-sm"
              style="text-align: center"
            >
              <q-table
                class="my-sticky-header-table text-uppercase"
                flat
                bordered
                wrap-cells=""
                title="Request for Update List"
                dense
                :rows="request"
                :columns="columns"
                row-key="id"
                :rows-per-page-options="[5, 10, 15, 20, 25, 100]"
              >
                <template v-slot:body-cell-actions="{ row }">
                  <div class="actionsbtn q-gutter-lg">
                    <q-btn flat round color="green" @click="viewdoc(row)">
                      View Docu
                    </q-btn>
                  </div>
                </template>
              </q-table>
            </q-card>
            <!-- children -->
            <q-card
              v-if="requestChild.length"
              class="q-pa-sm q-mt-sm"
              style="text-align: center"
            >
              <q-table
                class="my-sticky-header-table text-uppercase"
                flat
                bordered
                title="Request for Adding Children"
                dense
                wrap-cells=""
                :rows="requestChild"
                :columns="childcolumn"
                row-key="id"
                :rows-per-page-options="[5, 10, 15, 20, 25, 100]"
              >
                <template v-slot:body-cell-actions="{ row }">
                  <div class="actionsbtn q-gutter-lg">
                    <q-btn flat round color="green" @click="doc(row)">
                      View Docu
                    </q-btn>
                  </div>
                </template>
              </q-table>
            </q-card>
          </div>
          <!-- education -->
          <div v-if="requesteducation.length">
            <q-card class="q-pa-sm q-mt-sm" style="text-align: center">
              <q-table
                class="my-sticky-header-table text-uppercase"
                flat
                bordered
                title="Request for Adding Educational Background"
                dense
                wrap-cells=""
                :rows="requesteducation"
                :columns="educolumn"
                row-key="id"
                :rows-per-page-options="[5, 10, 15, 20, 25, 100]"
              >
                <template v-slot:body-cell-actions="{ row }">
                  <div class="actionsbtn q-gutter-lg">
                    <q-btn flat round color="green" @click="doc(row)">
                      View Docu
                    </q-btn>
                  </div>
                </template>
              </q-table>
            </q-card>
          </div>
          <!-- civil service -->
          <q-card
            v-if="requestcivilservice.length"
            class="q-pa-sm q-mt-sm"
            style="text-align: center"
          >
            <q-table
              class="my-sticky-header-table text-uppercase"
              flat
              bordered
              title="Request for Adding Civil Service"
              dense
              wrap-cells=""
              :rows="requestcivilservice"
              :columns="CScolumn"
              row-key="id"
              :rows-per-page-options="[5, 10, 15, 20, 25, 100]"
            >
              <template v-slot:body-cell-actions="{ row }">
                <div class="actionsbtn q-gutter-lg">
                  <q-btn flat round color="green" @click="doc(row)">
                    View Docu
                  </q-btn>
                </div>
              </template>
            </q-table>
          </q-card>

          <!--   <div v-if="requestworkexperience.length"> -->
          <q-card
            v-if="requestworkexperience.length"
            class="q-pa-sm q-mt-sm"
            style="text-align: center"
          >
            <q-table
              class="my-sticky-header-table"
              flat
              wrap-cells=""
              bordered
              title="REQUEST FOR WORK EXPERIENCE"
              dense
              :rows="requestworkexperience"
              :columns="columns_WorkExperience"
              row-key="id"
              :rows-per-page-options="[5]"
            >
              <template v-slot:body-cell-actions="{ row }">
                <div class="actionsbtn q-gutter-lg">
                  <q-btn flat round color="green" @click="doc(row)">
                    View Docu
                  </q-btn>
                </div>
              </template>
            </q-table>
          </q-card>

          <q-card
            v-if="requestvoluntarywork.length"
            class="q-pa-sm q-mt-sm"
            style="text-align: center"
          >
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title="REQUEST FOR VOLUNTARY WORK"
              dense
              wrap-cells=""
              :rows="requestvoluntarywork"
              :columns="columns_VoluntaryWork"
              row-key="id"
              :rows-per-page-options="[5]"
            >
              <template v-slot:body-cell-actions="{ row }">
                <div class="actionsbtn q-gutter-lg">
                  <q-btn flat round color="green" @click="doc(row)">
                    View Docu
                  </q-btn>
                </div>
              </template>
            </q-table>
          </q-card>

          <q-card
            v-if="requesttraining.length"
            class="q-pa-sm q-mt-sm"
            style="text-align: center"
          >
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title="REQUEST FOR LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS"
              dense
              wrap-cells=""
              :rows="requesttraining"
              :columns="columns_Learnin_AND_Development"
              row-key="id"
              :rows-per-page-options="[5]"
            >
              <template v-slot:body-cell-actions="{ row }">
                <div class="actionsbtn q-gutter-lg">
                  <q-btn flat round color="green" @click="doc(row)">
                    View Docu
                  </q-btn>
                </div>
              </template>
            </q-table>
          </q-card>

          <!-- </div> -->
          <q-card v-if="requestskills.length" class="q-pa-sm q-mt-sm">
            <q-card-section class="scroll">
              <div class="text-h6">
                SPECIAL SKILLS AND HOBBIES
                <!--     <q-btn label="Add" @click="SkillDialog = true"></q-btn> -->
              </div>
            </q-card-section>
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title=""
              wrap-cells=""
              dense
              :rows="requestskills"
              :columns="columnSkills"
              row-key="id"
            >
            </q-table>
          </q-card>
          <!-- NON-ACADEMIC DISTINCTIONS / RECOGNITION -->

          <q-card v-if="requestnonacademic.length" class="q-pa-sm q-mt-sm">
            <q-card-section class="scroll">
              <div class="text-h6">
                NON-ACADEMIC DISTINCTIONS
                <!-- <q-btn label="Add" @click="NonAcademicDialog = true"></q-btn> -->
              </div>
            </q-card-section>
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title=""
              dense
              wrap-cells=""
              :rows="requestnonacademic"
              :columns="columnAcademic"
              row-key="id"
            >
            </q-table>
          </q-card>
          <!-- MEMBERSHIP IN ASSOCIATION/ORGANIZATION -->

          <q-card v-if="requestorganization.length" class="q-pa-sm q-mt-sm">
            <q-card-section class="scroll">
              <div class="text-h6">
                MEMBERSHIP IN ASSOCIATION
                <!--  <q-btn label="Add" @click="MembershipDialog = true"></q-btn> -->
              </div>
            </q-card-section>
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              wrap-cells=""
              title=""
              dense
              :rows="requestorganization"
              :columns="columnMembership"
              row-key="id"
            >
            </q-table>
          </q-card>
        </div>
      </div>
    </div>
    <div>
      <q-dialog v-model="DialogDeny" persistent="">
        <q-card style="width: 35%; height: 40%">
          <q-card-section>
            <div class="text-h6">SUPPORTING DOCUMENTS</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div v-if="images.length > 0">
              <q-img
                v-for="(file, index) in images"
                :key="index"
                :src="imagesource(file)"
                alt="Uploaded Image"
                style="
                  height: 2in;
                  max-width: 2in;
                  border-color: black;
                  border-radius: 10%;
                  border-width: 2%;
                  border-style: solid;
                "
              />
            </div>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right">
            <q-btn label="Close" color="green" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- for individual -->
      <q-dialog v-model="Dialogpics" persistent="">
        <q-card style="width: 35%; height: auto">
          <q-card-section>
            <div class="text-h6">SUPPORTING DOCUMENT</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div>
              <q-img
                :src="singleimage"
                alt="Uploaded Image"
                style="
                  border-color: black;
                  border-radius: 10%;
                  border-width: 2%;
                  border-style: solid;
                "
              />
            </div>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right">
            <q-btn label="Close" color="green" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import { useRequestStore } from "../stores/RequestStore";
import { useLoginStore } from "src/stores/LoginStore";
import { server } from "boot/axios";
export default {
  data() {
    return {
      Dialogpics: false,
      request: [],
      requestChild: [],
      requesteducation: [],
      requestcivilservice: [],
      requestworkexperience: [],
      requestvoluntarywork: [],
      requesttraining: [],
      requestskills: [],
      requestnonacademic: [],
      requestorganization: [],

      DialogDeny: false,
      CScolumn: [
        {
          name: "CivilService",
          align: "left",
          label: "CIVIL SERVICE",
          field: "CivilServe",
          sortable: true,
        },
        {
          name: "Dates",
          align: "center",
          label: "EXAM DATE",
          field: "Dates",
          sortable: true,
        },
        {
          name: "Place",
          align: "left",
          label: "EXAM VENUE",
          field: "Place",
          sortable: true,
        },
        {
          name: "Lnumber",
          align: "center",
          label: "LICENSE NUMBER",
          field: "Lnumber",
          sortable: true,
        },
        {
          name: "Ldate",
          align: "center",
          label: "LICENSE EXPIRY DATE",
          field: "Ldate",
          sortable: true,
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
          align: "center",
        },
        {
          name: "remarks",
          label: "REMARKS",
          field: "remarks",
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],
      educolumn: [
        {
          name: "Education",
          align: "left",
          label: "Education Level",
          field: "Education",
          sortable: true,
        },
        {
          name: "School",
          align: "left",
          label: "School Name",
          field: "School",
          sortable: true,
        },
        {
          name: "degree",
          label: "BASIC EDUCATION/DEGREE/COURSE",
          field: "Degree",
          align: "center",
        },
        {
          name: "from",
          label: "From",
          field: "From",
          align: "center",
        },
        {
          name: "to",
          label: "To",
          field: "To",
          align: "center",
        },
        {
          name: "graduated",
          label: "Graduated",
          field: "Graduated",
          align: "center",
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
          align: "center",
        },
        {
          name: "remarks",
          label: "REMARKS",
          field: "remarks",
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],
      childcolumn: [
        {
          name: "ChildName",
          align: "left",
          label: "CHILD NAME",
          field: "ChildName",
          sortable: true,
        },
        {
          name: "Childbdate",
          align: "left",
          label: "Birthday",
          field: "BirthDate",
          sortable: true,
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
          align: "center",
        },
        {
          name: "remarks",
          label: "REMARKS",
          field: "remarks",
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],
      columns: [
        {
          name: "requestname",
          align: "left",
          label: "REQUEST FIELD",
          field: "label",
          sortable: true,
        },
        {
          name: "Dfrom",
          label: "Data from",
          field: "Dfrom",
          align: "center",
        },
        {
          name: "Dto",
          label: "Data to",
          field: "Dto",
          align: "center",
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
          align: "center",
        },
        {
          name: "remarks",
          label: "REMARKS",
          field: "remarks",
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],

      columns_WorkExperience: [
        {
          name: "Wfrom",
          align: "left",
          label: "FROM",
          field: "Wfrom",
          sortable: true,
        },
        {
          name: "Wto",
          align: "left",
          label: "TO",
          field: "Wto",
          sortable: true,
        },

        {
          name: "Wposition",
          align: "left",
          label: "POSITION TITTLE",
          field: "Wposition",
          sortable: true,
        },

        {
          name: "Wcompany",
          align: "left",
          label: "DEPARTMENT",
          field: "Wcompany",
          sortable: true,
        },

        {
          name: "Wsalary",
          align: "left",
          label: "MONTHLY SALARY",
          field: "Wsalary",
          sortable: true,
        },

        {
          name: "Wgrade",
          align: "left",
          label: "SALARY GRADE",
          field: "Wgrade",
          sortable: true,
        },

        {
          name: "wstatus",
          align: "left",
          label: "STATUS OF APPOINTMENT",
          field: "wstatus",
          sortable: true,
        },

        {
          name: "Wgov",
          align: "left",
          label: "GOVERNMENT SERVICE",
          field: "Wgov",
          sortable: true,
        },

        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true,
        },

        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],

      columns_VoluntaryWork: [
        {
          name: "Orgposition",
          align: "left",
          label: "NAME & ADDRESS OF ORGANIZATION",
          field: "Orgposition",
          sortable: true,
        },
        {
          name: "Datefrom",
          align: "left",
          label: "FROM",
          field: "Datefrom",
          sortable: true,
        },

        {
          name: "Dateto",
          align: "left",
          label: "TO",
          field: "Dateto",
          sortable: true,
        },

        {
          name: "Nohours",
          align: "left",
          label: "NUMBER OF HOURS",
          field: "Nohours",
          sortable: true,
        },

        {
          name: "Orgposition",
          align: "left",
          label: "POSITION",
          field: "Orgposition",
          sortable: true,
        },

        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true,
        },

        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],

      columns_Learnin_AND_Development: [
        {
          name: "Training",
          align: "left",
          label: "Training",
          field: "Training",
          sortable: true,
        },
        {
          name: "Datefrom",
          align: "left",
          label: "FROM",
          field: "Datefrom",
          sortable: true,
        },

        {
          name: "Dateto",
          align: "left",
          label: "TO",
          field: "Dateto",
          sortable: true,
        },

        {
          name: "NumHours",
          align: "left",
          label: "NUMBER OF HOURS",
          field: "NumHours",
          sortable: true,
        },

        {
          name: "type",
          align: "left",
          label: "TYPE",
          field: "type",
          sortable: true,
        },

        {
          name: "Conductor",
          align: "left",
          label: "CONDUCTED / SPONSORED BY",
          field: "Conductor",
          sortable: true,
        },

        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true,
        },

        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "center",
        },
      ],

      columnSkills: [
        {
          name: "skill",
          required: true,
          label: "Skills and Hobbies",
          align: "left",
          field: "skill",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true,
        },
      ],

      columnAcademic: [
        {
          name: "NonAcademic",
          required: true,
          label: "Non-Academic Distinction",
          align: "left",
          field: "NonAcademic",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true,
        },
      ],

      columnMembership: [
        {
          name: "Organization",
          required: true,
          label: "Membership in Organization",
          align: "left",
          field: "Organization",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true,
        },
      ],

      controlno: "",
      images: [],
      singleimage: "",
    };
  },
  methods: {
    doc(row) {
      console.log("row", row);
      this.singleimage = `${server}/pics/` + row.img;
      console.log("singleimage=", this.singleimage);
      this.Dialogpics = true;
    },
    deleteItem() {
      this.DialogDeny = true;
    },
    viewdoc(row) {
      const store = useRequestStore();
      let data = new FormData();
      data.append("ControlNo", this.controlno);
      data.append("SessionID", row.sessionID);
      store.getimg(data).then((res) => {
        this.images = store.images;
        this.DialogDeny = true;
      });
    },
    imagesource(file) {
      const imgsrc = `${server}/Pics/` + file.imgname;
      return imgsrc;
    },
  },
  created() {
    const loginstore = useLoginStore();
    const store = useRequestStore();
    this.controlno = loginstore.controlno;
    let data = new FormData();
    data.append("ControlNo", loginstore.controlno);
    store.getrequest(data).then((res) => {
      this.request = store.request;
      this.requestChild = store.requestChild;

      this.requesteducation = store.requestEducation;
      console.log("Educational Background", this.requesteducation);

      this.requestcivilservice = store.requestCivilService;

      this.requestworkexperience = store.requestWorkExperience;
      console.log("WORK EXPERIENCE", this.requestworkexperience);

      this.requestvoluntarywork = store.requestVoluntary;
      console.log("Voluntary work", this.requestvoluntarywork);

      this.requesttraining = store.requestTrainings;
      console.log("Training", this.requesttraining);

      this.requestskills = store.requestSkills;
      console.log("SKILLS", this.requestskills);

      this.requestnonacademic = store.requestNonAcademic;
      console.log("NON-ACADEMIC", this.requestnonacademic);

      this.requestorganization = store.requestOrganization;
      console.log("ORGANIZATION", this.requestorganization);
    });
  },
};
</script>
