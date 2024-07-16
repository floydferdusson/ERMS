<template>
  <div>
    <p class="title">ANNOUNCEMENT</p>
    <div class="">
      <br />
      <q-card
        v-for="(announcement, index) in store.announcements"
        :key="index"
        class="q-mt-sm q-pa-sm"
      >
        {{ announcement.Announcement }}
        <br />
        <br />
        <q-btn
          v-if="announcement.img"
          flat
          round
          color="green"
          @click="viewdoc(announcement.img)"
        >
          View Attachment File
        </q-btn>
      </q-card>
      <br />
    </div>
    <q-dialog v-model="Dialogpics" persistent="">
      <q-card style="width: 35%; height: auto">
        <q-card-section>
          <div class="text-h6">SUPPORTING DOCUMENT</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div>
            <q-img
              :src="imgsrc"
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
</template>
<script>
import {useDashboardStore} from "src/stores/DashboardStore";
import {server} from "boot/axios";

export default {
  data() {
    return {
      imgsrc: "",
      Dialogpics: false,
    };
  },
  setup() {
    const store = useDashboardStore();
    store.getannouncements();
    return {
      store,
    };
  },

  methods: {
    doc(row) {
      console.log("row", row);
      this.singleimage = `${server}}/pics/` + row.img;
      console.log("singleimage=", this.singleimage);
      this.Dialogpics = true;
    },
    viewdoc(row) {
      // console.log("ROW", row);
      // const store = useRequestStore();
      // let data = new FormData();
      // data.append("ControlNo", this.controlno);
      // store.getimg(data).then((res) => {
      this.imgsrc = `${server}/pics/` + row;
      this.Dialogpics = true;
      // });
    },
    imagesource(file) {
      const imgsrc = `${server}/Pics/` + imgname;
      return imgsrc;
    },
  },
};
</script>
<style>
.title {
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 5px 10px 5px 10px;
  margin-bottom: -5px;
}
</style>
