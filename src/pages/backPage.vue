<template>
  <div>
    <q-card>
      <q-card-section>
        34. Are you related by consanguinity or affinity to the appointing or
        recommending authority, or to the chief of bureau or office or to the
        person who has immediate supervision over you in the Office, Bureau or
        Department where you will be apppointed,
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">a. within the third degree?</label>
          <q-radio v-model="personal[0].Q1" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].Q1" val="NO" label="No" inline />
        </div>
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">b. within the fourth degree (for Local Government Unit - Career
            Employees)?</label>
          <q-radio v-model="personal[0].Q11" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].Q11" val="NO" label="No" inline />
        </div>
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <q-input v-if="personal[0].Q11 == 'YES'" v-model="personal[0].R11" filled label="If Yes, give details"
            class="q-pa-sm" dense type="" />
        </div>
      </q-card-section>
      <q-card-section>
        35. a. Have you ever been found guilty of any administrative offense?

        <q-radio v-model="personal[0].Q4" val="YES" label="Yes" inline />
        <q-radio v-model="personal[0].Q4" val="NO" label="No" inline />
        <q-input v-if="personal[0].Q4 == 'YES'" v-model="personal[0].R4" filled label="If Yes, give details"
          class="q-pa-sm" dense type="" />

        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">b. Have you been criminally charged before any court?</label>
          <q-radio v-model="personal[0].Q7" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].Q7" val="NO" label="No" inline />
          <q-input v-if="personal[0].Q7 == 'YES'" v-model="personal[0].R7" filled label="If Yes, give details"
            class="q-pa-sm" dense type="" />
        </div>
      </q-card-section>
      <q-card-section>
        36. Have you ever been convicted of any crime or violation of any law,
        decree, ordinance or regulation by any court or tribunal?
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <q-radio v-model="personal[0].Q3" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].Q3" val="NO" label="No" inline />
          <q-input v-if="personal[0].Q3 == 'YES'" v-model="personal[0].R3" filled label="If Yes, give details"
            class="q-pa-sm" dense type="" />
        </div>
      </q-card-section>
      <q-card-section>
        37. Have you ever been separated from the service in any of the
        following modes: resignation, retirement, dropped from the rolls,
        dismissal, termination, end of term, finished contract or phased out
        (abolition) in the public or private sector?
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <q-radio v-model="personal[0].Q5" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].Q5" val="NO" label="No" inline />
          <q-input v-if="personal[0].Q5 == 'YES'" v-model="personal[0].R5" filled label="If Yes, give details"
            class="q-pa-sm" dense type="" />
        </div>
      </q-card-section>
      <q-card-section>
        38. a. Have you ever been a candidate in a national or local election
        held within the last year (except Barangay election)?
        <q-radio v-model="personal[0].Q6" val="YES" label="Yes" inline />
        <q-radio v-model="personal[0].Q6" val="NO" label="No" inline />
        <q-input v-if="personal[0].Q6 == 'YES'" v-model="personal[0].R6" filled label="If Yes, give details"
          class="q-pa-sm" dense type="" />
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">b. Have you resigned from the government service during the three
            (3)-month period before the last election to promote/actively
            campaign for a national or local candidate?</label>
          <q-radio v-model="personal[0].local" val="1" label="Yes" inline />
          <q-radio v-model="personal[0].local" val="0" label="No" inline />
          <q-input v-if="personal[0].local == '1'" v-model="personal[0].localdetails" filled
            label="If Yes, give details" class="q-pa-sm" dense type="" />
        </div>
      </q-card-section>
      <q-card-section>
        39. Have you acquired the status of an immigrant or permanent resident
        of another country?
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <q-radio v-model="personal[0].country" val="1" label="Yes" inline />
          <q-radio v-model="personal[0].country" val="0" label="No" inline />
          <q-input v-if="personal[0].country == '1'" v-model="personal[0].countrydetails" filled
            label="If Yes, give details" class="q-pa-sm" dense type="" />
        </div>
      </q-card-section>
      <q-card-section>
        40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta
        for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000
        (RA 8972), please answer the following items:
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">a. Are you a member of any indigenous group?</label>
          <q-radio v-model="personal[0].IP" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].IP" val="NO" label="No" inline />
          <q-select v-if="personal[0].IP == 'YES'" filled v-model="personal[0].IPR" use-input dense input-debounce="0"
            label="Indigenous People" :options="indigenousGroup" @filter="filterIndigenous" behavior="menu" />
        </div>
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">b. Are you a person with disability?</label>
          <q-radio v-model="personal[0].PWD" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].PWD" val="NO" label="No" inline />
          <div v-if="personal[0].PWD == 'YES'">
            <label for="Address" class="q-mb-md q-ml-lg q-mt-md">Types of Disabilities:
            </label>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-checkbox v-model="personal[0].Psychosocial" label="Psychosocial Disability" />
                <q-checkbox v-model="personal[0].Chronic" label="Disability Caused by Chronic Illness" />
                <q-checkbox v-model="personal[0].Learning" label="Learning Disability" />
                <q-checkbox v-model="personal[0].Mental" label="Mental Disability" />
                <q-checkbox keep-color v-model="personal[0].Visual" label="Visual Disability" />
                <q-checkbox keep-color v-model="personal[0].Orthopedic" label="Orthopedic Disability" />
                <q-checkbox keep-color v-model="personal[0].Communication" label="Communication Disability" />
              </div>
            </div>
          </div>
        </div>
        <div class="q-gutter-sm q-mr-md col-md-6 col-xs-12">
          <label for="sex" class="q-ml-lg">c. Are you a solo parent?</label>
          <q-radio v-model="personal[0].SoloP" val="YES" label="Yes" inline />
          <q-radio v-model="personal[0].SoloP" val="NO" label="No" inline />
        </div>
        <div class="row justify-center">
          <div class="col-md-4 col-xs-6 q-mb-sm">
            <q-btn color="primary" @click="Savedata()" label="Request for update" />
          </div>
        </div>
        <q-separator></q-separator>
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="text-h6">
            REFERENCES
            <q-btn label="Add" @click="ReferenceDialog = true"></q-btn>
          </div>
        </q-card-section>
        <q-table class="my-sticky-header-table text-uppercase" flat bordered title="" dense :rows="reference"
          :columns="columns" row-key="id">
          <template v-slot:body-cell-actions="{ row }">
            <div class="actionsbtn">
              <q-btn icon="delete" flat round color="deep-orange" @click="deleteReference(row)">
              </q-btn>
            </div>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <label for="ID">Picture</label>
        <!-- <q-input
          @update:model-value="
            (val) => {
              file = val[0];
            }
          "
          filled
          type="file"
          hint="Native file"
        /> -->
        <!-- <q-file
          style="max-width: 300px"
          v-model="image"
          filled
          label="Choose new Image"

          @update:model-value="handleupload()"
        />
        <div>
          <q-img
            :src="imgurl"
            spinner-color="white"
            style="
              height: 2in;
              max-width: 2in;
              border-color: black;
              border-radius: 10%;
              border-width: 2%;
              border-style: solid;
            "
          />
        </div> -->

        <div>
          <q-btn type="button" label="Change PDS Picture" @click="changepic = true"></q-btn>
        </div>
        <div>
          <q-img :src="imageUrlPDS" spinner-color="white" style="
              height: 2in;
              max-width: 2in;
              border-color: black;
              border-radius: 10%;
              border-width: 2%;
              border-style: solid;
            "></q-img>
        </div>
      </q-card-section>
    </q-card>

    <!-- DIALOG FOR REFERENCE DELETE -->
    <q-dialog v-model="DeleteReferenceDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Reference</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this Reference?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-orange" />
          <q-btn flat label="OK" @click="deleteReferenceFinal()" class="text-green" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="ReferenceDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add Reference Details</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input filled v-model="Name" label="Reference Name" dense class="q-pa-sm text-uppercase" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input filled v-model="Address" label="Address" dense class="q-pa-sm text-uppercase" />
            </div>
            <div class="col">
              <q-input filled v-model="ContactNo" label="Contact No. / Telephone No." dense
                class="q-pa-sm text-uppercase" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
          <q-btn label="Request Update" color="secondary" size="md" v-close-popup @click="addreference()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div>
      <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale" full-width>
        <q-card class="bg-teal text-white">
          <q-card-section>
            <div class="text-h6">UPDATES</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div>
              <q-table class="my-sticky-header-table" flat bordered title="Updates" dense :rows="updatearr"
                :columns="updatecolumns" row-key="id"></q-table>
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
    <div>
      <q-dialog v-model="changepic" persistent transition-show="scale" transition-hide="scale">
        <q-card>
          <q-card-section>
            <div class="text-h6">Change PDS Picture</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row">
              <div class="col">
                <div>
                  <q-file style="display: none" v-model="image" @update:model-value="handleUpload"
                    accept=".jpg, image/*" ref="file"></q-file>
                </div>
                <div class="q-ml-lg">
                  <q-btn type="button" label="Upload Photo" @click="handleUploadBtnClick"></q-btn>
                </div>
                <div>
                  <q-img :src="imageUrl" spinner-color="white" style="
                      height: 2in;
                      max-width: 2in;
                      border-color: black;
                      border-radius: 10%;
                      border-width: 2%;
                      border-style: solid;
                    "></q-img>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
            <q-btn label="Request Update" color="secondary" size="md" v-close-popup @click="savePic()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import {useLoginStore} from "../stores/LoginStore.js";
