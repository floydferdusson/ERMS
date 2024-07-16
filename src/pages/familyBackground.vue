<template>
  <div>
    <q-card>
      <q-form>
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <q-input v-model="personal[0].SpouseName" filled label="Spouse's Surname" dense
              class="q-pa-sm text-uppercase" />
          </div>
          <div class="col-md-6 col-xs-6">
            <q-input uppercase v-model="personal[0].SpouseMiddlename" filled label="Spouse's Middlename" dense
              class="q-pa-sm text-uppercase" />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-input uppercase v-model="personal[0].SpouseFirstname" filled label="Spouse's Firstname"
              class="q-pa-sm text-uppercase" dense />
          </div>

          <!-- <div class="col-md-6 col-xs-6 q-pa-sm">

            <q-select
              filled
              v-model="model"
              use-input
              dense
              input-debounce="0"
              label="Name Extension"
              :options="extension"
              style="min-width: 70%; max-width: 98%"
              behavior="menu"
            >
            </q-select>
          </div> -->
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <q-input uppercase v-model="personal[0].Occupation" filled label="Occupation" dense
              class="q-pa-sm text-uppercase" />
          </div>
          <div class="col-md-3 col-xs-12">
            <q-input v-model="personal[0].SpouseEmployer" filled label="Employers / Business Name"
              class="q-pa-sm text-uppercase" dense />
          </div>
          <div class="col-md-3 col-xs-12">
            <q-input v-model="personal[0].SpouseEmpAddress" filled label="Business Address"
              class="q-pa-sm text-uppercase" dense />
          </div>
          <div class="col-md-3 col-xs-12">
            <q-input v-model="personal[0].SpouseEmpTel" filled label="Telephone Number" class="q-pa-sm" dense
              type="number" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <q-input v-model="personal[0].FatherName" filled label="Father's Surname" dense
              class="q-pa-sm text-uppercase" />
          </div>
          <div class="col-md-6 col-xs-6">
            <q-input v-model="personal[0].FatherMiddlename" filled label="Father's Middlename" dense
              class="q-pa-sm text-uppercase" />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-input v-model="personal[0].FatherFirstname" filled label="Father's Firstname"
              class="q-pa-sm text-uppercase" dense />
          </div>

          <!-- <div class="col-md-6 col-xs-6 q-pa-sm">

            <q-select
              filled
              v-model="model2"
              use-input
              dense
              input-debounce="0"
              label="Name Extension"
              :options="extension"
              style="min-width: 70%; max-width: 98%"
              behavior="menu"
            >
            </q-select>
          </div> -->
        </div>
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <q-input v-model="personal[0].MotherName" filled label="Mother's Maiden Surname" dense
              class="q-pa-sm text-uppercase" />
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input v-model="personal[0].MotherFirstname" filled label="Mother's Firstname"
              class="q-pa-sm text-uppercase" dense />
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input v-model="personal[0].MotherMiddlename" filled label="Mother's Maiden Middlename" dense
              class="q-pa-sm text-uppercase" />
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-md-4 col-xs-6">
            <q-btn color="primary" @click="Savedata()" label="Request for update" />
          </div>
        </div>
        <div class="q-pa-sm">
          <q-card>
            <q-card-section style="max-height: 50vh" class="scroll">
              <div class="text-h6">
                CHILDREN NAMES
                <q-btn label="Add" @click="addchilddialog()"></q-btn>
              </div>
            </q-card-section>
            <q-table class="my-sticky-header-table text-uppercase" flat bordered title="" dense
              :rows="personal[0].children" :columns="columns" row-key="id">
              <template v-slot:body-cell-actions="{ row }">
                <div class="actionsbtn">
                  <q-btn icon="delete" flat round color="deep-orange" @click="deleteChildren(row)">
                  </q-btn>
                </div>
              </template></q-table>
          </q-card>
          <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
            <q-card class="" style="width: 500px">
              <q-card-section>
                <div class="text-h6">Add Children</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row">
                  <div class="col-12">
                    <q-input filled v-model="name" label="Name of Children" dense class="q-pa-sm text-uppercase" />
                  </div>
                  <div class="col-12">
                    <q-input filled v-model="dateofbirth" label="Date of Birth" dense class="q-pa-sm" type="date" />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <q-file style="display: none" v-model="fileimage" @update:model-value="handleUpload"
                      accept=".jpg, image/*" ref="file"></q-file>
                    <div class="column items-center">
                      <q-btn type="button" label="Upload Supporting Document" @click="handleUploadBtnClick()"></q-btn>
                    </div>
                  </div>
                </div>
                <div class="q-pt-sm">
                  <q-img :src="fileimagesrc" spinner-color="white"></q-img>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
                <q-btn label="Save" color="secondary" size="md" v-close-popup @click="addchildren()" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-form>
    </q-card>

    <div>
      <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale" full-width>
        <q-card class="bg-teal text-white">
          <q-card-section>
            <div class="text-h6">UPDATES</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div>
              <q-table class="my-sticky-header-table" flat bordered title="Updates" dense :rows="updatearr"
                :columns="columns2" row-key="id"></q-table>
            </div>
            <div>
              Please upload supporting document
              <q-file v-model="images" label="Select an Image" multiple append accept=".jpg, image/*" use-chips
                @update:model-value="handleupload" />
              <div v-if="images.length > 0">
                <q-img v-for="(file, index) in imagesurl" :key="index" :src="file" alt="Uploaded Image" style="
                    height: 2in;
                    max-width: 2in;
                    border-color: black;
                    border-radius: 10%;
                    border-width: 2%;
                    border-style: solid;
                  " />
              </div>
            </div>
            <!-- <div>
              <q-table
                class="my-sticky-header-table text-uppercase"
                flat
                bordered
                title=""
                dense
                :rows="addchild"
                :columns="columnschild"
                row-key="id"
              >
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <div>
                      <q-file
                        style="display: none"
                        v-model="childimage"
                        @update:model-value="handleUpload"
                        accept=".jpg, image/*"
                        ref="file"
                      ></q-file>
                    </div>
                    <div class="q-ml-lg">
                      <q-btn
                        type="button"
                        label="Upload Photo"
                        @click="handleUploadBtnClick"
                      ></q-btn>
                    </div>
                  </q-td>
                </template>
              </q-table>
            </div> -->
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="CANCEL" v-close-popup />
            <q-btn flat label="Upload Pictures" @click="uploadImage()"></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Duplicate Update Entry</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ alertmessage }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup @click="opendialog()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
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

    <!-- DIALOG FOR CHILD DELETE -->
    <q-dialog v-model="DeleteChildrenDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Children</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this Child?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-orange" />
          <q-btn flat label="OK" @click="deleteChildrenFinal()" class="text-green" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useLoginStore } from "src/stores/LoginStore";
