<template>
  <div class="wholePage">
    <div class="JobOrder">
      <div class="q-pa-sm">
        <!-- <p style="font-size: 25px; margin-bottom: -15px;">CITY HUMAN RESOURCE</p> -->
      </div>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
          <PayslipCard
            v-if="
              store.userinfo[0].status !== 'CONTRACTUAL' &&
              store.userinfo[0].status !== 'HONORARIUM'
            "
          />
          <PayslipCardJO
            v-if="
              store.userinfo[0].status == 'CONTRACTUAL' ||
              store.userinfo[0].status == 'HONORARIUM'
            "
          />
          <PayslipTracker
            v-if="
              store.userinfo[0].status == 'CONTRACTUAL' ||
              store.userinfo[0].status == 'HONORARIUM'
            "
            class="q-mt-md"
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-5 col-xl-5">
          <DtrCard />
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
          <q-card style="height: auto" class="q-pa-md q-ml-md q-mt-sm">
            <AnnouncementPage />
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import PayslipCard from "../components/PayslipCard.vue";
import PayslipCardJO from "../components/PayslipCardJO.vue";
import PayslipTracker from "../components/PayslipTracker.vue";
import DtrCard from "../components/DtrCard.vue";
import AnnouncementPage from "src/components/AnnouncementPage.vue";
import { useLoginStore } from "src/stores/LoginStore";
export default defineComponent({
  name: "DashboardPage",
  components: {
    PayslipCardJO,
    PayslipCard,
    PayslipTracker,
    DtrCard,
    AnnouncementPage,
  },
  setup() {
    const store = useLoginStore();
    return {
      store,
    };
  },
});
</script>
