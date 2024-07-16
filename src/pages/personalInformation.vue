<template>
  <div>
    <q-card>
      <q-form ref="personal" lazy-rules>
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <q-input
              ref="lastname"
              lazy-rules
              filled
              label="Lastname"
              dense
              class="q-pa-sm"
              v-model="personal[0].Surname"
              style="text-transform: uppercase"
              :rules="inputRules"
            />
          </div>
          <div class="col-md-6 col-xs-12">
            <q-input
              filled
              label="Middlename"
              dense
              class="q-pa-sm"
              v-model="personal[0].MIddlename"
              style="text-transform: uppercase"
            />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-input
              ref="firstname"
              lazy-rules
              filled
              label="Firstname"
              class="q-pa-sm"
              dense
              v-model="personal[0].Firstname"
              style="text-transform: uppercase"
              :rules="inputRules"
            />
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
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div> -->

          <div class="col-md-6 col-xs-6">
            <q-input
              ref="bday"
              lazy-rules
              v-model="personal[0].Bday"
              filled
              label="Date of Birth"
              dense
              class="q-pa-sm"
              type="date"
              :rules="inputRules"
            />
          </div>
          <div class="col-md-6 col-xs-6">
            <q-input
              filled
              label="Place of Birth"
              class="q-pa-sm"
              dense
              v-model="personal[0].BirthPlace"
              style="text-transform: uppercase"
            />
          </div>

          <div class="col-md-6 col-xs-6">
            <q-select
              class="q-pa-sm"
              filled
              v-model="personal[0].Sex"
              dense
              input-debounce="0"
              label="Sex"
              :options="sexOptions"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-md-6 col-xs-6">
            <q-select
              ref="civilstatus"
              lazy-rules
              class="q-pa-sm"
              filled
              v-model="personal[0].CivilStatus"
              :rules="inputRules"
              dense
              input-debounce="0"
              label="Civil Status"
              :options="status"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-md-6 col-xs-6">
            <q-select
              ref="gender"
              class="q-pa-sm"
              lazy-rules
              filled
              v-model="personal[0].gender"
              :rules="inputRules"
              dense
              input-debounce="0"
              label="Gender Preference"
              :options="genderPreference"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-md-3 col-xs-3">
            <q-input
              :rules="numberValidationRule"
              filled
              label="Height (m)"
              dense
              class="q-pa-sm"
              v-model="personal[0].Heights"
            />
          </div>
          <div class="col-md-3 col-xs-3">
            <q-input
              :rules="numberValidationRule"
              filled
              label="Weight (kg)"
              class="q-pa-sm"
              dense
              v-model="personal[0].Weights"
            />
          </div>
          <div class="col-md-2 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              filled
              label="Blood Type"
              class="q-pa-sm"
              dense
              v-model="personal[0].BloodType"
            />
          </div>
          <div class="col-md-2 col-xs-6">
            <q-input
              filled
              label="Telephone Number"
              class="q-pa-sm"
              dense
              v-model="personal[0].TelNo"
            />
          </div>
          <div class="col-md-2 col-xs-6">
            <q-input
              filled
              label="Cellphone Number"
              class="q-pa-sm"
              dense
              v-model="personal[0].CellphoneNo"
            />
          </div>
          <div class="col-md-6 col-xs-6">
            <q-input
              filled
              label="Email Address"
              class="q-pa-sm"
              type="email"
              dense
              v-model="personal[0].EmailAdd"
            />
          </div>
        </div>
        <q-separator inset></q-separator>
        <div class="row">
          <div class="col-md-4 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              filled
              label="GSIS ID NO."
              dense
              class="q-pa-sm"
              v-model="personal[0].GSISNo"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              filled
              label="PAGIBIG ID NO."
              class="q-pa-sm"
              dense
              v-model="personal[0].PAGIBIGNo"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              filled
              label="PHILHEALTH ID NO."
              class="q-pa-sm"
              dense
              v-model="personal[0].PHEALTHNo"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              filled
              label="SSS NO."
              dense
              class="q-pa-sm"
              v-model="personal[0].SSSNo"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              filled
              label="TIN NO."
              class="q-pa-sm"
              dense
              v-model="personal[0].TINNo"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              :disable="true"
              v-model="personal[0].ControlNo"
              filled
              label="AGENCY EMPLOYEE NO."
              class="q-pa-sm"
              dense
              type=""
            />
          </div>
        </div>
        <q-separator inset></q-separator>
        <div class="row">
          <div class="col-md-6 col-xs-12 q-pa-sm">
            <q-select
              filled
              v-model="cit"
              dense
              input-debounce="0"
              label="Citizenship"
              :options="citizenship"
              style="min-width: 70%; max-width: 98%"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-md-6 col-xs-6 q-pa-sm" v-if="cit == 'FILIPINO'">
            <q-radio
              v-model="personal[0].citizenshipStatus"
              val="byBirth"
              label="by birth"
              inline
            />
            <q-radio
              v-model="personal[0].citizenshipStatus"
              val="byNaturalization"
              label="by naturalization"
              inline
            />
          </div>
          <div
            class="col-md-6 col-xs-6"
            v-if="
              cit == 'DUAL CITIZENSHIP' ||
              personal[0].citizenshipStatus == 'byNaturalization'
            "
          >
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].birthcountry"
              filled
              label="Please Indicate Country"
              class="q-pa-sm"
              dense
              type=""
            />
          </div>
        </div>
        <q-separator inset></q-separator>
        <!-- <label for="Address" class="q-mb-md q-ml-lg q-mt-md"
          >Types of Disabilities:
        </label>
        <div class="q-pa-md">
          <div class="q-gutter-sm">
            <q-checkbox
              v-model="Psychosocial"
              label="Psychosocial Disability"
            />
            <q-checkbox
              v-model="Chronic"
              label="Disability Caused by Chronic Illness"
            />
            <q-checkbox v-model="Learning" label="Learning Disability" />
            <q-checkbox v-model="Mental" label="Mental Disability" />
            <q-checkbox keep-color v-model="Visual" label="Visual Disability" />
            <q-checkbox
              keep-color
              v-model="Orthopedic"
              label="Orthopedic Disability"
            />
            <q-checkbox
              keep-color
              v-model="Communication"
              label="Communication Disability"
            />
          </div>
        </div> -->
        <!-- <q-separator inset /> -->
        <div class="row">
          <!-- <div class="col-md-6 col-xs-6 q-pa-sm">
            <label for="Address"
              >Indigenous Groups:
            </label>
            <div class="">
              <q-select
                filled
                v-model="selectedIndigenous"
                use-input
                dense
                input-debounce="0"
                label="Indigenous People"
                :options="indigenousGroup"
                @filter="filterIndigenous"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div> -->
          <div class="col-md-6 col-xs-6 q-pa-sm">
            <label for="Address">Religious Sector: </label>
            <div class="">
              <q-select
                filled
                v-model="personal[0].Religion"
                :rules="inputRules"
                lazy-rules
                dense
                input-debounce="0"
                label="Religious Sector"
                :options="religion"
                @filter="filterFn"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div class="col-md-6 col-xs-6 q-pa-sm" style="margin-top: 14px">
            <div></div>
            <div>
              <q-input
                v-if="personal[0].Religion == 'OTHER RELIGIOUS AFFILIATIONS'"
                v-model="selectedReligion"
                filled
                label="Other Religious Affiliations"
                class="q-pa-sm"
                dense
                style="text-transform: uppercase"
              />
            </div>
          </div>

          <!-- <div class="col-md-6 col-xs-6 q-pa-sm">
            <label for="Address">Are you a Solo Parent: </label>
            <div>
              <q-radio v-model="soloparent" val="1" label="YES" inline />
              <q-radio v-model="soloparent" val="0" label="NO" inline />

            </div>
          </div> -->
        </div>

        <q-separator inset />
        <label for="Address" class="q-mb-md q-ml-sm q-mt-md"
          >Residential Address:
        </label>
        <div class="row">
          <div class="col-md-4 col-xs-6">
            <q-select
              :rules="inputRules"
              lazy-rules
              filled
              label="Region"
              v-model="personal[0].Rregion"
              :options="regionOptions"
              :option-label="(region) => region.region_name"
              :option-value="(region) => region.region_name"
              emit-value
              map-options
              @update:model-value="handleRRegionChange(1)"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="Province"
              v-model="personal[0].Rprovince"
              :options="provinceOptions"
              @update:model-value="handleRRegionChange(2)"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="City/Municipality"
              v-model="personal[0].Rcity"
              :options="cityOptions"
              @update:model-value="handleRRegionChange(3)"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="Barangay"
              v-model="personal[0].Rbarangay"
              :options="brgyOptions"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Rsubdivision"
              filled
              label="Subdivision/Village"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Rstreet"
              filled
              label="Street/Purok"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-8 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Rhouse"
              filled
              label="House/Block/Lot No."
              dense
              class="q-pa-sm"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              v-model="personal[0].Rzip"
              filled
              label="ZIP CODE"
              class="q-pa-sm"
              dense
            />
          </div>
        </div>

        <label for="Address" class="q-mb-md q-ml-sm q-mt-md"
          >Permanent Address:
        </label>
        <q-checkbox
          @update:model-value="address()"
          v-model="permanentAddress"
          label="Same as Residential Address"
          size="xs"
          true-value="yes"
          false-value="no"
        />
        <div class="row">
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="Region"
              v-model="personal[0].Pregion"
              :options="regionOptions"
              :option-label="(region) => region.region_name"
              :option-value="(region) => region.region_name"
              emit-value
              map-options
              @update:model-value="handleRRegionChange(4)"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="Province"
              v-model="personal[0].Pprovince"
              :options="PprovinceOptions"
              @update:model-value="handleRRegionChange(5)"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="City/Municipality"
              v-model="personal[0].Pcity"
              @update:model-value="handleRRegionChange(6)"
              :options="PcityOptions"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-select
              lazy-rules
              :rules="inputRules"
              filled
              label="Barangay"
              v-model="personal[0].Pbarangay"
              :options="PbrgyOptions"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Psubdivision"
              filled
              label="Subdivision/Village"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Pstreet"
              filled
              label="Street/Purok"
              class="q-pa-sm"
              dense
            />
          </div>
          <div class="col-md-8 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Phouse"
              filled
              label="House/Block/Lot No."
              dense
              class="q-pa-sm"
            />
          </div>
          <div class="col-md-4 col-xs-6">
            <q-input
              style="text-transform: uppercase"
              v-model="personal[0].Pzip"
              filled
              label="ZIP CODE"
              class="q-pa-sm"
              dense
            />
          </div>
        </div>
      </q-form>
    </q-card>
    <div class="row justify-center text-center">
      <div class="col-md-4 col-xs-6 q-mt-md">
        <q-btn color="primary" @click="Savedata()" label="Request for update" />
      </div>
    </div>
    <div>
      <q-dialog
        v-model="dialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
        full-width
      >
        <q-card class="bg-teal text-white">
          <q-card-section>
            <div class="text-h6">UPDATES</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div>
              <q-table
                class="my-sticky-header-table"
                flat
                bordered
                title="Updates"
                dense
                :rows="updatearr"
                :columns="columns"
                row-key="id"
              ></q-table>
            </div>
            <div>
              Please upload supporting document
              <q-file
                v-model="images"
                label="Select an Image"
                multiple
                append
                accept=".jpg, image/*"
                use-chips
                @update:model-value="handleupload"
              />
              <div v-if="images.length > 0">
                <q-img
                  v-for="(file, index) in imagesurl"
                  :key="index"
                  :src="file"
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
            <q-btn
              flat
              label="OK"
              color="primary"
              v-close-popup
              @click="opendialog()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useLoginStore} from "src/stores/LoginStore";