import { useUserInfoStore } from "src/stores/AdditionalStore";

import { api } from "boot/axios";
export default {
  data() {
    return {
      DeleteChildrenDialog: false,
      ChildrenID: "",
      controlno: "",
      smalltitle: "",
      smallmessage: "",
      small: false,
      sessionID: "",
      alert: false,
      dialog: false,
      updatearr: [],
      addchild: [],
      user: [],
      personal: [],
      secondDialog: false,
      model: "N/A",
      model2: "N/A",
      name: "",
      dateofbirth: "",
      cit: ref(null),
      extension: ["N/A", "JR.", "SR.", "III"],
      columns: [
        {
          name: "lastname",
          required: true,
          label: "Name of Children",
          align: "left",
          field: "ChildName",

          sortable: true,
        },
        {
          name: "firstname",
          align: "center",
          label: "Date of Birth",
          field: "BirthDate",
          sortable: true,
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "left",
        },
      ],
      rows: [
        {
          lastName: "Honey Curay",
          firstName: "11-28-99",
        },
      ],
      columns2: [
        {
          name: "Type",
          align: "left",
          label: "Update Type",
          field: "type",
          sortable: true,
        },
        {
          name: "Field",
          align: "center",
          label: "Field",
          field: "label",
          sortable: true,
        },
        {
          name: "DFrom",
          align: "center",
          label: "Data From",
          field: "Dfrom",
          sortable: true,
        },
        {
          name: "DTo",
          align: "center",
          label: "Data To",
          field: "Dto",
          sortable: true,
        },
      ],
      columnschild: [
        {
          name: "lastname",
          required: true,
          label: "Name of Children",
          align: "left",
          field: "ChildName",

          sortable: true,
        },
        {
          name: "firstname",
          align: "center",
          label: "Date of Birth",
          field: "BirthDate",
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: "upload Supporting Document",

          sortable: true,
        },
      ],
      images: [],
      imagesurl: [],
    };
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
    return {
      file,
      handleUploadBtnClick,
      fileimage,
      fileimagesrc,
      handleUpload,
    };
  },
  created() {
    // const userAdd = useUserInfoStore().children;
    const userstore = useLoginStore();
    // const userAdd = useUserInfoStore();
    // this.user = userAdd;
    // this.user = userstore.userinfo;
    this.controlno = userstore.controlno;
    this.personal = userstore.userinfo.map((item) => ({ ...item }));
    if (
      this.personal[0].FatherName.includes("JR") ||
      this.personal[0].FatherName.includes("SR") ||
      this.personal[0].FatherName.includes(" III") ||
      this.personal[0].FatherName.includes(" IV")
    ) {
      this.personal[0].FatherName.replace(/\s(Jr|Sr|III| IV)$/, "");
      const regex = /\s(Jr|Sr|III| IV)$/;
      const matches = this.personal[0].FatherName.match(regex);
      this.model = matches.slice(1);
    } else {
      this.model = "N/A";
    }
    if (
      this.personal[0].SpouseName.includes("JR") ||
      this.personal[0].SpouseName.includes("SR") ||
      this.personal[0].SpouseName.includes(" III") ||
      this.personal[0].SpouseName.includes(" IV")
    ) {
      this.personal[0].SpouseName.replace(/\s(Jr|Sr|III| IV)$/, "");
      const regex = /\s(Jr|Sr|III| IV)$/;
      const matches = this.personal[0].SpouseName.match(regex);
      this.model = matches.slice(1);
    } else {
      this.model = "N/A";
    }
  },
  methods: {
    uploadImage() {
      const formData = new FormData();
      formData.append("ControlNo", this.controlno);
      for (let i = 0; i < this.images.length; i++) {
        formData.append("files[]", this.images[i]);
      }
      formData.append("sessionID", this.sessionID);

      const url = `/uploadpics.php`;

      api
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.dialog = false;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    opendialog() {
      if (this.updatearr.length !== 0) {
        this.dialog = true;
      }
    },
    handleupload() {
      this.imagesurl = [];

      for (let i = 0; i < this.images.length; i++) {
        const dummyimg = URL.createObjectURL(this.images[i]);
        this.imagesurl.push(dummyimg);
      }
    },
    async Savedata() {
      // //saving child first
      // if (this.addchild.length !== 0) {
      //   const formData = new FormData();

      //   this.addchild.forEach((item, index) => {
      //     formData.append(`data[${index}][Controlno]`, item.Controlno);
      //     formData.append(`data[${index}][ChildName]`, item.ChildName);
      //     formData.append(`data[${index}][BirthDate]`, item.BirthDate);
      //     formData.append(`data[${index}][type]`, item.type);
      //     formData.append(`data[${index}][status]`, item.status);
      //     if (item.Img instanceof File) {
      //       // It's a File object
      //       formData.append(`data[${index}][Img]`, item.Img);
      //     } else {
      //       // It's not a File object
      //       console.error("Img is not a File object");
      //     }
      //   });

      //   api
      //     .post(
      //       "/saveupdatechild.php",
      //       formData,
      //       {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       // handle success
      //       console.log(response.data);
      //     })
      //     .catch((error) => {
      //       // handle error
      //       console.error(error);
      //     });
      // }

      const data = [
        { name: "Spouse Name", column: "SpouseName" },
        { name: "Spouse Firstname", column: "SpouseFirstname" },
        { name: "Spouse Middlename", column: "SpouseMiddlename" },
        { name: "Spouse Occupation", column: "Occupation" },
        { name: "Spouse Employer", column: "SpouseEmployer" },
        { name: "Spouse Employer Address", column: "SpouseEmpAddress" },
        { name: "Spouse Employer Telephone", column: "SpouseEmpTel" },
        { name: "Father Surname", column: "FatherName" },
        { name: "Father Firstname", column: "FatherFirstname" },
        { name: "Father Middlename", column: "FatherMiddlename" },
        { name: "Mother Surname", column: "MotherName" },
        { name: "Mother Firstname", column: "MotherFirstname" },
        { name: "Mother Middlename", column: "MotherMiddlename" },
      ];
      const store = useLoginStore();
      for (let i = 0; i < data.length; i++) {
        const currentColumnValue =
          this.personal[0][data[i].column] != null
            ? this.personal[0][data[i].column].toString().toLowerCase()
            : "";
        const originalColumnValue =
          store.userinfo[0][data[i].column] != null
            ? store.userinfo[0][data[i].column].toString().toLowerCase()
            : "";
        if (currentColumnValue !== originalColumnValue) {
          this.updatearr.push({
            Controlno: this.controlno,
            type: "Edit",
            label: data[i].name,
            column: data[i].column,
            Dfrom: store.userinfo[0][data[i].column],
            Dto: this.personal[0][data[i].column],
          });
        }
      }
      if (this.updatearr.length !== 0) {
        api
          .post(`/saveupdate.php`, {
            data: this.updatearr,
          })
          .then((response) => {
            const returnarr = response.data.return;

            if (returnarr) {
              this.updatearr = this.updatearr.filter((obj) => {
                // Assuming column is the property to match
                return returnarr.every(
                  (returnObj) => obj.column !== returnObj.column
                );
              });
            }

            if (this.updatearr.length == 0) {
              this.alertmessage =
                "The updates you requested have already been processed! please check the Updates History for more information about your update requests.";
              this.alert = true;
            } else {
              if (returnarr) {
                this.alertmessage =
                  "Some of the updates you requested have already been processed! please check the Updates History for more information about your update requests.";
                this.alert = true;

                this.sessionID = response.data.sessionID;
                // this.dialog = true;
              } else {
                this.sessionID = response.data.sessionID;
                this.dialog = true;
              }
            }
          })
          .catch((error) => {
            console.log("error=", error);
          });
      }
    },

    async addchildren() {
console.log("img=>",this.fileimage)
      if (!this.fileimage) {

        this.smalltitle = "Error!";
        this.smallmessage =
          "You need to upload a suppporting document in image format.";
        this.small = true;
        return
      }
      const store = useUserInfoStore();

      let Form = new FormData();
      console.log("ControlNo=", this.controlno);
      Form.append("ControlNo", this.controlno);
      Form.append("ChildName", this.name);
      Form.append("BirthDate", this.dateofbirth);
      Form.append("type", "Add");
      Form.append("status", "PENDING");
      Form.append("file", this.fileimage);
      store.savechildren(Form).then((res) => {
        console.log("res=", res);
        if (res == 1) {
          this.secondDialog = false;
          this.smalltitle = "Requested!";
          this.smallmessage = "The request for update has been sent to the HR.";
          this.small = true;
          // this.personal[0].children.push({
          //   ChildName: this.name,
          //   BirthDate: this.dateofbirth,
          // });
        } else if (res == 2) {
          this.secondDialog = false;
          this.smalltitle = "Duplicate Entry!";
          this.smallmessage =
            "The request for update has already been sent to the HR, Please check the Request history for more information.";
          this.small = true;
        } else {
          this.secondDialog = false;
          this.smalltitle = "Error!";
          this.smallmessage = "Please contact the PMD Team on local number 501";
          this.small = true;
        }
      });

      this.name = "";
      this.dateofbirth = "";
    },
    addchilddialog() {
      this.fileimage = null;
      this.fileimagesrc = null;
      this.name = "";
      this.dateofbirth = "";
      this.secondDialog = true;
    },
    deleteChildren(childrenid) {
      this.ChildrenID = childrenid.PMID;
      this.DeleteChildrenDialog = true;
    },
    deleteChildrenFinal() {
      // console.log("Children ID =>", this.ChildrenID);
      // console.log("Children ID =>", this.personal.controlno);

      const loginstore = useLoginStore();
      const user = new FormData();
      user.append("controlno", loginstore.controlno);
      const store = useUserInfoStore();
      const data = new FormData();
      data.append("tablename", "children");
      data.append("id", this.ChildrenID);
      store.deletedata(data).then(() => {
        loginstore.userdetails(user).then(() => {
          // console.log("new data=",loginstore.userinfo)

          // console.log("old children=", this.personal[0].children)
          this.personal = loginstore.userinfo.map((item) => ({ ...item }));
          // console.log("new children=", this.personal[0].children)
        });
      });
      // store.deleteChild(this.ChildrenID._id, t)
      // this.DeleteChildrenDialog = false;
      // const store = useUserInfoStore
    },
  },
};
</script>
