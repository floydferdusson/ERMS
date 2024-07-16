<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: rgba(4, 142, 255, 0.525)">
        <q-btn
          round
          style="background-color: white"
          size="10px"
          @click="drawer = !drawer"
        >
          <q-avatar size="20px" @click="drawer = !drawer">
            <img src="logo.png" @click="drawer = !drawer" />
          </q-avatar>
        </q-btn>

        <q-toolbar-title> CITY HUMAN RESOURCES </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="850">
      <q-scroll-area
        style="
          height: calc(100% - 200px);
          margin-top: 200px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple exact to="/Dashboard">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> EMPLOYEE'S FILE </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/PDS">
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" />
            </q-item-section>

            <q-item-section> Personal Data Sheet </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/UpdateHistory">
            <q-item-section avatar>
              <q-icon name="update" />
            </q-item-section>

            <q-item-section> Request Updates </q-item-section>
          </q-item>

          <q-item v-if="/*isUnderDevelopment() && */isUserRegularEmployee()" clickable v-ripple to="/applied-positions">
            <q-item-section avatar>
              <q-icon name="work_history" />
            </q-item-section>

            <q-item-section> Applied Positions </q-item-section>
          </q-item>

          <q-separator inset class="q-mt-xl"></q-separator>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        style="height: 200px; border-right: 1px solid #ddd"
      >
        <div
          class="absolute-bottom bg-transparent column items-center text-black"
        >
          <q-avatar size="100px" class="shadow-24">
            <q-img :src="imgurl" />
          </q-avatar>
          <div class="text-weight-bold q-mt-md">
            {{ store.userinfo[0].Firstname }}
            {{ store.userinfo[0].MIddlename }} {{ store.userinfo[0].Surname }}
          </div>
          <div style="font-size: smaller">
            {{ store.userinfo[0].designation }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginStore } from "../stores/LoginStore";
import {isDevServer, server} from "boot/axios";

export default defineComponent({
  name: "MainLayout",
  data: function () {
    return {
      drawer: "",
    };
  },
  mounted() {},
  methods: {
    server() {
      return server;
    },
    isUnderDevelopment() {
      return isDevServer()
    },
    isUserRegularEmployee() {
      const { status } = this.store.userinfo[0]
      return (status !== 'CONTRACTUAL' && status !== 'HONORARIUM' && status !== 'CASUAL') && true
    },
    logout() {
      window.localStorage.clear();
      window.localStorage.removeItem("authToken");
      window.history.replaceState({}, document.title, "/login");
      window.history.go(-(window.history.length - 0));
      this.$router.replace("/");
    },
  },

  setup() {
    const store = useLoginStore();
    let imgurl = "";
    if (store.userinfo[0].Sex == "MALE") {
      imgurl = "/imgs/male.png";
    } else {
      imgurl = "/imgs/female.png";
    }

    if (store.pics) {
      imgurl = `${server}/Pics/${store.img}`;
    }
    return {
      store,
      imgurl,
    };
  },
});
</script>