import {useWatchStore} from "src/stores/WatchStore";
import philippines from "assets/philippines.json";
import {api} from "boot/axios";

const stringReligions = [
  "ROMAN CATHOLIC",
  "ISLAM",
  "IGLESIA NI CRISTO",
  "PHILIPPINE INDEPENDENT CHURCH",
  "JESUS MIRACLE CRUSADE INTERNATIONAL MINISTRY",
  "SEVENTH-DAY ADVENTIST",
  "BIBLE BAPTIST CHURCH",
  "UNITED CHURCH OF CHRIST IN THE PHILIPPINES",
  "JEHOVA'S WITNESSES",
  "CHURCH OF CHRIST",
  "PROTESTANTISM",
  "MEMBERS OF GOD CHURCH INTERNATIONAL",
  "MOST HOLY CHURCH OF GOD IN CHRIST JESUS",
  "APOSTOLIC CATHOLIC CHURCH",
  "ORTHODOXY",
  "THE CHURCH OF JESUS CHRIST OF LATTER-DAY SAINTS",
  "OTHER RELIGIOUS AFFILIATIONS",
];
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
      alertmessage: "",
      alert: false,
      sessionID: "",
      inputRules: [(v) => !!v || "Field is required"],
      personal: [],
      numberValidationRule: [
        (val) => /^[0-9.]*$/.test(val) || "Only numbers and dots are allowed",
      ],
      stringReligion: stringReligions,
      stringIndigenous: [],
      permanentAddress: "no",
      cit: "",
      Gender: "",
      byBirth: false,
      citizenshipStatus: "",
      byNaturalization: false,
      Psychosocial: false,
      Chronic: false,
      Learning: false,
      Mental: false,
      Visual: false,
      Orthopedic: false,
      Communication: false,
      status: ["SINGLE", "MARRIED", "WIDOWED", "SEPARATED", "OTHER/S"],
      citizenship: ["FILIPINO", "DUAL CITIZENSHIP"],
      sexOptions: ["MALE", "FEMALE"],
      genderPreference: [
        "MAN",
        "WOMAN",
        "LESBIAN",
        "GAY",
        "BISEXUAL",
        "TRANSGENDER",
        "QUEER",
        "INTERSEX",
        "ASEXUAL",
        "+",
      ],
      extension: ["JR.", "SR.", "III", "IV"],
      controlno: "",
      model: "",
      Sexvalue: "",
      phil: philippines,
      region: "",
      soloparent: "0",
      updatearr: [],
      dialog: false,
      columns: [
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
    };
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
    handleupload() {
      this.imagesurl = [];

      for (let i = 0; i < this.images.length; i++) {
        const dummyimg = URL.createObjectURL(this.images[i]);
        this.imagesurl.push(dummyimg);
      }
    },
    handleRRegionChange(level) {
      if (level == 1) {
        this.personal[0].Rprovince = "";
        this.personal[0].Rcity = "";
        this.personal[0].Rbarangay = "";
      } else if (level == 2) {
        this.personal[0].Rcity = "";
        this.personal[0].Rbarangay = "";
      } else if (level == 3) {
        this.personal[0].Rbarangay = "";
      } else if (level == 4) {
        this.personal[0].Pprovince = "";
        this.personal[0].Pcity = "";
        this.personal[0].Pbarangay = "";
      } else if (level == 5) {
        this.personal[0].Pcity = "";
        this.personal[0].Pbarangay = "";
      } else {
        this.personal[0].Pbarangay = "";
      }
    },
    async Savedata() {
      let isValid = await this.$refs.personal.validate();
      this.updatearr = [];
      if (isValid) {
        const labelarray = [
          { name: "Controlno", column: "ControlNo" },
          { name: "Lastname", column: "Surname" },
          { name: "Firstname", column: "Firstname" },
          { name: "Middlename", column: "MIddlename" },
          { name: "Sex", column: "Sex" },
          { name: "Civil Status", column: "CivilStatus" },
          { name: "TIN Number", column: "TINNo" },
          { name: "GSIS Number", column: "GSISNo" },
          { name: "PAGIBIG Number", column: "PAGIBIGNo" },
          { name: "SSS Number", column: "SSSNo" },
          { name: "PHEALTH Number", column: "PHEALTHNo" },
          { name: "Citizenship", column: "Citizenship" },
          { name: "Religion", column: "Religion" },
          { name: "Residential House", column: "Rhouse" },
          { name: "Residential Street", column: "Rstreet" },
          { name: "Residential Subdivision", column: "Rsubdivision" },
          { name: "Residential Barangay", column: "Rbarangay" },
          { name: "Residential City", column: "Rcity" },
          { name: "Residential Province", column: "Rprovince" },
          { name: "Residential Region", column: "Rregion" },
          { name: "Residential Zip Code", column: "Rzip" },
          { name: "Permanent Region", column: "Pregion" },
          { name: "Permanent House", column: "Phouse" },
          { name: "Permanent Street", column: "Pstreet" },
          { name: "Permanent Subdivision", column: "Psubdivision" },
          { name: "Permanent Barangay", column: "Pbarangay" },
          { name: "Permanent City", column: "Pcity" },
          { name: "Permanent Province", column: "Pprovince" },
          { name: "Permanent Zip Code", column: "Pzip" },
          { name: "Gender", column: "gender" },
          { name: "Citizenship Status", column: "citizenshipStatus" },
          { name: "Height", column: "Heights" },
          { name: "Weight", column: "Weights" },
          { name: "Blood Type", column: "BloodType" },
          { name: "Telephone Number", column: "TelNo" },
          { name: "Date of Birth", column: "Bday" },
          { name: "Place of Birth", column: "BirthPlace" },
          { name: "Email Address", column: "EmailAdd" },
          { name: "Cellphone Number", column: "CellphoneNo" },
        ];

        const store = useLoginStore();

        for (let i = 0; i < labelarray.length; i++) {
          const currentColumnValue =
            this.personal[0][labelarray[i].column] != null
              ? this.personal[0][labelarray[i].column].toString().toLowerCase()
              : "";
          const originalColumnValue =
            store.userinfo[0][labelarray[i].column] != null
              ? store.userinfo[0][labelarray[i].column].toString().toLowerCase()
              : "";
          if (currentColumnValue !== originalColumnValue) {
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
              if (returnarr) {
                this.updatearr = this.updatearr.filter((obj) => {
                  // Assuming column is the property to match
                  return returnarr.every(
                    (returnObj) => obj.column !== returnObj.column
                  );
                });
              }

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
      } //end of if(validate)

      // console.log("changedarr=",this.updatearr)
    },
    opendialog() {
      if (this.updatearr.length !== 0) {
        this.dialog = true;
      }
    },
    address() {
      if (this.permanentAddress == "no") {
        this.personal[0].Pregion = this.personal[0].Rregion;
        this.personal[0].Pprovince = this.personal[0].Rprovince;
        this.personal[0].Pcity = this.personal[0].Rcity;
        this.personal[0].Pbarangay = this.personal[0].Rbarangay;
        this.personal[0].Psubdivision = this.personal[0].Rsubdivision;
        this.personal[0].Pstreet = this.personal[0].Rstreet;
        this.personal[0].Phouse = this.personal[0].Rhouse;
        this.personal[0].Pzip = this.personal[0].Rzip;
      } else {
        this.personal[0].Pregion = "";
        this.personal[0].Pprovince = "";
        this.personal[0].Pcity = "";
        this.personal[0].Pbarangay = "";
        this.personal[0].Psubdivision = "";
        this.personal[0].Pstreet = "";
        this.personal[0].Phouse = "";
        this.personal[0].Pzip = "";
      }
    },
  },
  created() {
    const userstore = useLoginStore();
    this.personal = userstore.userinfo.map((item) => ({ ...item }));
    this.controlno = userstore.controlno;
    if (
      this.personal[0].Surname.includes("JR") ||
      this.personal[0].Surname.includes("SR") ||
      this.personal[0].Surname.includes(" III") ||
      this.personal[0].Surname.includes(" IV")
    ) {
      this.personal[0].Surname.replace(/\s(JR.|JR|SR|III| IV)$/, "");
      const regex = /\s(JR.|JR|SR|III| IV)$/;
      const matches = this.personal[0].Surname.match(regex);
      console.log("Matches=>", matches);
      this.model = matches.slice(1);
    } else {
      this.model = "N/A";
    }
    this.cit = this.personal[0].Citizenship;

    /*  if (this.personal[0].citizenshipStatus == "") {
      this.personal[0].citizenshipStatus = "byBirth";
    } */

    // console.log("religion=",this.personal[0].Religion)
    // console.log("religion=",this.stringReligion)
    // console.log("include=",this.stringReligion.includes(this.personal[0].Religion))
    if (this.stringReligion.includes(this.personal[0].Religion) == false) {
      this.selectedReligion = this.personal[0].Religion;
      this.personal[0].Religion = "OTHER RELIGIOUS AFFILIATIONS";
    }
    // console.log("personalinfo=",this.personal)
    // console.log("personalinfo2=",userstore.userinfo)
  },

  computed: {
    regionOptions() {
      // Extract the region names from the `phil` object
      return Object.values(this.phil);
      // .map(region => ({
      //   label: region.region_name,
      //   value: region.region_name
      // }));
    },
    provinceOptions() {
      // console.log("computed",this.region.province_list)
      if (this.personal[0].Rregion) {
        const regionObject = Object.values(this.phil);
        const selectedregion = regionObject.find(
          (region) => region.region_name == this.personal[0].Rregion
        );
        return Object.keys(selectedregion.province_list);
      } else {
        return null; // No region selected
      }
    },
    PprovinceOptions() {
      // console.log("computed",this.region.province_list)
      if (this.personal[0].Pregion) {
        const regionObject = Object.values(this.phil);
        const selectedregion = regionObject.find(
          (region) => region.region_name == this.personal[0].Pregion
        );
        return Object.keys(selectedregion.province_list);
      } else {
        return null; // No region selected
      }
    },
    cityOptions() {
      // console.log("province=",this.region.province_list[this.province])
      if (this.personal[0].Rprovince && this.personal[0].Rregion) {
        const regionObject = Object.values(this.phil);
        const selectedregion = regionObject.find(
          (region) => region.region_name == this.personal[0].Rregion
        );
        if (
          Object.keys(selectedregion.province_list).includes(
            this.personal[0].Rprovince
          )
        ) {
          const selectedprovince =
            selectedregion.province_list[this.personal[0].Rprovince];
          return Object.keys(selectedprovince.municipality_list);
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    PcityOptions() {
      // console.log("province=",this.region.province_list[this.province])
      if (this.personal[0].Pprovince && this.personal[0].Pregion) {
        const regionObject = Object.values(this.phil);
        const selectedregion = regionObject.find(
          (region) => region.region_name == this.personal[0].Pregion
        );
        if (
          Object.keys(selectedregion.province_list).includes(
            this.personal[0].Pprovince
          )
        ) {
          const selectedprovince =
            selectedregion.province_list[this.personal[0].Pprovince];
          return Object.keys(selectedprovince.municipality_list);
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    brgyOptions() {
      if (
        this.personal[0].Rprovince &&
        this.personal[0].Rregion &&
        this.personal[0].Rcity
      ) {
        const regionObject = Object.values(this.phil);
        const selectedregion = regionObject.find(
          (region) => region.region_name == this.personal[0].Rregion
        );
        if (
          Object.keys(selectedregion.province_list).includes(
            this.personal[0].Rprovince
          )
        ) {
          const selectedprovince =
            selectedregion.province_list[this.personal[0].Rprovince];
          if (
            Object.keys(selectedprovince.municipality_list).includes(
              this.personal[0].Rcity
            )
          ) {
            const selectedcity =
              selectedprovince.municipality_list[this.personal[0].Rcity];
            return selectedcity.barangay_list;
          } else {
            return null;
          }
          return Object.keys(selectedprovince.municipality_list);
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    PbrgyOptions() {
      if (
        this.personal[0].Pprovince &&
        this.personal[0].Pregion &&
        this.personal[0].Pcity
      ) {
        const regionObject = Object.values(this.phil);
        const selectedregion = regionObject.find(
          (region) => region.region_name == this.personal[0].Pregion
        );
        if (
          Object.keys(selectedregion.province_list).includes(
            this.personal[0].Pprovince
          )
        ) {
          const selectedprovince =
            selectedregion.province_list[this.personal[0].Pprovince];
          if (
            Object.keys(selectedprovince.municipality_list).includes(
              this.personal[0].Pcity
            )
          ) {
            const selectedcity =
              selectedprovince.municipality_list[this.personal[0].Pcity];
            return selectedcity.barangay_list;
          } else {
            return null;
          }
          return Object.keys(selectedprovince.municipality_list);
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },

  setup() {
    const religion = ref(stringReligions);
    const indigenousGroup = ref(stringIndigenous);
    const store = useLoginStore();
    const watchstore = useWatchStore();
    return {
      watchstore,
      store,
      selectedReligion: ref(null),
      religion,
      selectedIndigenous: ref(null),
      indigenousGroup,

      filterFn(val, update) {
        if (val === "") {
          update(() => {
            religion.value = stringReligions;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          religion.value = stringReligion.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },

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
  watch: {
    personal: {
      handler(newArray, oldArray) {
        this.updatearr = [];
        const labelarray = [
          { name: "Controlno", column: "ControlNo" },
          { name: "Lastname", column: "Surname" },
          { name: "Firstname", column: "Firstname" },
          { name: "Middlename", column: "MIddlename" },
          { name: "Sex", column: "Sex" },
          { name: "Civil Status", column: "CivilStatus" },
          { name: "TIN Number", column: "TINNo" },
          { name: "GSIS Number", column: "GSISNo" },
          { name: "PAGIBIG Number", column: "PAGIBIGNo" },
          { name: "SSS Number", column: "SSSNo" },
          { name: "PHEALTH Number", column: "PHEALTHNo" },
          { name: "Citizenship", column: "Citizenship" },
          { name: "Religion", column: "Religion" },
          { name: "Residential House", column: "Rhouse" },
          { name: "Residential Street", column: "Rstreet" },
          { name: "Residential Subdivision", column: "Rsubdivision" },
          { name: "Residential Barangay", column: "Rbarangay" },
          { name: "Residential City", column: "Rcity" },
          { name: "Residential Province", column: "Rprovince" },
          { name: "Residential Region", column: "Rregion" },
          { name: "Residential Zip Code", column: "Rzip" },
          { name: "Permanent Region", column: "Pregion" },
          { name: "Permanent House", column: "Phouse" },
          { name: "Permanent Street", column: "Pstreet" },
          { name: "Permanent Subdivision", column: "Psubdivision" },
          { name: "Permanent Barangay", column: "Pbarangay" },
          { name: "Permanent City", column: "Pcity" },
          { name: "Permanent Province", column: "Pprovince" },
          { name: "Permanent Zip Code", column: "Pzip" },
          { name: "Gender", column: "gender" },
          { name: "Citizenship Status", column: "citizenshipStatus" },
          { name: "Height", column: "Heights" },
          { name: "Weight", column: "Weights" },
          { name: "Blood Type", column: "BloodType" },
          { name: "Telephone Number", column: "TelNo" },
          { name: "Date of Birth", column: "Bday" },
          { name: "Place of Birth", column: "BirthPlace" },
          { name: "Email Address", column: "EmailAdd" },
          { name: "Cellphone Number", column: "CellphoneNo" },
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
              Controlno: this.personal[0].ControlNo,
              type: "Edit",
              label: labelarray[i].name,
              column: labelarray[i].column,
              Dfrom: store.userinfo[0][labelarray[i].column],
              Dto: this.personal[0][labelarray[i].column],
            });
          }
        }
        if (this.updatearr.length !== 0) {
          console.log("edited=", this.updatearr);
          this.watchstore.datastate = true;
        } else {
          this.watchstore.datastate = false;
        }
      },
      deep: true,
    },
  },
};
</script>
