<template>
  <div>
    <q-card>
      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="text-h6">
          LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS
          <q-btn label="Add" @click="secondDialog = true"></q-btn>
        </div>
      </q-card-section>
      <q-table
        class="my-sticky-header-table text-uppercase"
        flat
        wrap-cells=""
        bordered
        title=""
        dense
        :rows="sortExp()"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-actions="{ row }">
          <div class="actionsbtn">
            <q-btn
              icon="delete"
              flat
              round
              color="deep-orange"
              @click="deleteLearning(row)"
            >
            </q-btn>
          </div> </template
      ></q-table>
    </q-card>

    <!-- DIALOG FOR CHILD DELETE -->
    <q-dialog
      v-model="DeleteLearningDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-blue text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Learning and Development</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this Learning and Development Interventions?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-orange" />
          <q-btn
            flat
            label="OK"
            @click="deleteLearningFinal()"
            class="text-green"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add Details</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-form ref="learning" lazy-rules>
            <div class="row">
              <div class="col">
                <q-input
                  lazy-rules
                  :rules="inputRules"
                  filled
                  v-model="Title"
                  label="Title of Learning and Development"
                  dense
                  class="q-pa-sm text-uppercase"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  lazy-rules
                  :rules="inputRules"
                  filled
                  v-model="InclusiveDateFrom"
                  label="Inclusive Date From"
                  dense
                  class="q-pa-sm text-uppercase"
                  type="date"
                />
              </div>
              <div class="col">
                <q-input
                  lazy-rules
                  :rules="inputRules"
                  filled
                  v-model="InclusiveDateTo"
                  label="Inclusive Date To"
                  dense
                  class="q-pa-sm text-uppercase"
                  type="date"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  lazy-rules
                  :rules="inputRules"
                  filled
                  v-model="NumberofHours"
                  label="Number of Hours"
                  dense
                  class="q-pa-sm text-uppercase"
                  type="number"
                />
              </div>
              <div class="col">
                <q-input
                  lazy-rules
                  filled
                  v-model="Type"
                  label="Type of LD"
                  dense
                  class="q-pa-sm text-uppercase"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  lazy-rules
                  :rules="inputRules"
                  filled
                  v-model="Conducted"
                  label="Conducted / Sponsored by"
                  dense
                  class="q-pa-sm text-uppercase"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-file
                  lazy-rules
                  :rules="inputRules"
                  style="display: none"
                  v-model="fileimage"
                  @update:model-value="handleUpload"
                  accept=".jpg, image/*"
                  ref="file"
                ></q-file>
                <div class="column items-center">
                  <q-btn
                    type="button"
                    label="Upload Supporting Document"
                    @click="handleUploadBtnClick"
                  ></q-btn>
                </div>
              </div>
            </div>
            <div class="q-pt-sm">
              <q-img
                lazy-rules
                :rules="inputRules"
                :src="fileimagesrc"
                spinner-color="white"
              ></q-img>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="resetForm"
            size="md"
          />
          <q-btn
            label="Request Update"
            color="secondary"
            size="md"
            v-close-popup
            @click="addlearninganddevelopment()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="small">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ smalltitle }}!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ smallmessage }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useLoginStore } from "../stores/LoginStore";