import {useUserInfoStore} from "src/stores/AdditionalStore";
import {ref} from "vue";
import {api, server} from "boot/axios";

const stringIndigenous = [
  "IGOROT",
  "MANGYAN",
  "IBALOI",
  "TAGBANWA",
  "MANDAYA",
  "IFUGAO PEOPLE",
  "BATAK PEOPLE",
  "MORO PEOPLE",
  "TAUSUG PEOPLE",
  "KALINGA",
  "VISAYANS",
  "SAMA-BAJAU",
  "MAMANWA",
  "PALAWAN PEOPLE",
  "TBOLI PEOPLE",
  "ILOCANO PEOPLE",
  "LUMAD",
  "NEGRITO",
  "BLAAN PEOPLE",
  "BUKIDNON",
  "AETA PEOPLE",
  "TAGABAWA",
  "BICOLANO PEOPLE",
  "BONTOC PEOPLE",
  "MANSAKA",
];
export default {
  data() {
    return {
      DeleteReferenceDialog: false,
      ReferenceID: "",
      alert: false,
      dialog: false,
      Name: "",
      Address: "",
      ContactNo: "",
      controlno: "",
      personal: [],
      reference: [],
      ReferenceDialog: false,
      columns: [
        {
          name: "Name",
          align: "left",
          label: "Name",
          field: "Names",
          sortable: true,
        },
        {
          name: "Address",
          align: "center",
          label: "Address",
          field: "Address",
          sortable: true,
        },
        {
          name: "ContactNo",
          align: "center",
          label: "Contact Number",
          field: "TelNo",
          sortable: true,
        },
        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "left",
        },
      ],
      updatecolumns: [
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
      images: [],
      imagesurl: [],
      small: false,
      smallmessage: "",
      smalltitle: "",
      changepic: false,
    };
  },
  created() {
    const userstore = useLoginStore();
    this.controlno = userstore.controlno;
    this.personal = userstore.userinfo.map((item) => ({ ...item }));
    this.reference = userstore.userreference.map((item) => ({ ...item }));
    if (this.personal[0].Chronic == null) {
      this.personal[0].Chronic = false;
      userstore.userinfo[0].Chronic = false;
    }
    if (this.personal[0].Psychosocial == null) {
      this.personal[0].Psychosocial = false;
      userstore.userinfo[0].Psychosocial = false;
    }
    if (this.personal[0].Learning == null) {
      this.personal[0].Learning = false;
      userstore.userinfo[0].Learning = false;
    }
    if (this.personal[0].Mental == null) {
      this.personal[0].Mental = false;
      userstore.userinfo[0].Mental = false;
    }
    if (this.personal[0].Visual == null) {
      this.personal[0].Visual = false;
      userstore.userinfo[0].Visual = false;
    }
    if (this.personal[0].Orthopedic == null) {
      this.personal[0].Orthopedic = false;
      userstore.userinfo[0].Orthopedic = false;
    }
    if (this.personal[0].Communication == null) {
      this.personal[0].Communication = false;

      userstore.userinfo[0].Communication = false;
    }
    console.log("userinfo=", this.personal);
  },
  setup() {
    const indigenousGroup = ref(stringIndigenous.sort());
    const store = useLoginStore();
    const image = ref(null);
    const imageUrl = ref("");
    const file = ref(null);
    const imageUrlPDS = ref("");
    const handleUpload = () => {
      if (image.value) {
        imageUrl.value = URL.createObjectURL(image.value);
      }
    };

    const handleUploadBtnClick = () => {
      file.value.pickFiles();
    };

    if (store.pics) {
      imageUrlPDS.value = `${server}/Pics/${store.img}`;
    }

    return {
      imageUrlPDS,
      imageUrl,
      image,
      handleUpload,
      handleUploadBtnClick,
      file,
      store,
      indigenousGroup,
      filterIndigenous(val, update) {
        if (val === "") {
          update(() => {
            indigenousGroup.value = stringIndigenous;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          indigenousGroup.value = stringIndigenous.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  methods: {
    savePic() {
      if (this.image) {
        const store = useUserInfoStore();
        let Form = new FormData();

        Form.append("ControlNo", this.controlno);
        Form.append("file", this.image);
        store.savePic(Form).then((res) => {
          if (res == 1) {
            this.changepic = false;
            this.smalltitle = "Requested!";
            this.smallmessage =
              "The request for update has been sent to the HR.";
            this.small = true;
            this.imageUrl = "";
          } else if (res == 2) {
            this.changepic = false;
            this.smalltitle = "Duplicate Entry!";
            this.smallmessage =
              "The request for update has already been sent to the HR, Please check the Request history for more information.";
            this.small = true;
            this.imageUrl = "";
          } else {
            this.changepic = false;
            this.smalltitle = "Error!";
            this.smallmessage =
              "Please contact the PMD Team on local number 501";
            this.small = true;
          }
        });
      } else {
        this.smalltitle = "ERROR!";
        this.smallmessage = "No Image found!";
        this.small = true;
      }
    },
    addreference() {
      const store = useUserInfoStore();
      let Form = new FormData();

      Form.append("ControlNo", this.controlno);
      Form.append("names", this.Name);
      Form.append("address", this.Address);
      Form.append("telno", this.ContactNo);
      Form.append("status", "PENDING");

      store.savereference(Form).then((res) => {
        console.log("res=", res);
        if (res == 1) {
          this.ReferenceDialog = false;
          this.smalltitle = "Requested!";
          this.smallmessage = "The request for update has been sent to the HR.";
          this.small = true;
        } else if (res == 2) {
          this.ReferenceDialog = false;
          this.smalltitle = "Duplicate Entry!";
          this.smallmessage =
            "The request for update has already been sent to the HR, Please check the Request history for more information.";
          this.small = true;
        } else {
          this.ReferenceDialog = false;
          this.smalltitle = "Error!";
          this.smallmessage = "Please contact the PMD Team on local number 501";
          this.small = true;
        }
      });

      this.Name = "";
      this.Address = "";
      this.ContactNo = "";
    },
    handleupload() {
      this.imagesurl = [];

      for (let i = 0; i < this.images.length; i++) {
        const dummyimg = URL.createObjectURL(this.images[i]);
        this.imagesurl.push(dummyimg);
      }
    },
    opendialog() {
      if (this.updatearr.length !== 0) {
        this.dialog = true;
      }
    },
    Savedata() {
      console.log("savedate");
      this.updatearr = [];

      const labelarray = [
        { name: "third degree", column: "Q1" },
        { name: "fourth degree details", column: "R11" },
        { name: "fourth degree", column: "Q11" },
        { name: "third degree details", column: "R1" },
        { name: "any court or tribunal", column: "Q3" },
        { name: "any court or tribunal details", column: "R3" },
        { name: "administrative offense", column: "Q4" },
        { name: "administrative offense details", column: "R4" },
        {
          name: "phased out(abolition) in the public or private sector?",
          column: "Q5",
        },
        {
          name: "phased out(abolition) in the public or private sector? details",
          column: "R5",
        },
        {
          name: "local election held within the last year (except Barangay election)?",
          column: "Q6",
        },
        {
          name: "local election held within the last year (except Barangay election)? details",
          column: "R6",
        },
        { name: "criminally charged before any court", column: "Q7" },
        { name: "criminally charged before any court details", column: "R7" },
        { name: "Local", column: "local" },
        { name: "Local Details", column: "localdetails" },
        { name: "Country", column: "country" },
        { name: "Country Details", column: "countrydetails" },
        { name: "IP", column: "IP" },
        { name: "IP Reason", column: "IPR" },
        { name: "PWD", column: "PWD" },
        { name: "Chronic", column: "chronic" },
        { name: "Psychosocial", column: "Psychosocial" },
        { name: "Orthopedic", column: "Orthopedic" },
        { name: "Communication", column: "Communication" },
        { name: "Learning", column: "Learning" },
        { name: "Mental", column: "Mental" },
        { name: "Visual", column: "Visual" },
        { name: "Solo Parent", column: "SoloP" },
      ];

      const store = useLoginStore();

      for (let i = 0; i < labelarray.length; i++) {
        if (
          this.personal[0][labelarray[i].column] !=
          store.userinfo[0][labelarray[i].column]
        ) {
          //open dialog for image input
          const labelname = labelarray.find(
            (item) => item.column == labelarray[i]
          );
          // console.log("data[i]",data[i])
          // console.log("labelnam=",labelname)

          this.updatearr.push({
            Controlno: this.controlno,
            type: "Edit",
            label: labelarray[i].name,
            column: labelarray[i].column,
            Dfrom: store.userinfo[0][labelarray[i].column],
            Dto: this.personal[0][labelarray[i].column],
          });
        }
      }

      if (this.updatearr.length != 0) {
        api
          .post(`/saveupdate.php`, {
            data: this.updatearr,
          })
          .then((response) => {
            console.log("response=", response.data);
            const returnarr = response.data.return;

            // let updatearr2 = [];
            // for (let i = 0; i < returnarr.length; i++) {
            //   if (this.updatearr[i].column == returnarr[i].column) {
            //     this.updatearr2 = this.updatearr.filter(
            //       (obj) => obj.column !== returnarr[i].column
            //     );
            //   }
            // }
            // this.updatearr = updatearr2;

            this.updatearr = this.updatearr.filter((obj) => {
              // Assuming column is the property to match
              return returnarr.every(
                (returnObj) => obj.column !== returnObj.column
              );
            });
            // console.log("updatearr=", this.updatearr);
            // console.log("returnarr=", returnarr);
            if (this.updatearr.length == 0) {
              this.alertmessage =
                "The updates you requested have already been processed! please check the Updates History for more information about your update requests.";
              this.alert = true;
            } else {
              if (returnarr.length !== 0) {
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
    deleteReference(referenceid) {
      this.ReferenceID = referenceid.PMID;
      this.DeleteReferenceDialog = true;
    },
    deleteReferenceFinal() {
      console.log("Reference ID =>", this.ReferenceID);
      // const store = useUserInfoStore
      const loginstore = useLoginStore();
      const user = new FormData();
      user.append("controlno", loginstore.controlno);
      const store = useUserInfoStore();
      const data = new FormData();
      data.append("tablename", "reference");
      data.append("id", this.ReferenceID);
      store.deletedata(data).then(() => {
        loginstore.userdetails(user).then(() => {
          // console.log("new data=", loginstore.usereducation)
          // this.organization = loginstore.userorganization;
          this.reference = loginstore.userreference.map((item) => ({
            ...item,
          }));

          // console.log("old children=", this.personal[0].children)
          // this.personal = loginstore.userinfo.map((item) => ({ ...item }))
          // console.log("new children=", this.personal[0].children)
        });
      });
    },
  },
};
</script>
