<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      contracted
      animated
    >
      <q-step
        :name="1"
        title="Personal Information"
        icon="settings"
        :done="step > 1"
      >
        PERSONAL INFORMATION

        <PersonalInformation />
      </q-step>

      <q-step
        :name="2"
        title="Family Background"
        icon="create_new_folder"
        :done="step > 2"
      >
        FAMILY BACKGROUND
        <FamilyBackground />
      </q-step>

      <q-step
        :name="3"
        title="Educational Background"
        icon="add_comment"
        :done="step > 3"
      >
        <!-- EDUCATIONAL BACKGROUND -->
        <EducationalBackground />
        <br />
        <!-- CIVIL SERVICE ELIGIBILITY -->
        <CivilService />
        <br />
        <!-- WORK EXPERIENCE -->
        <WorkExperience />
      </q-step>

      <q-step
        :name="4"
        title="VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S"
        icon="create_new_folder"
        :done="step > 4"
      >
        <!-- VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE /
        VOLUNTARY ORGANIZATION/S -->
        <VoluntaryWork />
        <br />
        <!-- LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED -->
        <LearningAndDevelopment />
        <br />
        OTHER INFORMATION
        <OtherInformation />
      </q-step>

      <q-step
        :name="5"
        title="BackPage"
        icon="create_new_folder"
        :done="step > 5"
      >
        <BackPage />
      </q-step>

      <!-- <q-step
        :name="6"
        title="OTHER INFORMATION"
        icon="create_new_folder"
        :done="step > 6"
      >
        OTHER INFORMATION
      </q-step> -->

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="nextpage()"
            color="primary"
            :label="step === 5 ? 'Finish' : 'Continue'"
          />
          <!-- <q-btn
            @click="printPage"
            color="green"
            :label="'View PDS'"
            class="q-ml-sm"
            outlined
          /> -->
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <q-dialog v-model="small">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Unsubmitted Request</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          You have unsubmitted request, Do you want to continue?if no, Please
          press the "REQUEST UPDATE" button to submit the request for updates.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="YES" v-close-popup @click="resetdatastate()" />
          <q-btn flat label="NO" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import PersonalInformation from "./personalInformation.vue";
import FamilyBackground from "./familyBackground.vue";
import EducationalBackground from "./educationalBackground.vue";
import CivilService from "./civilService.vue";
import WorkExperience from "./workExperience.vue";
import VoluntaryWork from "./voluntaryWork.vue";
import LearningAndDevelopment from "./learningAndDevelopment.vue";
import OtherInformation from "./otherInformation.vue";
import BackPage from "./backPage.vue";
import { useWatchStore } from "src/stores/WatchStore";
import { useLoginStore } from "src/stores/LoginStore";
export default {
  data() {
    return {
      small: false,
      dataTable: [
        { id: "", name: "", age: "" },
        { id: "", name: "", age: "" },
        // Add more data as needed
      ],
      // Define your q-table columns
      columns: [
        { name: "id", label: "ID", align: "left", field: "id", sortable: true },
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "age",
          label: "Age",
          align: "left",
          field: "age",
          sortable: true,
        },
        // Add more columns as needed
      ],

      step: ref(1),
      model: ref(null),
      cit: ref(null),
      options: ["Single", "Married", "Widowed", "Separated", "Other/s"],
      citizenship: ["Filipino", "Dual Citizenship"],
      extension: ["Jr.", "Sr.", "III"],
      ReferenceDialog: false,
    };
  },

  methods: {
    printPage() {
      // Open the print dialog when the button is clicked
      // window.print();
      this.$router.push("/printpds");
    },
    nextpage() {
      if (this.watchstore.datastate) {
        this.small = true;
      } else {
        this.$refs.stepper.next();
      }
    },
    resetdatastate() {
      this.watchstore.datastate = false;
      this.$refs.stepper.next();
    },
  },
  components: {
    PersonalInformation,
    FamilyBackground,
    EducationalBackground,
    CivilService,
    WorkExperience,
    VoluntaryWork,
    LearningAndDevelopment,
    OtherInformation,
    BackPage,
  },
  setup() {
    const watchstore = useWatchStore();
    return {
      watchstore,
    };
  },
  created(){
    const loginstore=useLoginStore()
    const user=new FormData()
    user.append('controlno',loginstore.controlno)
    loginstore.userdetails(user)
  }
};
</script>