import { useUserInfoStore } from "../stores/AdditionalStore";
export default {
  data() {
    return {
      DeleteLearningDialog: false,
      LearningID: "",
      small: false,
      smalltitle: "",
      smallmessage: "",
      inputRules: [(v) => !!v || "Field is required"],
      Title: "",
      InclusiveDateFrom: "",
      InclusiveDateTo: "",
      NumberofHours: "",
      Type: "",
      Conducted: "",

      ControlNo: "",
      personal: [],
      secondDialog: false,
      model: ref(null),
      name: "",
      dateofbirth: "",
      columns: [
        {
          name: "Title",
          required: true,
          label: "Title",
          align: "left",
          field: "Training",
          format: (val) => `${val}`,
          sortable: true,
          style: "width: 800px",
        },
        {
          name: "InclusiveDateFrom",
          align: "center",
          label: "From",
          field: "DateFrom",
          sortable: true,
        },
        {
          name: "InclusiveDateTo",
          align: "center",
          label: "To",
          field: "DateTo",
          sortable: true,
        },
        {
          name: "NumberofHours",
          align: "center",
          label: "Number of Hours",
          field: "NumHours",
          sortable: true,
        },
        {
          name: "Type",
          align: "center",
          label: "Type",
          field: "type",
          sortable: true,
        },
        {
          name: "Conducted",
          align: "center",
          label: "Conducted / Sponsored by",
          field: "Conductor",
          sortable: true,
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "left",
        },
      ],
    };
  },
  created() {
    this.personal = [];
    const userstore = useLoginStore();
    this.personal = userstore.usertraining;
    this.ControlNo = userstore.controlno;
    console.log("training=", this.personal);
  },
  methods: {
    sortExp() {
      return this.personal.sort((a, b) => {
        const dateA = new Date(a.DateFrom);
        const dateB = new Date(b.DateFrom);
        return dateA - dateB;
      });
    },
    async addlearninganddevelopment() {
      const valid = await this.$refs.learning.validate();
      if (!this.fileimage) {
        this.smalltitle = "Error!";
        this.smallmessage =
          "You need to upload a suppporting document in image format.";
        this.small = true;
        return;
      }
      if (valid) {
        let Form = new FormData();
        console.log("ControlNo_Learning=", this.ControlNo);
        Form.append("ControlNo", this.ControlNo);
        Form.append("Training", this.Title);
        Form.append("Datefrom", this.InclusiveDateFrom);
        Form.append("Dateto", this.InclusiveDateTo);
        Form.append("NumHours", this.NumberofHours);
        Form.append("Type", this.Type);
        Form.append("Conductor", this.Conducted);

        Form.append("file", this.fileimage);
        const userstore = useUserInfoStore();
        userstore.saveTraining(Form).then((res) => {
          console.log("res=", res);
          if (res == 1) {
            this.secondDialog = false;
            this.smalltitle = "Requested!";
            this.smallmessage =
              "The request for update has been sent to the HR.";
            this.small = true;
            this.resetForm();
          } else if (res == 2) {
            this.secondDialog = false;
            this.smalltitle = "Duplicate Entry!";
            this.smallmessage =
              "The request for update has already been sent to the HR, Please check the Request history for more information.";
            this.small = true;
          } else {
            this.secondDialog = false;
            this.smalltitle = "Error!";
            this.smallmessage =
              "Please contact the PMD Team on local number 501";
            this.small = true;
          }
        });
      }
    },
    resetForm() {
      // this.ControlNo = "";
      this.Title = "";
      this.InclusiveDateFrom = "";
      this.InclusiveDateTo = "";
      this.NumberofHours = "";
      this.Type = "";
      this.Conducted = "";
      this.fileimagesrc = "";
      this.secondDialog = false;
      // this.$refs.learning.reset();
    },
    deleteLearning(learningid) {
      this.LearningID = learningid.PMID;
      this.DeleteLearningDialog = true;
    },
    deleteLearningFinal() {
      console.log("Learning ID =>", this.LearningID);
      this.DeleteLearningDialog = false;
      // const store = useUserInfoStore
      const loginstore = useLoginStore();
      const user = new FormData();
      user.append("controlno", loginstore.controlno);
      const store = useUserInfoStore();
      const data = new FormData();
      data.append("tablename", "training");
      data.append("id", this.LearningID);
      store.deletedata(data).then(() => {
        loginstore.userdetails(user).then(() => {
          // console.log("new data=", loginstore.usereducation)
          this.personal = loginstore.usertraining;

          // console.log("old children=", this.personal[0].children)
          // this.personal = loginstore.userinfo.map((item) => ({ ...item }))
          // console.log("new children=", this.personal[0].children)
        });
      });
    },
  },
  setup() {
    const file = ref(null);
    const fileimage = ref(null);
    const fileimagesrc = ref("");
    const handleUpload = () => {
      if (fileimage.value) {
        fileimagesrc.value = URL.createObjectURL(fileimage.value);
      }
    };
    const handleUploadBtnClick = () => {
      file.value.pickFiles();
    };

    // additionalinfo.civilservice().then((res) => {
    //   eligibilityoptions.value = [...additionalinfo.civilservice];
    //   origdata.value = [...additionalinfo.civilservice];
    // });
    // const filterFn = (val, update, abort) => {
    //   const needle = (val || "").toLowerCase();
    //   const filteredItems = origdata.value.filter((item) =>
    //     item.Descriptions.toLowerCase().includes(needle)
    //   );

    //   update(() => {
    //     eligibilityoptions.value = filteredItems;
    //   });
    // };
    return {
      file,
      fileimage,
      fileimagesrc,
      handleUpload,
      handleUploadBtnClick,
    };
  },
};
</script>
<style scoped>
.table-container {
  max-width: 100%;
  overflow-x: auto;
}

.my-sticky-header-table {
  width: 100%; /* Ensure table takes full width of container */
}
</style>
