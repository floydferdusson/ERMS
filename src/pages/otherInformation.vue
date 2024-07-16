<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-xs">
        <q-card>
          <q-card-section class="scroll">
            <div class="text-h6">
              SPECIAL SKILLS AND HOBBIES
              <q-btn label="Add" @click="SkillDialog = true"></q-btn>
            </div>
          </q-card-section>
          <q-table class="my-sticky-header-table text-uppercase" flat bordered title="" wrap-cells="" dense
            :rows="skills" :columns="columnSkills" row-key="id"> <template v-slot:body-cell-actions="{ row }">
              <div class="actionsbtn">
                <q-btn icon="delete" flat round color="deep-orange" @click="deleteSkills(row)">
                </q-btn>
              </div>
            </template>
          </q-table>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-xs">
        <!-- NON-ACADEMIC DISTINCTIONS / RECOGNITION -->
        <q-card>
          <q-card-section class="scroll">
            <div class="text-h6">
              NON-ACADEMIC DISTINCTIONS
              <q-btn label="Add" @click="NonAcademicDialog = true"></q-btn>
            </div>
          </q-card-section>
          <q-table class="my-sticky-header-table text-uppercase" flat wrap-cells="" bordered title="" dense
            :rows="academic" :columns="columnAcademic" row-key="id">
            <template v-slot:body-cell-actions="{ row }">
              <div class="actionsbtn">
                <q-btn icon="delete" flat round color="deep-orange" @click="deleteNonAcademic(row)">
                </q-btn>
              </div>
            </template></q-table>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12 q-pa-xs">
        <!-- MEMBERSHIP IN ASSOCIATION/ORGANIZATION -->
        <q-card>
          <q-card-section class="scroll">
            <div class="text-h6">
              MEMBERSHIP IN ASSOCIATION
              <q-btn label="Add" @click="MembershipDialog = true"></q-btn>
            </div>
          </q-card-section>
          <q-table class="my-sticky-header-table text-uppercase" flat bordered wrap-cells="" title="" dense
            :rows="organization" :columns="columnMembership" row-key="id"><template v-slot:body-cell-actions="{ row }">
              <div class="actionsbtn">
                <q-btn icon="delete" flat round color="deep-orange" @click="deleteMembership(row)">
                </q-btn>
              </div>
            </template></q-table>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="SkillDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input filled v-model="SkillsandHobbies" label="Skills and Hobbies" dense
                class="q-pa-sm text-uppercase" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="resetSkills" size="md" />
          <q-btn label="Request Update" color="secondary" size="md" v-close-popup @click="saveskill()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- NON-ACADEMIC -->
    <q-dialog v-model="NonAcademicDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input filled v-model="NonAcademic" label="NON-ACADEMIC DISTINCTIONS / RECOGNITION    " dense
                class="q-pa-sm text-uppercase" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="resetAcademic" size="md" />
          <q-btn label="Request Update" color="secondary" size="md" v-close-popup @click="savenonacedemic()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- MEMBERSHIP IN ASSOCIATION/ORGANIZATION   -->
    <q-dialog v-model="MembershipDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input filled v-model="Membership" label="MEMBERSHIP IN ASSOCIATION/ORGANIZATION      " dense
                class="q-pa-sm text-uppercase" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="resetAssociation" size="md" />
          <q-btn label="Request Update" color="secondary" size="md" v-close-popup @click="saveorganization()" />
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

    <!-- DIALOG FOR Skills DELETE -->
    <q-dialog v-model="DeleteSkillsDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Special Skills and Hobbies</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this Special Skills and Hobbies?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-orange" />
          <q-btn flat label="OK" @click="deleteSkillsFinal()" class="text-green" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DIALOG FOR NonAcademic DELETE -->
    <q-dialog v-model="DeleteNonAcademicDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Non-Academic Distinctions</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this Non-Academic Distinctions?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-orange" />
          <q-btn flat label="OK" @click="deleteNonAcademicFinal()" class="text-green" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DIALOG FOR Membership DELETE -->
    <q-dialog v-model="DeleteMembershipDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-blue text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Membership in Association</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this Membership in Association?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-orange" />
          <q-btn flat label="OK" @click="deleteMembershipFinal()" class="text-green" />
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
      DeleteSkillsDialog: false,
      DeleteNonAcademicDialog: false,
      DeleteMembershipDialog: false,
      SkillsID: "",
      NonAcademicID: "",
      MembershipID: "",
      small: false,
      smalltitle: "",
      smallmessage: "",
      SkillsandHobbies: "",
      NonAcademic: "",
      Membership: "",
      ControlNo: "",
      inputRules: [(v) => !!v || "Field is required"],
      skills: [],
      academic: [],
      organization: [],
      SkillDialog: false,
      NonAcademicDialog: false,
      MembershipDialog: false,
      model: ref(null),
      name: "",
      dateofbirth: "",
      controlno: "",
      columnSkills: [
        {
          name: "SkillsandHobbies",
          required: true,
          label: "Skills and Hobbies",
          align: "left",
          field: "Skills",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
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
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],

      columnMembership: [
        {
          name: "Membership",
          required: true,
          label: "Membership in Organization",
          align: "left",
          field: "Organization",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],
    };
  },
  created() {
    const userstore = useLoginStore();
    //dara go
    this.controlno = userstore.controlno;
    this.skills = userstore.userskills;
    this.academic = userstore.useracademic;
    this.organization = userstore.userorganization;
    this.ControlNo = userstore.controlno;
    console.log("skills=", this.skills);
    // console.log("academic=",this.academic)
    // console.log("organization=",this.organization)
  },
  methods: {

    saveskill() {
      console.log("skill=", this.SkillsandHobbies.trim());
      if (this.SkillsandHobbies.trim()) {
        let Form = new FormData();
        console.log("ControlNo_Skill=", this.controlno);
        Form.append("ControlNo", this.controlno);
        Form.append("skill", this.SkillsandHobbies);

        const userstore = useUserInfoStore();
        userstore.saveSkills(Form).then((res) => {
          console.log("res=", res);
          if (res == 1) {
            this.secondDialog = false;
            this.smalltitle = "Requested!";
            this.smallmessage =
              "The request for update has been sent to the HR.";
            this.small = true;
            this.resetSkills();
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
    resetSkills() {
      this.SkillsandHobbies = "";
      this.SkillDialog = false;
    },
    savenonacedemic() {
      console.log("NonAcademic=", this.NonAcademic.trim());
      if (this.NonAcademic.trim()) {
        let Form = new FormData();
        console.log("ControlNo_Nonacademic=", this.controlno);
        Form.append("ControlNo", this.controlno);
        Form.append("NonAcademic", this.NonAcademic);

        const userstore = useUserInfoStore();
        userstore.saveNonAcademic(Form).then((res) => {
          console.log("res=", res);
          if (res == 1) {
            this.secondDialog = false;

            this.smalltitle = "Requested!";
            this.smallmessage =
              "The request for update has been sent to the HR.";
            this.small = true;
            this.resetAcademic();
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
    resetAcademic() {
      this.NonAcademic = "";
      this.NonAcademicDialog = false;
    },
    saveorganization() {
      if (this.Membership.trim()) {
        let Form = new FormData();
        console.log("ControlNo_Organization", this.controlno);
        Form.append("ControlNo", this.controlno);
        Form.append("Organization", this.Membership);

        const userstore = useUserInfoStore();
        userstore.saveOrganization(Form).then((res) => {
          console.log("res=", res);
          if (res == 1) {
            this.secondDialog = false;
            this.smalltitle = "Requested!";
            this.smallmessage =
              "The request for update has been sent to the HR.";
            this.small = true;
            this.resetAssociation();
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
    resetAssociation() {
      this.Membership = "";
      this.MembershipDialog = false;
    },
    deleteSkills(skillsid) {
      this.SkillsID = skillsid.ID;
      this.DeleteSkillsDialog = true;
    },
    deleteSkillsFinal() {
      console.log("Skills ID =>", this.SkillsID);
      this.DeleteSkillsDialog = false;
      // const store = useUserInfoStore
      const loginstore = useLoginStore();
      const user = new FormData()
      user.append('controlno', loginstore.controlno)
      const store = useUserInfoStore();
      const data = new FormData
      data.append('tablename', 'skills')
      data.append('id', this.SkillsID)
      store.deletedata(data).then(() => {
        loginstore.userdetails(user).then(
          () => {
            // console.log("new data=", loginstore.usereducation)
            this.skills = loginstore.userskills;




            // console.log("old children=", this.personal[0].children)
            // this.personal = loginstore.userinfo.map((item) => ({ ...item }))
            // console.log("new children=", this.personal[0].children)
          }
        )
      })
    },
    deleteNonAcademic(nonacademicid) {
      this.NonAcademicID = nonacademicid.ID;
      this.DeleteNonAcademicDialog = true;
    },
    deleteNonAcademicFinal() {
      console.log("NonAcademic ID =>", this.NonAcademicID);
      this.DeleteNonAcademicDialog = false;
      // const store = useUserInfoStore
      const loginstore = useLoginStore();
      const user = new FormData()
      user.append('controlno', loginstore.controlno)
      const store = useUserInfoStore();
      const data = new FormData
      data.append('tablename', 'nonacademic')
      data.append('id', this.NonAcademicID)
      store.deletedata(data).then(() => {
        loginstore.userdetails(user).then(
          () => {
            // console.log("new data=", loginstore.usereducation)
            this.academic = loginstore.useracademic;




            // console.log("old children=", this.personal[0].children)
            // this.personal = loginstore.userinfo.map((item) => ({ ...item }))
            // console.log("new children=", this.personal[0].children)
          }
        )
      })
    },
    deleteMembership(membershipid) {
      this.MembershipID = membershipid.ID;
      this.DeleteMembershipDialog = true;
    },
    deleteMembershipFinal() {
      console.log("Membership ID =>", this.MembershipID);
      this.DeleteMembershipDialog = false;
      // const store = useUserInfoStore

      const loginstore = useLoginStore();
      const user = new FormData()
      user.append('controlno', loginstore.controlno)
      const store = useUserInfoStore();
      const data = new FormData
      data.append('tablename', 'organization')
      data.append('id', this.MembershipID)
      store.deletedata(data).then(() => {
        loginstore.userdetails(user).then(
          () => {
            // console.log("new data=", loginstore.usereducation)
            this.organization = loginstore.userorganization;




            // console.log("old children=", this.personal[0].children)
            // this.personal = loginstore.userinfo.map((item) => ({ ...item }))
            // console.log("new children=", this.personal[0].children)
          }
        )
      })
    },
  },
};
</script>
